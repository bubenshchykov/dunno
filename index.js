(function(exports) {

	var key = 'dunno#v0.0.0';
	var mask = '<:tag cl=":class" id=":id">:info</:tag>';
	var limit = 20;
	var started, href;

	exports.start = function(opts) {
		opts = opts || {};
		opts.limit = opts.limit || limit;

		var push = function(entry) {
			var rec = window.localStorage.getItem(key) || '';
			var entries = rec.split(' ~\n');
			entries = entries.slice(-opts.limit +1);
			entries.push(entry);
			window.localStorage.setItem(key, entries.join(' ~\n'));
		};

		var locate = function() {
			var l = window.location;
			push('url: ' + l.pathname + l.hash + l.search);
		};

		var track = function() {
			if (started) return;
			started = true
			
			setInterval(function() {
				if (window.location.href === href) return;
				href = window.location.href;
				locate();
			}, 100);
			
			document.onclick = function(e) {
				var el = e.target;
				var entry = mask
					.replace(/:tag/g, el.tagName.toLowerCase())
					.replace(':class', el.className).replace(' cl=""', '')
					.replace(':info', el.innerText.slice(0,10))
					.replace(':id', el.id).replace(' id=""', '');
				push('click: ' + entry);
			};

			window.onerror = function (msg) {
				push('error: ' + msg.slice(0, 50));
			};
			
			window.onbeforeunload = function() {
				push('away');
			};
		};

		document.readyState === 'complete' ?
			track() :
			document.addEventListener('DOMContentLoaded', track);
	};
	
	exports.tell = function(){
		return window.localStorage.getItem(key) || '';
	};

})(typeof exports === 'undefined' ? this.dunno = {} : exports);