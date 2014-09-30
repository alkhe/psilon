var Lang = require('./PsilonLang'),
	Validate = require('./PsilonValidate');

var Psilon = module.exports = function() {
	var dictionary = Lang,
		stack = this.stack = [];
		objects = this.objects = {};

	/*
	var define = function(name, value) {
		dictionary[name] = value;
	};
	*/

	this.run = function(text) {
		var tokenizer = this.tokenizer = new Tokenizer(text),
			word;

		while (word = tokenizer.next()) {
			if (dictionary[word]) {
				dictionary[word](this);
			}
			else if (Validate.isStringType(word)) {
				stack.push(word);
			}
			else if (Validate.isNumberType(word)) {
				stack.push(Number(word));
			}
			else {
				stack.push(word);
			}
		}

	};

	return this;
};

var Tokenizer = function(text) {
	var pseudo = text.trim().match(/(\b[^\'\"]+\b)|(\'.*?\')/g),
		words = [],
		next = 0;

	for (var i = 0; i < pseudo.length; i++) {
		if (Validate.isStringType(pseudo[i])) {
			words.push(pseudo[i]);
		}
		else {
			words = words.concat(pseudo[i].split(/\s+/));
		}
	}

	return {
		tokensLeft: function() {
			return words.length - next;
		},
		hasNext: function() {
			return next < words.length;
		},
		next: function() {
			return next < words.length ? words[next++] : null;
		}
	};
};
