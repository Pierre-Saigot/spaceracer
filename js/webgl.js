 // ******************** Début du WebGL ******************** \\
    var     container, stats;
    var     camera, scene, renderer, geometry, materials, mesh;
    var     windowHalfX = window.innerWidth / 2;
    var     windowHalfY = window.innerHeight / 2;

// Appel des Function Init & Animate
    init();
    animate();
 
// Création de la fonction Init
function init() {
	
    	// Création de la Caméra
    	camera         	= new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 2000);
	camera.position.z = 50
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

    	// Création d'un Cube
    	geometry 	= new THREE.CubeGeometry(15,15,15)
    	material 	= new THREE.MeshNormalMaterial('0xff0000');
    	mesh     	= new THREE.Mesh(geometry, material);
    		// Ajout du Cube a la scène
    		scene.add(mesh);
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
    	render();
        controls();
}

function controls(){
    $( "body" ).keydown(function(e) {
      if(e.keyCode == 37){
        mesh.position.x -= .01;
      }
      else if(e.keyCode == 39){
        mesh.position.x += .01;
      }
});
}

// Fonction Render
function render() {
    	renderer.render( scene, camera );
}