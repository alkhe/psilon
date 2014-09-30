var Lang = require('./PsilonLang'),
	Tokenizer = require('./PsilonTokenizer'),
	Validate = require('./PsilonValidate');

var Psilon = module.exports = function() {
	var keywords = Lang,
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
			if (keywords[word]) {
				keywords[word](this);
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
