function changeDifficulty(difficulty) {
	console.log(difficulty);
}
$('.sidebar .easy')[0].addEventListener('click', function() {
	changeDifficulty("easy");
});
$('.sidebar .medium')[0].addEventListener('click', function() {
	changeDifficulty("medium");
});
$('.sidebar .hard')[0].addEventListener('click', function() {
	changeDifficulty("hard");
});
$('.sidebar .expert')[0].addEventListener('click', function() {
	changeDifficulty("expert");
});