function close_splash(){
	$('#splashscreen').css('display', 'none');
}

function controls(){
    	$( "body" ).keydown(function(e) {
      		if(e.keyCode == 37){
       			mesh.position.x -= .01;
       			console.log(mesh.position.x);
      		}
      		else if(e.keyCode == 39){
        			mesh.position.x += .01;
      		}
	});
}