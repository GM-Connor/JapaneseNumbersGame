var jpconv = {
	'answers': [],

	/* default decimal to kanji characters */
	'dtok': {
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
	},

	/* default hiragana to romaji readings */
	'htor': {
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
	},

	/* default kanji to hiragana readings */
	'ktoh': {
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
	},

	/* decimal place markers */
	'places': {
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
	},

	/* set new number */
	'set': function(decimal) {
		this.answers = [];
		this.decimalToRomaji(decimal);
		this.kanji = this.answers[0];
		this.hiragana = this.answers[1];
		this.romaji = this.answers[2];
		return true;
	},

	/* checks if answer is correct */
	'isAnswer': function(string) {
		for (var i = 0; i < this.answers.length; ++i) {
			if (string.replace(/\s/g,'').toLowerCase() === this.answers[i].split(' ').join(''))
				return true;
		}
		return false;
	},

	/* converts number to string of kanji */
	'decimalToKanji': function(decimal) {
		var char, place, result = [];
		decimal = decimal.toString();

		for (var i = decimal.length-1; i >= 0; --i) {
			char = decimal.charAt(i);
			place = decimal.length-i;
			result.unshift(this.mapDecimal(char, place));
		}
		result = result.join('');
		this.answers.push(result);
		return result;
	},

	/* converts number into array of romaji segments */
	'decimalToRomaji': function(decimal) {
		return this.kanjiToRomaji(this.decimalToKanji(decimal));
	},

	/* convers array of hiragana segments into array of romaji segments */
	'hiraganaToRomaji': function (hiragana_arr) {
		var result = [];

		for (var i = 0; i < hiragana_arr.length; ++i)
			result.push(this.mapHiragana(hiragana_arr[i]));

		this.answers.push(result.join(' '));
		return result;
	},

	/* converts string of kanji into string array of hiragana equivalents */
	'kanjiToHiragana': function(kanji) {
		var current_char, prev_char, next_char, hiragana_result = [];

		for (var i = kanji.length - 1; i >= 0; --i) {
			current_char = kanji.charAt(i);
			prev_char = kanji.charAt(i+1);
			next_char = kanji.charAt(i-1);
			hiragana_result.unshift(this.mapKanji(current_char, next_char, prev_char));
		}
		hiragana_result = hiragana_result.join(',').replace(/っ,/g, 'っ').split(',');
		this.answers.push(hiragana_result.join(' '));
		return hiragana_result; 
	},

	/* converts string of kanji into array of romaji segments */
	'kanjiToRomaji': function(kanji) {
		return this.hiraganaToRomaji(this.kanjiToHiragana(kanji));
	},

	'mapDecimal': function(char, place) {
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
						return this.places[place];
						break;
				};
			default:
				return this.dtok[char] + this.places[place];
				break;
		}
	},

	'mapHiragana': function(hiragana) {
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
							romaji_result = this.htor[char].substring(0, this.htor[char].length-1) + romaji_result.substring(1, romaji_result.length);
							break;
						default:
							romaji_result = this.htor[char].substring(0, this.htor[char].length-1) + romaji_result;
							break;
					} break;
				case 'っ':
					romaji_result = this.htor[char] + romaji_result.charAt(0) + romaji_result;
					break;
				default:
					switch(char) {
						case 'っ':
							break;
						default:
							romaji_result = this.htor[char] + romaji_result;
					} break;
			}
			
		}
		return romaji_result;
	},

	'mapKanji': function(char, prev_char, next_char) {
		if (char == '一') {
			if (next_char == '百' || next_char == '千')
				return '';
			else if (next_char == '兆')
				return 'いっ';
		}
		else if (char == '六') {
			if (next_char == '百')
				return 'ろっ';
		}
		else if (char == '八') {
			if (next_char == '百' || next_char == '千')
				return 'はっ';
		}
		else if (char == '百') {
			if (prev_char == '三')
				return 'びゃく';
			else if (prev_char == '六' || prev_char == '八')
				return 'ぴゃく';
		}
		else if (char == '千') {
			if (prev_char == '三')
				return 'ぜん';
		}
		return this.ktoh[char];
	}
};