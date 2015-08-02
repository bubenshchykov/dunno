/* https://github.com/bubenshchykov/dunno */

(function(exports) {

	var key = 'dunno#v0.0.5';
	var sep = ' ~\n';
	var mask = '<:tag id=":id" cl=":class">:info</:tag>';
	var limit = 10;
	var urlcheck = 100;
	var started, href;
	var storage = window.localStorage;

	exports.start = function(opts) {
		if (started) return;
		started = true
		
		opts = opts || {};
		opts.limit = opts.limit || limit;
		opts.urlcheck = opts.urlcheck || urlcheck;

		var push = function(entry) {
			var rec = storage.getItem(key) || '';
			var entries = rec.split(sep);
			entries = entries.slice(-opts.limit +1);
			entries.push(entry);
			storage.setItem(key, entries.join(sep));
		};

		var locate = function() {
			var l = window.location;
			push('url: ' + l.pathname + l.hash + l.search);
		};

		var track = function() {

			try {
				storage.setItem(key + '-ping', 1);
				storage.removeItem(key + '-ping');
			} catch (e) {
				storage = {
					data: {},
					setItem: function(key, val) {this.data[key] = val},
					getItem: function(key) {return this.data[key]}
				};
			};
			
			setInterval(function() {
				if (window.location.href === href) return;
				href = window.location.href;
				locate();
			}, urlcheck);
			
			var _onclick = document.onclick;
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
				if (typeof _onclick === 'function') return _onclick.apply(this, arguments);
			};
			
			var _onerror = window.onerror;
			window.onerror = function (msg) {
				push('error: ' + msg.slice(0, 50));
				if (typeof _onerror === 'function') return _onerror.apply(this, arguments);
			};
			
			var _onbu = window.onbeforeunload;
			window.onbeforeunload = function() {
				push('away');
				if (typeof _onbu === 'function') return _onbu.apply(this, arguments);
			};
		};

		['complete', 'interactive'].indexOf(document.readyState) === -1 ?
			document.addEventListener('DOMContentLoaded', track) : track();
	};
	
	exports.tell = function(opts){
		var rec = storage.getItem(key) || '';
		return rec.split(sep).reverse().join(sep);
	};

})(typeof exports === 'undefined' ? this.dunno = {} : exports);