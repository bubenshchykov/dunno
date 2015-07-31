/* https://github.com/bubenshchykov/dunno */

(function(exports) {

	var key = 'dunno#v0.0.0';
	var mask = '<:tag id=":id" cl=":class">:info</:tag>';
	var limit = 20;
	var urlcheck = 100;
	var started, href;

	exports.start = function(opts) {
		if (started) return;
		started = true
		
		opts = opts || {};
		opts.limit = opts.limit || limit;
		opts.urlcheck = opts.urlcheck || urlcheck;

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
			
			setInterval(function() {
				if (window.location.href === href) return;
				href = window.location.href;
				locate();
			}, urlcheck);
			
			document.onclick = function(e) {
				var el = e.target;
				
				var tag = String(el.tagName || '').toLowerCase().slice(0, 10);
				var id = String(el.id || '').slice(0, 10);
				var cl = String(el.className || '').slice(0, 30);
				var info = String(el.innerText || el.innerHTML || '').slice(0, 20).replace(/(?:\r\n|\r|\n)/g, ' ');
				
				var entry = mask
					.replace(/:tag/g, tag)
					.replace(':id', id).replace(' id=""', '')
					.replace(':class', cl).replace(' cl=""', '')
					.replace(':info', info);
					
				push('click: ' + entry);
			};

			window.onerror = function (msg) {
				push('error: ' + msg.slice(0, 50));
			};
			
			window.onbeforeunload = function() {
				push('away');
			};
		};

		['complete', 'interactive'].indexOf(document.readyState) === -1 ?
			document.addEventListener('DOMContentLoaded', track) :
			track();
	};
	
	exports.tell = function(){
		return window.localStorage.getItem(key) || '';
	};

})(typeof exports === 'undefined' ? this.dunno = {} : exports);