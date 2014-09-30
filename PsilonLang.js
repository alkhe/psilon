var Err = require('./PsilonError'),
	Data = require('./PsilonData'),
	Validate = require('./PsilonValidate');

var stackUnderflowCheck = function(context, required) {
		if (context.stack.length < required) {
			throw Err.StackUnderflowError;
		}
	},
	endOfTokenListCheck = function(context, required) {
		if (context.tokenizer.tokensLeft() < required) {
			throw Err.EndOfTokenListError;
		}
	},
	undefinedObjectCheck = function(context, required) {
		if (!context.objects[required]) {
			throw Err.UndefinedObjectError;
		}
	};

var makeData = function(context, name) {
	context.objects[name] = new Data();
};

module.exports = {
	'log': function(context) {
		stackUnderflowCheck(context, 1);
		var output = context.stack.pop();
		if (Validate.isString(output)) {
			output = output.substring(1, output.length - 1);
		}
		else if (Validate.isNumber(output)) {

		}
		else {
			undefinedObjectCheck(context, output);
			output = context.objects[output].value;
		}
		console.log(output);
	},
	'debug': function(context) {
		console.log(context);
	},
	'+': function(context) {
		stackUnderflowCheck(context, 2);
		context.stack.push(context.stack.pop() + context.stack.pop());
	},
	'-': function(context) {
		stackUnderflowCheck(context, 2);
		var subtrahend = context.stack.pop();
		context.stack.push(context.stack.pop() - subtrahend);
	},
	'*': function(context) {
		stackUnderflowCheck(context, 2);
		context.stack.push(context.stack.pop() * context.stack.pop());
	},
	'/': function(context) {
		stackUnderflowCheck(context, 2);
		var divisor = context.stack.pop();
		context.stack.push(context.stack.pop() / divisor);
	},
	'**': function(context) {
		stackUnderflowCheck(context, 2);
		var exponent = context.stack.pop();
		context.stack.push(Math.pow(context.stack.pop(), exponent));
	},
	'var': function(context) {
		endOfTokenListCheck(context, 1);
		makeData(context, context.tokenizer.next());
	},
	'=': function(context) {
		stackUnderflowCheck(context, 2);
		var value = context.stack.pop();
		context.objects[context.stack.pop()].set(value);
	}
}
