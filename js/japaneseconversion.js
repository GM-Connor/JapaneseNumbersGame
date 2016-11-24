var defaultkanji = {
	'一': 'いち',
	'二': 'に',
	'三': 'さん',
	'四': 'よん',
	'五': 'ご',
	'六': 'ろく',
	'七': 'なな',
	'八': 'はち',
	'九': 'きゅう',
	'十': 'じゅう',
	'百': 'ひゃく',
	'千': 'せん',
	'万': 'まん',
	'億': 'おく',
	'兆': 'ちょう'
}
var mapKanji = function(char, prev_char, next_char) {
	switch(char) {
		case '一':
			switch(next_char) {
				case '百':
				case '千':
					return '';
					break;
				case '兆':
					return 'いっ';
					break;
			}
		case '八':
			switch(next_char) {
				case '百':
				case '千':
					return 'はっ';
					break;
			}
		case '百':
			switch(prev_char) {
				case '三':
					return 'びゃく';
					break;
				case '六', '八':
					return 'ぴゃく';
					break;
			}
		case '千':
			switch(prev_char) {
				case '三':
					return 'ぜん';
					break;
			}
		default:
			return defaultkanji[char];
	}
};

/* converts string of kanji into string array of hiragana equivalents */
function kanjiToHiragana(kanji_string) {
	var hiragana_result = [];
	var current_char, prev_char, next_char;

	for (var i = kanji_string.length - 1; i >= 0; --i) {
		current_char = kanji_string.charAt(i);
		prev_char = kanji_string.charAt(i+1);
		next_char = kanji_string.charAt(i-1);
		hiragana_result.unshift(mapKanji(current_char, next_char, prev_char));
	}
	return hiragana_result.join(',').replace(/っ,/g, 'っ').split(','); 
}


var kanji = '一兆三億八千三百十一';
console.log(kanji);
console.log(kanjiToHiragana(kanji));
