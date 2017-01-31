    // ******************** Début du WebGL ******************** \\
    var     container, stats;
    var     camera, scene, renderer, particles, geometry, materials = [];
    var     parameters, i, h, color, sprite, size;
    var     windowHalfX = window.innerWidth / 2;
    var     windowHalfY = window.innerHeight / 2;

// Appel des Function Init & Animate
    init();
    animate();
 
// Création de la fonction Init
function init() {


    var canvas = document.createElement('canvas');

    canvas.id = "game";
    canvas.width = 400;
    canvas.height = $(window).height();
    canvas.style.zIndex = 8;



    var container = document.getElementById("canvas");
    container.appendChild(canvas);

    // Création de la Caméra
    camera         = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 2000);

    // Création de la Scène
    scene         = new THREE.Scene();

    // Création du Render
    renderer     = new THREE.WebGLRenderer();
    var geometry = new THREE.CubeGeometry(1,1,1)
    var material = new THREE.MeshNormalMaterial()
    var mesh     = new THREE.Mesh(geometry, material)
    scene.add(mesh)
}

// Fonction onResize du navigateur
function onWindowResize() {
    windowHalfX     = window.innerWidth / 2;
    windowHalfY     = window.innerHeight / 2;

    camera.aspect     = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );
}
// Fonction Animate
function animate() {
    requestAnimationFrame(animate);
    render();
}

// // Fonction Render
function render() {
    renderer.render( scene, camera );
}