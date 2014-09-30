var Err = require('./PsilonError'),
	Data = require('./PsilonData'),
	Type = require('./PsilonType'),
	Validate = require('./PsilonValidate');

var checkStackUnderflow = function(context, required) {
		if (context.stack.length < required) {
			throw Err.StackUnderflowError(required);
		}
	},
	checkEndOfTokenList = function(context, required) {
		if (context.tokenizer.tokensLeft() < required) {
			throw Err.EndOfTokenListError(required);
		}
	},
	checkUndefinedObject = function(context, required) {
		if (!context.objects[required]) {
			throw Err.UndefinedObjectError(required);
		}
	},
	throwIncompatibleOperation = function(erroneous) {
		throw Err.IncompatibleOperation(required);
	},
	throwInternal = function(erroneous) {
		throw Err.InternalError(required);
	};

var makeData = function(context, name) {
	context.objects[name] = new Data();
};

module.exports = {
	'log': function(context) {
		checkStackUnderflow(context, 1);
		var output = context.stack.pop();
		switch (Validate.getType(output)) {
			case Type.Number:

				break;
			case Type.String:
				output = Validate.deString(output);
				break;
			case Type.Object:
				checkUndefinedObject(context, output);
				output = context.objects[output].value;
				break;
			default:
				throwInternal(output);
				break;
		}
		console.log(output);
	},
	'debug': function(context) {
		console.log(context);
	},
	'+': function(context) {
		checkStackUnderflow(context, 2);
		var addend = context.stack.pop(),
		 	augend = context.stack.pop();
		if (Validate.binaryOperation([augend, addend], [Type.Number, Type.String])) {
			context.stack.push(augend + addend);
		}
		else {
			throwIncompatibleOperation([augend, addend]);
		}
	},
	'-': function(context) {
		checkStackUnderflow(context, 2);
		var subtrahend = context.stack.pop(),
			minuend = context.stack.pop();
		if (Validate.binaryOperation([minuend, subtrahend], [Type.Number])) {
			context.stack.push(minuend - subtrahend);
		}
		else {
			throwIncompatibleOperation([minuend, subtrahend]);
		}
	},
	'*': function(context) {
		checkStackUnderflow(context, 2);
		var multiplier = context.stack.pop(),
			multiplicand = context.stack.pop();
		if (Validate.binaryOperation([multiplicand, multiplier], [Type.Number])) {
			context.stack.push(multiplicand * multiplier);
		}
		else {
			throwIncompatibleOperation([multiplicand, multiplier]);
		}
	},
	'/': function(context) {
		checkStackUnderflow(context, 2);
		var divisor = context.stack.pop();
			dividend = context.stack.pop();
		if (Validate.binaryOperation([dividend, divisor], [Type.Number])) {
			context.stack.push(dividend / divisor);
		}
		else {
			throwIncompatibleOperation([dividend, divisor]);
		}
	},
	'**': function(context) {
		checkStackUnderflow(context, 2);
		var exponent = context.stack.pop(),
			radix = context.stack.pop();
		if (Validate.binaryOperation([radix, exponent], [Type.Number])) {
			context.stack.push(Math.pow(radix, exponent));
		}
		else {
			throwIncompatibleOperation([dividend, divisor]);
		}
	},
	'var': function(context) {
		checkEndOfTokenList(context, 1);
		makeData(context, context.tokenizer.next());
	},
	'=': function(context) {
		checkStackUnderflow(context, 2);
		var value = context.stack.pop();
		context.objects[context.stack.pop()].set(value);
	}
}
