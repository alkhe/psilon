var Validate = require('./PsilonValidate');

var Tokenizer = module.exports = function(text) {
	var pseudo = text.trimLeft().replace(/\/\/[^\n]*\n/g, '').replace(/\/\*([\s\S]*?)\*\//g, '').match(/(\b[^\'\"]+\b)|(\'.*?\')/g),
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
