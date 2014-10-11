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
};

/**
 *	Function to set up the scroller
 *	
 *	@function init
 *	@param	{String} scrollerContainer - Selector for the scroller container
 */
Scroller.prototype.init = function(scrollerContainer) {
	console.log('Hello from the scroller');
};

