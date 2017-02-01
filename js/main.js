function close_splash(){
	$('#splashscreen').css('display', 'none');
}

function space_racer(){
	setTimeout(function() {close_splash();}, 2000);

	$('#btn_play').on('click', function(){
		$( "#nav" ).fadeOut( "slow", function() {
			$('#nav').css('display', 'none');
			init();
	 	 });
	});
}