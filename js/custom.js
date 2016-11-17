function addDifficultyListeners(difficulties) {
	for (var i = 0; i < difficulties.length; ++i)
		(function(difficulty) {
			$('.sidebar #' + difficulty)[0].addEventListener('click', function() {
				changeDifficulty(difficulty);
			});
		})(difficulties[i]);
}
function addTogglesListeners(toggles) {
	for (var key in toggles)
		if (toggles.hasOwnProperty(key))
			(function(toggle) {
				$('.sidebar input[name=' + key + ']')[0].addEventListener('click', function() {
					changeToggle(toggle);
				});
			})(toggles[key]);
}
function changeToggle(toggle) {
	toggle.toggle();
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


var game = {

};

var difficulties = ['easy', 'medium', 'hard', 'expert'];
var toggles = {'show-romaji': $('.main .romaji'), 'show-hiragana': $('.main .hiragana')};

addDifficultyListeners(difficulties);
addTogglesListeners(toggles);

$('.sidebar #easy')[0].click();						/* set default difficulty to easy */
$('.sidebar input[name=show-romaji]').click();		/* romaji shown by default */
$('.sidebar input[name=show-hiragana]').click();	/* hiragana shown by default */