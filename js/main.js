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

function play_pause(){
	let action = $('#play_pause');
	if(action.hasClass('played') == true){
		action.html('<i class="fa fa-play" aria-hidden="true"></i>');
		action.removeClass('played').addClass('paused');
		paused();
	}
	else{
		action.removeClass('paused').addClass('played');
		action.html('<i class="fa fa-pause" aria-hidden="true"></i>');
		played();
	}
}

function gameover(){
	paused();
	$('#gameover').css('display', 'block');
}

$('#play_pause').on('click', function(){
	play_pause();
})

$('#btn_retry').on('click', function(){
	clearScene();
})