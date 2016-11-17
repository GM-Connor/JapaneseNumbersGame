function addDifficultyListeners(difficulties) {
	for (var i = 0; i < difficulties.length; ++i)
		(function(difficulty) {
			$('.sidebar #' + difficulty)[0].addEventListener('click', function() {
				changeDifficulty(difficulty);
			});
		})(difficulties[i]);
}


function changeDifficulty(difficulty) {
	deActive();
	$(event.target).addClass('active');
	changeBackground(difficulty);
	changeDiffText(difficulty);
}
/* removes .active class from all difficulties in sidebar */
function deActive() {
	currently_active = $('.sidebar .difficulty .active');
	for (var i = 0; i < currently_active.length; ++i)
		$(currently_active[i]).removeClass('active');
}
function changeBackground(difficulty) {
	removeBackground();
	switch(difficulty) {
		case 'easy':
			c = 'progress-bar-info';
			break;
		case 'medium':
			c = 'progress-bar-warning';
			break;
		case 'hard':
			c = 'progress-bar-danger';
			break;
		case 'expert':
			c = 'progress-bar-success';
			break;
		default:
			console.log('changeBackground(difficulty): unknown difficulty: ' + difficulty);
			break;
	}
	$('#background').addClass(c);
}
function removeBackground() {
	var options = ['info', 'warning', 'danger', 'success'];
	for (var i = 0; i < options.length; ++i)
		$('#background').removeClass('progress-bar-' + options[i]);
}
function changeDiffText(difficulty) {
	$('.main .heading .difficulty span')[0].innerHTML = capitalize(difficulty);
}
function capitalize(string) {
	return string.charAt(0).toUpperCase() + string.slice(1);
}




var difficulties = ['easy', 'medium', 'hard', 'expert'];

addDifficultyListeners(difficulties);
$('.sidebar #' + difficulties[0])[0].click();	/* set default difficulty (first element in difficulties[]) */