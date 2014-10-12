/**
 *	The Scroller class manages the scroll container behaviour
 *	
 *	@class Scroller
 */
function Scroller() {

	/**
	 *	The number of items that need to be 
	 *	fetched to fill the viewport
	 *
	 *	@property 	numItemsRequired
	 *	@type		{Number}
	 */
	this.numItemsRequired;

	/**
	 *	The number of items present in the 
	 *	scroll container
	 *
	 *	@property	numItemsPresent
	 *	@type		{Number}
	 */
	this.numItemsPresent;

	/**
	 *	DOM elment for the scroll container
	 *	
	 *	@property	scrollerContainer
	 *	@type 		{Object}
	 */
	this.scrollerContainer;
};

/**
 *	Function to set up the scroller
 *	
 *	@function init
 *	@param	{Object} scrollerContainer - HTML DOM element for the scroller container
 */
Scroller.prototype.init = function(scrollerContainer) {
	this.scrollerContainer = scrollerContainer;
};

/**
 *	Function to set up events for the scroller
 *	
 *	@function setupEvents
 *	@param {Object} events - a list of events and their associated callbacks
 *					For example, the following objects are valid
 *
 *					events = [
 *						{
 *							name: 'mouseover',
 *							callback: function() {
 *								console.log('Mouseover detected')	
 *							}
 *						},
 *						{
 *							name: 'click',
 *							callback: function() {
 *								console.log('Click event registered');
 *							}
 * 						}	
 *					]
 */
Scroller.prototype.setupEvents = function(events) {
	
	/**
	 *	Checking parameters
	 */
	if(typeof events === 'undefined' || typeof events !== 'object') {
		console.log('Events param must be an array. You sent through: ', typeof events);
		return;
	}	

	/**
	 *	Then loop through the events and add the event listeners with callbacks
	 */
	for(var i in events) {
		this.scrollerContainer.addEventListener(events[i].name, events[i].callback);
	}
};