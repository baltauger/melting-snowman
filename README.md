# Melting Snowman

"Melting Snowman" is a modification / hack of the original Twine format "Snowman" to enable the writer to display passages using a "speed reading" presentation. In that style of presentation, the eye stays still and the words appear where the eye is looking. This is used to read "faster" but I figured it could also be used to have the player read at the speed that the author wants the text to be read.

I named the speed reading implementation "drama", because it could provide a similar sensation as a theather play?

In that sense, this format enables "real-time narration" for Twines.

## Snowman

[Snowman](https://github.com/videlais/snowman) is a minimal Twine 2 story format designed for people who already know
JavaScript and CSS. It's designed to implement basic functionality for playing
Twine stories and then get out of your way.

Snowman includes [jQuery](http://jquery.com) and [Underscore](http://underscorejs.org/) for you.

# Usage

Melting Snowman works just like the original Snowman for all passage building purposes & conditionals, so go check out its own readme.md.

## Linking

Links are declarated using the [[double bracket]] markup, including the [[pipe syntax|markup]]. When a link is found, Drama will split up each word and turn each of those words in a link when shown. Players must then decide to follow that link by pressing SPACE or the Right Mouse button **when its words are shown**. If the player fails to act while the link is being shown, the opportunity to act will have passed.

## End of passage callback

Since it is now perfectly possible for the player to become "stuck" with nowhere to go because they have missed an opportunity to act, you will need to decide what happens when the text is done. By default, the very last word will stay displayed on-screen, so you can use that opportunity to provide a way out for your players (or just a way to reread the passage from the start).

You can also define a callback to run when the last word in the passage is reached, by using code written within the <% %> tags, like so:

```
<% 
drama.afterDoneCallback = function(){story.show('link here')};
%>
```

**drama** and **story** are shorthands to both the speed reading object and the story object, respectively. The above piece of code will automatically move the story to the passage "link here" whenever the last word in the passage is shown.

## Custom word display triggers

I've made it so you can also define triggers and callbacks for when specific words are shown on-screen from within the passage edit window.

First, you will need to surround the word (or words) which will serve as trigger with special tags:

`These words are not triggers. <trigger.doSomething>These words are triggers</trigger>`

Then, for the trigger to actually do something, you have to define it in javascript like so:

```
<% 
triggers['doSomething'] = function (){console.log('this is my custom code')};
%>
```

The triggers object is global so you can define a bunch of utility triggers this way and reuse them throughout your story.

## Turn off speed reader functionality

If for any reason you need a passage to behave regularly, just give it a "static" tag.

# Writing stories in this format

The way text is presented in this format may require some changes to the way you write to produce more expressive results.

## Punctuation and rhythm

The use of punctuation is taken into account whendetermining how long each word is displayed.

Words with commas, hyphens and colons will be displayed twice as long.

Words with periods, semicolons, interrogation and exclamation marks will be displayed thrice as long.

Don't hesitate in being generous with your use of punctuation to influence the rhythm of the delivery!