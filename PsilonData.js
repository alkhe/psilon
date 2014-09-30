var Type = require('./PsilonType');

var Data = module.exports = function(type, value) {
	this.type = type || Type.Number;
	this.value = value || 0;
};

var isString = function(o) {
		return typeof(o) === 'string' || o instanceof String;
	},
	isNumber = function(o) {
		return typeof(o) === 'number' || o instanceof Number;
	};

Data.prototype = {
	type: new Number(),
	value: new Object(),
	set: function(value) {
		if (isString(value)) {
			this.type = Type.String;
		}
		else if (isNumber(value)) {
			this.type = Type.Number;
		}
		this.value = value;
	}
};
