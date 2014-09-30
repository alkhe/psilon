var Psilon = require('./PsilonLexer'),
	lang = new Psilon(),
	fs = require('fs');

fs.readFile('test.psi', {
	encoding: 'utf-8'
}, function(err, data) {
	if (err) {
		throw err;
	}
	lang.run(data);
});
