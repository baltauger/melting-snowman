'use strict';
/* eslint-disable no-unused-vars */
var $ = window.$ = window.jQuery = require('jquery');
var _ = window._ = require('underscore');
var marked = window.marked = require('marked');
var Story = window.Story = require('./story');
var Passage = window.Passage = require('./passage');
var DramaReader = window.DramaReader = require('./drama/drama-reader')
/* eslint-enable no-unused-vars */

$(function() {
	window.story = new Story($('tw-storydata'));


	// Add relevant event handlers here (other events relate to saving, don't know how that affects me)

	/**
	 Triggered when the story is finished loading, and right before
	 the first passage is displayed. The story property of this event
	 contains the story.
	 @event start.sm.story
	**/
	$('#main').on('start.sm.story',function(event, story){
		console.log('start.sm.story');
		console.log(story);
	});

	// you need to register for the event before starting the story
	window.story.start($('#main'));

	// but to get passage events you need to have started the story

	/**
	 Triggered whenever a passage is about to be replaced onscreen with
	 another. The passage being hidden is stored in the passage property of
	 the event.
	 @event hide.sm.passage
	**/
	$('.passage').on('hide.sm.passage',function(event,passage){
		console.log('hide.sm.passage');
	});

	/**
	 Triggered whenever a passage is about to be shown onscreen. The passage
	 being displayed is stored in the passage property of the event.
	 @event showpassage
	**/
	$('.passage').on('show.sm.passage',function(event,passage){
		console.log('show.sm.passage');
		console.log(passage);
	});

	/**
	 Triggered after a passage has been shown onscreen, and is now
	 displayed in the story's element The passage being displayed is
	 stored in the passage property of the event.
	 @event shown.sm.passage
	**/
	$('.passage').on('shown.sm.passage',function(event,passage){
		console.log('shown.sm.passage');

		var drama = window.drama = new DramaReader('#drama_result');
		drama.setWpm(200);
		drama.setInput(passage.passage.render());
		drama.start();
	});

});
