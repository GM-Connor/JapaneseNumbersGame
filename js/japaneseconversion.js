var valid_answers = [];

var htor = {		/* default hiragana to romaji readings */
	'い': 'i',
	'う': 'u',
	'お': 'o',
	'き': 'ki',
	'ご': 'go',
	'さ': 'sa',
	'せ': 'se',
	'ぜ': 'ze',
	'じ': 'ji',
	'ち': 'chi',
	'な': 'na',
	'に': 'ni',
	'く': 'ku',
	'ま': 'ma',
	'は': 'ha',
	'ひ': 'hi',
	'び': 'bi',
	'ぴ': 'pi',
	'ろ': 'ro',
	'ん': 'n',
	'よ': 'yo',
	'ゃ': 'ya',
	'ゅ': 'yu',
	'ょ': 'yo'
}
var ktoh = {		/* default kanji to hiragana readings */
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
};
var dtok = {		/* default decimal to kanji characters */
	'0': '',
	'1': '一',
	'2': '二',
	'3': '三',
	'4': '四',
	'5': '五',
	'6': '六',
	'7': '七',
	'8': '八',
	'9': '九'
};
var places = {		/* decimal place markers */
	'1': '',
	'2': '十',
	'3': '百',
	'4': '千',
	'5': '万',
	'6': '十',
	'7': '百',
	'8': '千',
	'9': '億',
	'10': '十',
	'11': '百',
	'12': '千',
	'13': '兆'
};

var mapHiragana = function(hiragana) {
	var romaji_result = '';
	var char, prev_char;
	for (var i = hiragana.length-1; i >=0; --i) {
		char = hiragana.charAt(i);
		prev_char = hiragana.charAt(i+1);
		switch(prev_char) {
			case 'ゃ':
			case 'ゅ':
			case 'ょ':
				switch(char) {
					case 'ち':
					case 'じ':
						romaji_result = htor[char].substring(0, htor[char].length-1) + romaji_result.substring(1, romaji_result.length);
						break;
					default:
						romaji_result = htor[char].substring(0, htor[char].length-1) + romaji_result;
						break;
				} break;
			case 'っ':
				romaji_result = htor[char] + romaji_result.charAt(0) + romaji_result;
				break;
			default:
				switch(char) {
					case 'っ':
						break;
					default:
						romaji_result = htor[char] + romaji_result;
				} break;
		}
		
	}
	return romaji_result;
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
			return ktoh[char];
			break;
	}
};

var mapDecimal = function(char, place) {
	switch(char) {
		case '0':
			return '';
			break;
		case '1':
			switch(place) {
				case 1:
				case 5:
				case 9:
				case 13:
					break;
				default:
					return places[place];
					break;
			};
		default:
			return dtok[char] + places[place];
			break;
	}
}

/* convers array of hiragana segments into array of romaji segments */
function hiraganaToRomaji(hiragana_arr) {
	var romaji_result = []

	for (var i = 0; i < hiragana_arr.length; ++i) {
		romaji_result.push(mapHiragana(hiragana_arr[i]));
	}
	valid_answers.push(romaji_result.join(''));
	return romaji_result;
}

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
	hiragana_result = hiragana_result.join(',').replace(/っ,/g, 'っ').split(',');
	valid_answers.push(hiragana_result.join(''));
	return hiragana_result; 
}

/* converts number to string of kanji */
function decimalToKanji(decimal) {
	var kanji_result = [];
	var char, place;
	decimal = decimal.toString();

	for (var i = decimal.length-1; i >= 0; --i) {
		char = decimal.charAt(i);
		place = decimal.length-i;
		kanji_result.unshift(mapDecimal(char, place));
	}
	kanji_result = kanji_result.join('');
	valid_answers.push(kanji_result);

	return kanji_result;
}

/* converts string of kanji into array of romaji segments */
function kanjiToRomaji(kanji) {
	return hiraganaToRomaji(kanjiToHiragana(kanji));
}

/* converts number into array of romaji segments */
function decimalToRomaji(decimal) {
	return kanjiToRomaji(decimalToKanji(decimal));
}



function answer(string) {
	
}

var jc = {
	'set': function(decimal) {		/* set new number */
		valid_answers = [];
		decimalToRomaji(decimal);
		return true;
	},
	'answer': function(string) {	/* checks if answer is correct */
		for (var i = 0; i < valid_answers.length; ++i) {
			if (string.replace(/\s/g,'').toLowerCase() === valid_answers[i])
				return true;
		}
		return false;
	}
}