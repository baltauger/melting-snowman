# Snowman

Snowman is a minimal Twine 2 story format designed for people who already know
JavaScript and CSS. It's designed to implement basic functionality for playing
Twine stories and then get out of your way.

Snowman includes [jQuery](http://jquery.com) and
[Underscore](http://underscorejs.org/) for you.

## Changes From The Norm

Snowman uses Markdown formatting in its passage syntax. Instead of invoking macros with `<<double angle brackets>>`, it uses Underscore templating to provide interactivity. Specifically, passages are rendered onscreen with this process:

1. The passage source is run through Underscore's [_.template() method](http://underscorejs.org/#template). Code in `<% blocks %>` receive two special variables:

	* `s`, which is a shorthand for `window.story.state`
	* `$`, which acts like jQuery's `$` method but with one exception. If you pass it a single function, this function is run when the passage appears onscreen, with it bound to the passage DOM element.

2. `<div>` elements are created from text formatted like this:
```
[
This appears onscreen.
]{#id.className}
```
The opening bracket must be the only text on the line, and the closing bracket must be the first character of the line it's on. The newlines between the brackets are removed from the rendered `<div>`, but otherwise spacing is kept intact. You can add as many classes as you like, e.g. `{.class1.class2}`, and leave off an ID. You can specify an empty `<div>` with this code:
```
[
]{.empty}
```
And if you would like the `<div>` to start hidden, e.g. `display: none`, put a minus sign (-) as the first character after the curly brackets. i.e.
```
[
This message is hidden!
]{-.surprise}
```

3. `<span>` elements are created from text `[formatted like
this]{#id.className}`. Apart from the brackets staying on the same line as the text, the same rules as for `<div>` elements apply.

4. All double-bracketed links (`[[passage]]`, `[[displayed->passage]]`, and `[[passage<-displayed]]` are converted to functional links.

5. Finally, the result of this is rendered with the
[Marked](https://github.com/chjj/marked/) Markdown parser.

By default, clicking a passage link does not add an entry to the reader's browser history. See `story.checkpoint()` for how to do this.

## Building From Source

Run `npm install` to install dependencies. `gulp` will create a testing version of the format at `index.html`, and `gulp release` will build a release version ready to be used in Twine under `dist/`.
