 // ******************** Début du WebGL ******************** \\
    var     	container, stats;
    var     	camera, scene, renderer, geometry, materials, mesh;
    var		asteroid, a_mesh, a_material;	
    var     	windowHalfX = window.innerWidth / 2;
    var     	windowHalfY = window.innerHeight / 2;

// Appel des Function Init & Animate
    	init();
    	animate();
 
// Création de la fonction Init
function init() {
	
    	// Création de la Caméra
    	camera         	= new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 2000);
	camera.position.z 	= 50;
	camera.position.y 	= 8;
    	// Création de la Scène
    	scene         	= new THREE.Scene();
    		
    		// Ajout de la Camera a la scène
    		scene.add(camera);

    	// Création de la Lumière
    	light 		= new THREE.PointLight(0xFFFFFF, 1, 1500);
	light.position.set( 10, 10, 10 );
		
		// Ajout de la Lumière a la scène
		scene.add(light);

    	// Création du Render
    	renderer     	= new THREE.WebGLRenderer();
    	document.body.appendChild(renderer.domElement);
    	onWindowResize();

    	// Création du Vaisseau (Cube)
    	geometry 	= new THREE.CubeGeometry(5,5,5);
    	material 	= new THREE.MeshNormalMaterial('0xff0000');
    	mesh     	= new THREE.Mesh(geometry, material);
    		
    		// Ajout du Vaisseau (Cube) a la scène
    		scene.add(mesh);
    	asteroids();

}

function asteroids(){
	// Creéation des Asteroids (Sphere)
	asteroid 		= new THREE.SphereGeometry(3, 50, 50, 0, Math.PI * 2, 0, Math.PI * 2);
	a_material		= new THREE.MeshNormalMaterial('0xffFF00');
	a_mesh     		= new THREE.Mesh(asteroid, a_material);

	// Position X Random
	a_mesh.position.x 	+= Math.random() * 100;
	a_mesh.position.x 	-= Math.random() * 100;    

	// Position Z 	
	a_mesh.position.z  	= -500;    	
	
		// Ajout des Asteroids (Sphere) a la scène
		scene.add(a_mesh);
	
	
}
// Fonction onResize du navigateur
function onWindowResize() {
    	camera.aspect     = window.innerWidth / window.innerHeight;
    	camera.updateProjectionMatrix();
	
    	renderer.setSize( window.innerWidth, window.innerHeight+10 );
}
// Fonction Animate
function animate() {
    	requestAnimationFrame(animate);
    	
        	controls();
	render();

	// Animation des Asteroids
	if (a_mesh.position.z < 50){
		a_mesh.position.z +=10;
	}else{
		a_mesh.position.z > 50;
		asteroids();
	}

}

// Fonction Render
function render() {
    	renderer.render( scene, camera );
}
function controls(){
    	$( "body" ).keydown(function(e) {
      		if(e.keyCode == 37){
       			mesh.position.x -= 0.1;
      		}
      		else if(e.keyCode == 39){
        			mesh.position.x += 0.1;
        			// console.log(mesh.position.x);
      		}
	});
}