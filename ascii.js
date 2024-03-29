//based off of https://github.com/mrdoob/three.js/blob/master/examples/webgl_effects_ascii.html?scrlybrkr=e2d80363
//used for scene setup and ascii effect
//THREE JS STUFFS
import * as THREE from 'three';

import { AsciiEffect } from 'three/addons/effects/AsciiEffect.js';

let camera, scene, spotLight, renderer, effect;

let torus;

const start = Date.now();

init();
animate();

function init() {

    camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 1, 1000 );
    camera.position.y = 0;
    camera.position.z = 17.5;

    scene = new THREE.Scene();
    scene.background = new THREE.Color( 0, 0, 0 );

    spotLight = new THREE.SpotLight( 0xffffff, 100 );
    //spotLight = new THREE.PointLight( 0xffffff, 1, 100 );
    spotLight.angle = Math.PI / 5;
    spotLight.penumbra = 0;
    spotLight.position.set( 0, 5, 15 );
    spotLight.castShadow = true;
    spotLight.shadow.camera.near = 3;
    spotLight.shadow.camera.far = 40;
    spotLight.shadow.mapSize.width = 1024;
    spotLight.shadow.mapSize.height = 1024;
    scene.add( spotLight );

    //Torus generation
    const geometry = new THREE.TorusGeometry( 5.5, 3, 22, 50 ); 
    const material = new THREE.MeshStandardMaterial( { color: 0xffffff, wireframe: false, emissive: 0x000000} ); 
    //const material = new THREE.MeshBasicMaterial( { color: 0xffffff, wireframe: false } ); //https://threejs.org/docs/?q=meshbasi#api/en/materials/MeshBasicMaterial
    torus = new THREE.Mesh( geometry, material ); scene.add( torus );

    renderer = new THREE.WebGLRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );

    effect = new AsciiEffect( renderer, ' .,-~:;=!*#$@', { invert: true } );
    effect.setSize( window.innerWidth, window.innerHeight );
    //effect.setSize( effect.domElement.parentElement.width, effect.domElement.parentElement.height );
    effect.domElement.id = "ascii";
    effect.domElement.style.color = 'white';
    effect.domElement.style.backgroundColor = 'transparent';
    effect.domElement.style.marginTop= '-2vh';

    // Special case: append effect.domElement, instead of renderer.domElement.
    // AsciiEffect creates a custom domElement (a div container) where the ASCII elements are placed.

    document.getElementById("donut").appendChild( effect.domElement );
    effect.setSize( effect.domElement.parentElement.offsetWidth*(9/10), effect.domElement.parentElement.offsetHeight*(9/10));
    console.log(effect.domElement.parentElement.offsetWidth);

    //

    window.addEventListener( 'resize', onWindowResize );

}

function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

}

document.getElementById("cont1").addEventListener("transitionend", (event) => {
    effect.setSize( effect.domElement.parentElement.offsetWidth*(9/10), effect.domElement.parentElement.offsetHeight*(9/10));
    effect.domElement.style.marginTop= '-2vh';
});

//

function animate() {

    requestAnimationFrame( animate );

    render();

}

function render() {

    //const timer = Date.now() - start;

    // spotLight.position.set( px, py, pz );

    torus.rotation.x += 0.01;
    torus.rotation.y += 0.01;

    effect.render( scene, camera );
}