do ($ = jQuery) -> # encapsulate plugin

  # main

  class TmplDeck

    _options:
      dataType: 'text'
      url: null
      cache: true

    constructor: (url, options) ->
      
      # handle instance creation wo new
      if not (@ instanceof arguments.callee)
        return new TmplDeck url, options

      @_options = $.extend {}, @_options,
        url: url
      @_fetchDefer = $.Deferred()
      @_cache = {}

    load: ->
      ($.ajax @_options).then (data) =>
        @_fetchedText = data
        @_fetchDefer.resolve()

    ready: (fn) ->
      @_fetchDefer.done -> fn()
      @

    draw: (id) ->
      cached = @_cache[id]
      if cached then return cached
      re = new RegExp "(^|\\n)#{id}\\s\{\{\{\{\\r?\\n([\\s\\S]+?)\}\}\}\}"
      res = @_fetchedText.match(re)
      if res
        return (@_cache[id] = res[2])
      else
        return null


  # underscore.js enhancement

  TmplDeck::tmpl = (id, data) ->
    (_.template @draw(id)) data


  # globalify
  #
  $.TmplDeck = TmplDeck

