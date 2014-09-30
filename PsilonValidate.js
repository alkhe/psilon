var Type = require('./PsilonType');

var Validate = module.exports = {
	isStringType: function(value) {
		return String(value).match(/['"].*['"]/);
	},
	isNumberType: function(value) {
		return !isNaN(Number(value));
	},
	getType: function(value) {
		if (Validate.isNumberType(value)) {
			return Type.Number;
		}
		else if (Validate.isStringType(value)) {
			return Type.String;
		}
		else {
			return Type.Object;
		}
	},
	binaryOperation: function(values, valid) {
		var v = values[0],
			w = values[1],
			vtype = Validate.getType(v),
			wtype = Validate.getType(w),
			isV = false,
			isW = false;
		for (var i = 0; i < valid.length; i++) {
			if (vtype == valid[i]) {
				isV = true;
			}
			if (wtype == valid[i]) {
				isW = true;
			}
			if (isV && isW) {
				return true;
			}
		}
		return false;
	},
	deString: function(value) {
		return value.substring(1, value.length - 1);
	}
}
