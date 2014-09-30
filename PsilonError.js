module.exports = {
	StackUnderflowError: function(value) {
		return new Error('StackUnderflowError - Not enough items on stack: ' + value);
	},
	EndOfTokenListError: function(value) {
		return new Error('EndOfTokenListError - Not enough items in token list: ' + value);
	},
	UndefinedObjectError: function(value) {
		return new Error('UndefinedObjectError - Referenced object not defined: ' + value);
	},
	IncompatibleOperationError: function(value) {
		return new Error('IncompatibleOperationError - Operation not permitted for value: ' + value);
	},
	InternalError: function(value) {
		return new Error('InternalError - Internal language error: ' + value);
	}
}
