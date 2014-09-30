var Validate = module.exports = {
	isString: function(value) {
		return String(value).match(/['"].*['"]/);
	},
	isNumber: function(value) {
		return !isNaN(Number(value));
	}
}
