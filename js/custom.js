/* best function */
var assert = function(condition, message) { 
    if (!condition)
        throw Error('Assert failed' + (typeof message !== 'undefined' ? ': ' + message : ''));
};

function addDifficultyListeners(difficulties) {
	assert(typeof difficulties == 'object');
	for (var i = 0; i < difficulties.length; ++i)
		(function(difficulty) {
			var element = $('.sidebar #' + difficulty)[0];
			assert(typeof difficulty == 'string');
			assert(element != undefined);
			element.addEventListener('click', function() {
				changeDifficulty(difficulty);
			});
		})(difficulties[i]);
	return true;
}
function addTogglesListeners(toggles) {
	assert(typeof toggles == 'object');
	for (var key in toggles)
		if (toggles.hasOwnProperty(key))
			(function(toggle) {
				var element = $('.sidebar input[name=' + key + ']')[0];
				assert(element != undefined);
				element.addEventListener('click', function() {
					changeToggle(toggle);
				});
			})(toggles[key]);
	return true;
}
function changeToggle(toggle) {
	assert(typeof toggle == 'object');
	assert(toggle.length == 1);
	toggle.toggle();
	return true;
}

function changeDifficulty(difficulty) {
	assert(typeof difficulty == 'string');
	assert(typeof game == 'object');
	game['difficulty'] = difficulty;
	deActive();
	$(event.target).addClass('active');
	changeBackground(difficulty);
	changeDiffText(difficulty);
	return true;
}
/* removes .active class from all difficulties in sidebar */
function deActive() {
	currently_active = $('.sidebar .difficulty .active');
	assert(currently_active.length <= 1);
	for (var i = 0; i < currently_active.length; ++i)
		$(currently_active[i]).removeClass('active');
	return true;
}
function changeBackground(difficulty) {
	assert(typeof difficulty == 'string');
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
	var element = $('#background');
	assert(element != undefined && element.length != 0);
	element.addClass(c);
	return true;
}
function removeBackground() {
	var options = ['info', 'warning', 'danger', 'success'];
	for (var i = 0; i < options.length; ++i) {
		var element = $('#background');
		assert(element != undefined && element.length != 0);
		element.removeClass('progress-bar-' + options[i]);
	}
	return true;
}
function changeDiffText(difficulty) {
	assert(typeof difficulty == 'string');
	var element = $('.main .heading .difficulty span')[0];
	assert(element != undefined);
	element.innerHTML = capitalize(difficulty);
	return true;
}
function capitalize(string) {
	assert(typeof string == 'string');
	return string.charAt(0).toUpperCase() + string.slice(1);
}


var game = {
	'isNewGame': true,		/* does green button say 'Start' or 'Continue'? */
	'isInQuestion': false,	/* should 'Continue' button be greyed out? */
	'difficulty': null,
	'round': 1
};

var difficulties = ['easy', 'medium', 'hard', 'expert'];
var toggles = {'show-romaji': $('.main .romaji'), 'show-hiragana': $('.main .hiragana')};

addDifficultyListeners(difficulties);
addTogglesListeners(toggles);

$('.sidebar #easy')[0].click();						/* set default difficulty to easy */
$('.sidebar input[name=show-romaji]').click();		/* romaji shown by default */
$('.sidebar input[name=show-hiragana]').click();	/* hiragana shown by default */