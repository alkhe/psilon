var Type = require('./PsilonType'),
	Validate = require('./PsilonValidate');

/*
var isString = function(o) {
		return typeof(o) === 'string' || o instanceof String;
	},
	isNumber = function(o) {
		return typeof(o) === 'number' || o instanceof Number;
	};
*/

var Data = module.exports = function(type, value) {
	this.type = type || Type.Number;
	this.value = value || 0;
};

Data.prototype = {
	type: new Number(),
	value: new Object(),
	set: function(value) {
		this.type = Validate.getType(value);
		this.value = value;
	}
};
