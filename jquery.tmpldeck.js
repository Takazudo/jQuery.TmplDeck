/*!
 * jQuery.TmplDeck
 *
 * @author    : Takeshi Takatsudo (takazudo[at]gmail.com)
 * @copyright : Takeshi Takatsudo
 * @license   : The MIT License
 * @link      : https://github.com/Takazudo/jQuery.TmplDeck
 * @modified  : 2011/12/02
 * @version   : 0.1
 *
 * underscore.js template storage
 */
(function($, window, document, ns, undefined){

ns.TmplDeck = function(url, options){
	if (!(this instanceof arguments.callee)){
		return new ns.TmplDeck(url, options);
	}
	this._options = $.extend({}, this._options, options, {
		url: url
	});
	this._fetchDefer = $.Deferred();
	this._cache = {};
};
ns.TmplDeck.prototype = {
	_options: {
		dataType: 'text',
		url: null,
		cache: true
	},
	_fetchedText: null,
	_fetchDefer: null,
	_cache: null,
	load: function(){
		var self = this;
		return $.ajax(self._options).then(function(data){
			self._fetchedText = data;
			self._fetchDefer.resolve();
		}, function(){
			alert('ajax failed');
		});
	},
	ready: function(fn){
		this._fetchDefer.done(function(){
			fn();
		});
	},
	draw: function(id){
		if(this._cache[id]){
			ret =  this._cache[id];
		}else{
			var re = new RegExp('(^|\\n)' + id + '\\s\{\{\{\\r?\\n([\\s\\S]+?)\}\}\}');
				// get text inside parenthesis
			var res = this._fetchedText.match(re);
			ret = !res ? null : (this._cache[id] = res[2]);
		}
		return ret;
	}
};

/* underscore.js enhancement */

ns.TmplDeck.prototype.tmpl = function(id, data){
	return _.template(this.draw(id))(data);
};

})(jQuery, this, this.document, jQuery);
