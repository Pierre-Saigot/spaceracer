 // ******************** Début du WebGL ******************** \\
var     	container, stats;
var  	camera, scene, renderer;
var	asteroid, a_mesh, a_material;	
var 	objLoader, objMaterial, obj;
var       score = 0,  nb_life = 3;
var     	windowHalfX = window.innerWidth / 2;
var     	windowHalfY = window.innerHeight / 2;

// Création de la fonction Init
function init(){
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

  //   	// Création du Vaisseau (Cube)
  //   	geometry 	= new THREE.CubeGeometry(5,5,5);
  //   	material 	= new THREE.MeshNormalMaterial();
  //   	mesh     	= new THREE.Mesh(geometry, material);
  //   	mesh.position.y -= 5;
  //   		// Ajout du Vaisseau (Cube) a la scène
	// scene.add(mesh);

	// Loader pour le .obj du vaisseau
	objLoader 		= new THREE.OBJLoader();
	objMaterial 		= new THREE.MeshBasicMaterial({color: 'yellow', side: THREE.DoubleSide});
	
	// Chargement du .obj
	objLoader.load('../assets/SpaceShip.obj', function(obj){
		obj.traverse(function(child){
        	    		if (child instanceof THREE.Mesh){
        	        			child.material = objMaterial;
        	    			}
        		});

        		obj.position.y 	-= 5;
        		// Fonction pour faire bouger le vaisseau de gauche a droite 
        		$( "body" ).keydown(function(e) {

                		if(e.keyCode == 37 & obj.position.x > -33.700000000000394){
                   		 	obj.position.x -= 4;
               		}
                		else if(e.keyCode == 39 & obj.position.x < 33.700000000000394){
                    			obj.position.x += 4;
                		}
           		});

           		// Ajout de l'objet a la scène
           		scene.add(obj);
 	});



           asteroids();
        	animate();
        	life();
}

// Fonction Animate
function animate() {
    	requestAnimationFrame(animate);

        	// Animation du Score
    	$('#score').text(score);
    		score += 1;

	// Animation des Asteroids
	if (a_mesh.position.z < 50){
		a_mesh.position.z += 10;
	}else{
		a_mesh.position.z > 50;
		asteroids();
	}
	render();
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

// Création des Asteroids
function asteroids(){
	// Création des Asteroids (Sphere)
	asteroid 		= new THREE.SphereGeometry(3, 50, 50, 0, Math.PI * 2, 0, Math.PI * 2);
	a_material		= new THREE.MeshNormalMaterial();
	a_mesh     		= new THREE.Mesh(asteroid, a_material);

	// Position X Random
	a_mesh.position.x 	+= Math.random() * 100;
	a_mesh.position.x 	-= Math.random() * 100;    

	a_mesh.position.y 	-= 5;

	// Position Z 	
	a_mesh.position.z  	= -500;    	
	
		// Ajout des Asteroids (Sphere) a la scène
		scene.add(a_mesh);
}

// Fonction onResize du navigateur
function onWindowResize() {
    	camera.aspect     = window.innerWidth / window.innerHeight;
    	camera.updateProjectionMatrix();
    	renderer.setSize(window.innerWidth, window.innerHeight+10);
}
