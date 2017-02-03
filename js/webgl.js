 // ******************** Début du WebGL ******************** \\
var     	container, stats;
var  	camera, scene, renderer;
var	asteroid, a_mesh, a_material;	
var 	objLoader, objMaterial, obj;
var       collidableMeshList = [];
var       score = 0,  nb_life = 3;
var     	windowHalfX = window.innerWidth / 2;
var     	windowHalfY = window.innerHeight / 2;
var         isPaused = false;
var 	spaceship;
var     P = {};
var     f_left = false;
var     f_right = false;

function paused(){
    isPaused = true;
}

function played(){
    isPaused = false;
}

// Création de la fonction Init
function init(){
            life();
    
    	// Création de la Caméra
    	camera         		= new THREE.PerspectiveCamera(50,window.innerWidth/window.innerHeight,1,2000);
	camera.position.z 	= 50;
	camera.position.y 	= 8;
    	// Création de la Scène
    	scene         	= new THREE.Scene();
    		// Ajout de la Camera a la scène
    		scene.add(camera);

    	// Création de la Lumière
    	light 		= new THREE.PointLight(0xEEEEEE, 1, 1500);
        	light.position.set(3, 3, 3);
		// Ajout de la Lumière a la scène
		scene.add(light);

    	// Création du Render
    	renderer     	= new THREE.WebGLRenderer();
    	document.body.appendChild(renderer.domElement);
    	onWindowResize();

	// Loader pour le .obj du vaisseau
	objLoader 		= new THREE.OBJLoader();
	objMaterial 		= new THREE.MeshBasicMaterial({color: 'white', side: THREE.DoubleSide});
	
	// Chargement du .obj
	objLoader.load('../assets/SpaceShip.obj', function(obj){
		obj.traverse(function(child){
        	    		if (child instanceof THREE.Mesh){
        	        			child.material = objMaterial;
        	    			}
        		});
		obj.scale.set(1.5,1.5,1.5);
		obj.rotation.y = 180 * Math.PI / 180;
        		obj.position.y 	-= 10;
                P = {Px: obj.position.x, Py: obj.position.y};
        		// Fonction pour faire bouger le vaisseau de gauche a droite 
        		
                $( "body" ).keydown(function(e) {
                		if(e.keyCode == 37){
                            f_left = true;
               		       }
                		else if(e.keyCode == 39){
                            f_right = true;
                		}
           		});
                $( "body" ).keyup(function(e) {
                        if(e.keyCode == 37 ){
                            f_left = false;
                           }
                        else if(e.keyCode == 39){
                            f_right = false;
                        }
                });
           		
                // Ajout de l'objet a la scène
                obj.hitbox = new THREE.Mesh( 
                    new THREE.SphereGeometry(6, 50, 50, 0, Math.PI * 2, 0, Math.PI * 2),
                    new THREE.MeshLambertMaterial({color: 0x0000ff, transparent: true, opacity: 0})
                );
                obj.hitbox.position.x = obj.position.x;
                obj.hitbox.position.y = obj.position.y;
                obj.hitbox.position.z = obj.position.z;
                scene.add(obj.hitbox);
           		scene.add(obj);
                spaceship    = obj;
            	obj.userData 	= { keepMe: true };
 	});

           asteroids();
        	animate();
}

function convertDist(s, a){
    if(!s) return;
    let response = Math.sqrt(Math.pow((s.hitbox.position.x - a.position.x),2) + Math.pow((s.hitbox.position.z - a.position.z),2))
    if((a_mesh.geometry.parameters.radius+s.hitbox.geometry.parameters.radius) > response){
        return true;
    }
    return false;
}

// Fonction Animate
function animate() {
    	requestAnimationFrame(animate);
                console.log(nb_life);

            if(f_left == true && spaceship.position.x > -33.700000000000394){
                spaceship.position.x -= 1;
            }
            if(f_right == true && spaceship.position.x < 33.700000000000394){
                spaceship.position.x += 1;
            }

            spaceship.hitbox.position.x = spaceship.position.x;
            spaceship.hitbox.position.y = spaceship.position.y;
            spaceship.hitbox.position.z = spaceship.position.z;

        	if(isPaused == false){
            	// Animation du Score
            	$('#score').text(score);
            	score += 1;
            	// Animation des Asteroids
            	if (a_mesh.position.z < 30){
               		a_mesh.position.z += 10;
            	}else{
                		a_mesh.position.z > 50;
                		asteroids();
            	}
            	render();
        	}

            let r = convertDist(spaceship, a_mesh);
            if(r == true){
                nb_life --;
                $('#life ul').html('<li><img src="assets/img/life.png" alt=""></li>');
                if(nb_life <= 0){
                    gameover();
                    $('#life ul').html('');
                }
                life();
            }
}

// Fonction Render
function render() {
    	renderer.render(scene, camera);
}

// Création de la fonction Life
function life(){
    	for (var i=1; i<nb_life; i++) {
    	    	$('#life ul').append('<li><img src="assets/img/life.png" alt=""></li>');
    	    	$('#life').css('display', 'block');
    	}
}

function re_life(){
        $('#life ul').append('<li><img src="assets/img/life.png" alt=""></li>');
        for (var i=1; i<nb_life; i++) {
                $('#life ul').append('<li><img src="assets/img/life.png" alt=""></li>');
                $('#life').css('display', 'block');
        }
}

// Création des Asteroids
function asteroids(){
	// Création des Asteroids (Sphere)
	asteroid 		= new THREE.SphereGeometry(3, 50, 50, 0, Math.PI * 2, 0, Math.PI * 2);
	a_material		= new THREE.MeshBasicMaterial({color: 'red'});
	a_mesh     		= new THREE.Mesh(asteroid, a_material);

	// Position X Random
	a_mesh.position.x 	+= Math.random() * 80;
	a_mesh.position.x 	-= Math.random() * 80;    

	a_mesh.position.y 	-= 5;

	// Position Z 	
	a_mesh.position.z  	= -400;  
    asteroid.userData = { keepMe: false };  	
	
		// Ajout des Asteroids (Sphere) a la scène
		scene.add(a_mesh);
}

function clear() {
    var to_remove = [];
    spaceship.position.x = P.Px;
    spaceship.position.y = P.Py;

    scene.traverse ( function( child ) {
        if ( child instanceof THREE.Mesh && !child.userData.keepMe === true ) {
            to_remove.push( child );
         }
         console.log(to_remove)
    } );
    
    for (var i = 0; i < to_remove.length; i++){
        scene.remove( to_remove[i] );
    }
    score = 0,  nb_life = 3;
    played();
    re_life();
}   

// Fonction onResize du navigateur
function onWindowResize() {
    	camera.aspect     = window.innerWidth / window.innerHeight;
    	camera.updateProjectionMatrix();
    	renderer.setSize(window.innerWidth, window.innerHeight+10);
}