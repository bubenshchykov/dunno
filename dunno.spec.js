var browser = require('zombie').create();
var file = __dirname + '/example.html';

browser
	.visit('file://' + file)
	.done(function() {
		
		browser.assert.text('title', 'dunno');
		browser.fire('.yo', 'click').done(function() {
		browser.fire('.bro', 'click').done(function() {
		browser.fire('.away', 'click').done(function() {
		browser.wait(200).done(function() {
		browser.fire('.error', 'click').done(function() {
		browser.wait(200).done(function() {
		browser.fire('.check', 'click').done(function() {
			
			browser.assert.text('.report',
				
				('click: <a cl="error">now, click on me - I</a> ~ ' +
				'url: :file?jumped=elsewhere ~ ' +
				'click: <i cl="away">click to navigate</i> ~ ' +
				'click: <textarea cl="bro">bro, click me too</textarea> ~ ' +
				'click: <button cl="yo">yo, click me too</button> ~ ' +
				'url: :file ~')
					.replace(/:file/g, file));
			
			console.log('test passed');
			process.exit(0);

	})})})})})})})});