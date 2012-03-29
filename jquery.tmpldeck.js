/*! jQuery.TmplDeck - v0.2 -  3/29/2012
 * https://github.com/Takazudo/jQuery.TmplDeck
 * Copyright (c) 2012 "Takazudo" Takeshi Takatsudo; Licensed MIT */

(function() {
  var TmplDeck;

  (function($) {}, TmplDeck = (function() {

    TmplDeck.prototype._options = {
      dataType: 'text',
      url: null,
      cache: true
    };

    function TmplDeck(url, options) {
      if (!(this instanceof arguments.callee)) return new TmplDeck(url, options);
      this._options = $.extend({}, this._options, {
        url: url
      });
      this._fetchDefer = $.Deferred();
      this._cache = {};
    }

    TmplDeck.prototype.load = function() {
      var _this = this;
      return ($.ajax(this._options)).then(function(data) {
        _this._fetchedText = data;
        return _this._fetchDefer.resolve();
      });
    };

    TmplDeck.prototype.ready = function(fn) {
      this._fetchDefer.done(function() {
        return fn();
      });
      return this;
    };

    TmplDeck.prototype.draw = function(id) {
      var cached, re, res;
      cached = this._cache[id];
      if (cached) return cached;
      re = new RegExp("(^|\\n)" + id + "\\s\{\{\{\\r?\\n([\\s\\S]+?)\}\}\}");
      res = this._fetchedText.match(re);
      if (res) {
        return (this._cache[id] = res[2]);
      } else {
        return null;
      }
    };

    return TmplDeck;

  })(), TmplDeck.prototype.tmpl = function(id, data) {
    return (_.template(this.draw(id)))(data);
  }, $.TmplDeck = TmplDeck)(jQuery);

}).call(this);
