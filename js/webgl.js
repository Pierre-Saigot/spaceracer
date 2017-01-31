    // ******************** Début du WebGL ******************** \\
    var     container, stats;
    var     camera, scene, renderer, particles, geometry, materials = [];
    var     parameters, i, h, color, sprite, size;
    var     windowHalfX = window.innerWidth / 2;
    var     windowHalfY = window.innerHeight / 2;

// Appel des Function Init & Animate
    init();
    // animate();
 
// Création de la fonction Init
function init() {


    var canvas = document.createElement('canvas');

    canvas.id = "game";
    canvas.width = 400;
    canvas.height = $(window).height();
    canvas.style.zIndex = 8;
    canvas.style.background = "#1B1B1B";



    var container = document.getElementById("canvas");
    container.appendChild(canvas);

    // Création de la Caméra
    camera         = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 2000);
    // camera.position.z     = 1700;

    // Création de la Scène
    scene         = new THREE.Scene();
    // scene.fog     = new THREE.FogExp2( 0x000000, 0.0003 );

    // Création des Objets
    // geometry     = new THREE.Geometry();
    //  textureLoader     = new THREE.TextureLoader();

    // Importation des Sprites
    
    // sprite1     = ;
    // sprite2     = ;
    // sprite3    = ;


    // Création du Render
    // renderer     = new THREE.WebGLRenderer();
    // renderer.setPixelRatio( window.devicePixelRatio );
    // renderer.setSize( window.innerWidth, window.innerHeight );
    // container.appendChild( renderer.domElement );
    // window.addEventListener( 'resize', onWindowResize, false );
}

// Fonction onResize du navigateur
// function onWindowResize() {
//     windowHalfX     = window.innerWidth / 2;
//     windowHalfY     = window.innerHeight / 2;

//     camera.aspect     = window.innerWidth / window.innerHeight;
//     camera.updateProjectionMatrix();

//     renderer.setSize( window.innerWidth, window.innerHeight );
// }
// Fonction Animate
// function animate() {
//     requestAnimationFrame(animate);
//     render();
// }

// // Fonction Render
// function render() {
//     renderer.render( scene, camera );
// }