var assert = function(condition, message) { 
    if (!condition)
        throw Error('Assert failed' + (typeof message !== 'undefined' ? ': ' + message : ''));
};
/* generates random number between min (inclusive) and max (inclusive) */
function getRandomInt(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}
/* adds commas to numbers. ex. 1,234,456 */
function numberWithCommas(n) {
	return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}



/* adding listeners */
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
function addButtonListener() {
	var element = $('.main .start')[0];
	assert(element != undefined);
	element.addEventListener('click', function() {
		startGame();
	});
	return true;
}
function addTooltipListeners() {
	$('[data-toggle="tooltip"]').tooltip();
	return true;
}



/* changing difficulty */
function changeDifficulty(difficulty) {
	assert(typeof difficulty == 'string');
	deActive();
	$(event.target).addClass('active');
	changeBackground(difficulty);
	changeDiffText(difficulty);
	newGame(difficulty);
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
/* Changes the block text that says what the current difficulty is */
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
function newGame(difficulty) {
	assert(typeof difficulty == 'string');
	assert(typeof game == 'object');
	game.isNewGame = true;
	game.isInQuestion = false;
	game.difficulty = difficulty;
	game.round = 1;
	game.setButtonText('Start');
	game.setInteractionDisplay('none');
	game.setAboutDisplay('block');
	game.setButtonDisability(false);
}
function startGame() {
	assert(typeof game == 'object');
	game.setButtonText('Continue');
	game.setAboutDisplay('none');
	game.setInteractionDisplay('block');
	newCard();
}
/* handles generating number, diabling button, timer, etc */
function newCard() {
	game.setButtonDisability(true);
	//get number
	newNum();
	game.setNumber(game.num);
	focusInput();
	//start timer
}
/* sets input field in focus */
function focusInput() {
	var element = $('.main .input');
	assert(element.length != 0);
	element.focus();
}
/* gets num based on difficulty level */
function newNum() {
	assert(typeof game == 'object');
	var rand, num, easy, medium, hard;
	rand = getRandomInt(0, 100);
	switch(game.difficulty) {
		case "easy":
			num = easyRange();
			break;
		case "medium":
			if (rand <= 15)
				num = easyRange();
			else
				num = mediumRange();
			break;
		case "hard":
			if (rand <= 10)
				num = easyRange();
			else if (rand <= 25)
				num = mediumRange();
			else
				num = hardRange();
			break;
		case "expert":
			if (rand <= 5)
				num = easyRange();
			else if (rand <= 15)
				num = mediumRange();
			else if (rand <= 30)
				num = hardRange();
			else
				num = expertRange();
			break;
	}
	game.num = num;
}
function easyRange() {
	return getRandomInt(0, 100);
}
function mediumRange() {
	return getRandomInt(0, 10000);
}
function hardRange() {
	return getRandomInt(0, 100000000);
}
function expertRange() {
	return getRandomInt(0, 1000000000000);
}



var game = {
	'isNewGame': true,		/* does green button say 'Start' or 'Continue'? */
	'isInQuestion': false,	/* should 'Continue' button be greyed out? */
	'difficulty': null,
	'round': 1,
	'setButtonText': function(string) {
		assert(typeof string == 'string');

		var element = $('.main .start')[0];
		assert(element != undefined);
		element.innerHTML = string;
		return true;
	},
	'setInteractionDisplay': function(string) {
		assert(typeof string == 'string');

		var element = $('.main .typing');
		assert(element.length != 0);
		element.css('display', string);

		var element = $('.main .answer');
		assert(element.length != 0);
		element.css('display', string);
		return true;
	},
	'setAboutDisplay': function(string) {
		assert(typeof string == 'string');

		var element = $('.main .about');
		assert(element.length != 0);
		element.css('display', string);
		return true;
	},
	'setButtonDisability': function(state) {
		assert(typeof state == 'boolean');

		var element = $('.main .start');
		assert(element.length != 0);
		element.prop('disabled', state);
		return true;
	},
	'setNumber': function(num) {
		assert(typeof num == 'number');

		var element = $('.main .typing .panel-heading')[0];
		assert(element != undefined);
		element.innerHTML = numberWithCommas(num);
		return true;
	},
};

var difficulties = ['easy', 'medium', 'hard', 'expert'];
var toggles = {'show-romaji': $('.main .romaji'), 'show-hiragana': $('.main .hiragana')};

addDifficultyListeners(difficulties);
addTogglesListeners(toggles);
addButtonListener();
addTooltipListeners();


$('.sidebar #easy')[0].click();						/* set default difficulty to easy */
$('.sidebar input[name=show-romaji]').click();		/* romaji shown by default */
$('.sidebar input[name=show-hiragana]').click();	/* hiragana shown by default */
