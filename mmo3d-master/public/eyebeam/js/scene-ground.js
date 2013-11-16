//////////////////////////////////////////////////////////////////////////////////
// require.js module definition
define( [ 'tquery.skymap'
	, 'tquery.grassground'
	, 'tquery.montainarena'
	, 'tquery.text'
	, 'tquery.checkerboard'
], function(){
//////////////////////////////////////////////////////////////////////////////////

/**
 * init the lights for the scene
 * 
 * @param {Object} opts the options 
 */
var SceneGround	= function(opts){
	opts	= tQuery.extend(opts, {
		world	: tQuery.world,
		roomName: "Public"
	});
	var world	= opts.world;
	var runOnMobile	= 'ontouchstart' in window ? true : false;

	// add a skybox
	if( true ){
		var textureCube	= cache.getSet('textureCubeMars', function(){
			var textureUrls	= tQuery.TextureCube.createUrls('mars', '.jpg', '../../vendor/tquery/plugins/assets/images/textures/cube');
			var textureCube	= tQuery.createCubeTexture(textureUrls);
			return textureCube;
		});
		tQuery.createSkymap({
			textureCube	: textureCube
		}).addTo(world);
	}

	// create the text
	if( true && runOnMobile === false ){
		var text	= tQuery.createText(opts.roomName, {
			bevelThickness	: 0.1,
			bevelSize	: 0.03,
			bevelEnabled	: true,
		}).addTo(world).scaleBy(1/2).translateY(0.5)
			.setLambertMaterial({
				ambient	: 0x444444,
				color	: 0x888888,
				envMap	: textureCube
			}).back()
			.castShadow(true)
		world.loop().hook(function(delta, now){
			var deltaAngle	= 0.05 * delta * Math.PI * 2;
			text.rotateY(deltaAngle)
		})
	}

	// create cube test
        var cubeGeometry = new THREE.CubeGeometry(4,4,4);
        var cubeMaterial = new THREE.MeshBasicMaterial({color: 0xff0000, wireframe: true});
        var cube = new THREE.Mesh(cubeGeometry, cubeMaterial);


        // position the cube
        cube.position.x=-4;
        cube.position.y=3;
        cube.position.z=0;

        //cube.addTo(world);
    tQuery.createTorus().addTo(world);
    tQuery.createCube().addTo(world)
		.setBasicMaterial().color(0x000000).wireframe(true).back();
	

	// create ground
	if( false ){
		tQuery.createCheckerboard({
			segmentsW	: 20,
			segmentsH	: 20
		}).addTo(world).scaleBy(40)
			.receiveShadow(true)
	}

	// create ground
	if( true ){
		var ground	= tQuery.createGrassGround({
			textureRepeatX	: 20,
			textureRepeatY	: 20,
		}).addTo(world)
			.receiveShadow(true)
			.scale(40)
		// TODO to merge all the montains
		tQuery.MontainArena.createBasicArena().addTo(world)
			.scale(40)
	}

}

/**
 * destructor
 */
SceneGround.prototype.destroy = function() {
	// TODO unbind yeller
	console.assert(false, 'not yet implemented')
};


//////////////////////////////////////////////////////////////////////////////////
// require.js module definition END

// export to global namespace
window.SceneGround	= SceneGround;
});	
// end of require.js define()
//////////////////////////////////////////////////////////////////////////////////
