/**
 *	The Scroller class manages the scroll container behaviour
 *	
 *	@class Scroller
 */
function Scroller() {

	/**
	 *	DOM elment for the scroll container
	 *	
	 *	@property	scrollerContainer
	 *	@type 		{Object}
	 */
	this.scrollerContainer;

	/**
	 *	Scroll event timeout to limit the number 
	 *	of function calls on scroll
	 *
	 *	@property scrollFunctionTimeout
	 *	@type {Number}
	 */
	this.scrollFunctionTimeout;

	/**
	 *	Offset for the items to fetch
	 *
	 *	@property {Number} offset
	 */
	this.offset = 0;

	/**
	 *	Limit for the number of items to fetch
	 *
	 *	@property {Number} limit
	 */
	this.limit;

	/**
	 *	Whether content is already in the process
	 *	of being fetched from the endpoint
	 *	
	 *	@property {Boolean} fetchingContent
	 */
	this.fetchingContent = false;

	/**
	 *	The endpoint URL to fetch new content from
	 *
	 *	@property {String} contentURL
	 */
	this.endpointURL;

	/**
	 *	The render function to use to map json data to each list item
	 *
	 *	@property {Function} renderFunction
	 */
	this.renderFunction;
};

/**
 *	Function to set up the scroller
 *	
 *	@function init
 *	@param	{Object} scrollerContainer - HTML DOM element for the scroller container
 *	@param 	{Object}
 *	@param 	{String} endpointURL - the URL to fetch content from
 *	@param 	{Number} limit - an optional parameter to limit the number of items fetched 
 *	@param 	{Function} renderFunction - the render function for each item to map data to the html
 *	@return undefined
 */
Scroller.prototype.init = function(scrollerContainer, endpointURL, limit, renderFunction) {

	this.scrollerContainer = scrollerContainer;
	this.endpointURL = endpointURL;
	this.limit = (typeof limit === 'undefined') ? 20:limit;
	this.renderFunction = renderFunction;
	self = this;
	
	this.loadContent().then(function(result) {
		self.renderContent(result.data.items);
		self.setupScrolling();
	}).fail(function(error) {
		console.log('error', error);
	});

};

/**
 *	Function to render content
 *
 *	@function renderContent
 *	@param {Object} items - a collection of data to be rendered
 */
Scroller.prototype.renderContent = function(items) {

	/**
	 *	Loop through the data items from the endpoint and 
	 *	execute the callback specified on init.
	 */
	for(var i in items) {
		this.renderFunction(items[i]);
	}
};

/** 
 *	Function to load content for the scroller using the fetcher
 *	and then render it to the scroll container.
 *	
 *	@function loadContent
 */
Scroller.prototype.loadContent = function() {
	/**
	 *	Set up our Fetcher to load content and set fetchingContent to true
	 */
	var fetcher = new Fetcher(),
		deferred = Q.defer(),
		self = this;
	this.fetchingContent = true

	fetcher.fetch(this.endpointURL, this.offset, this.limit).then(function(result) {
		/**
		 *	Success
		 */
		self.fetchingContent = false;
		deferred.resolve(result);
	}).fail(function(error) {
		/**
		 *	Fail
		 */
		self.fetchingContent = false;
		deferred.reject(error);
	});

	return deferred.promise;
};

/**
 *	Function to add a scroll event listener 
 *
 *	@function setupScrolling
 *	@param {function} callback - an optional callback on scroll
 *	@return undefined
 */
Scroller.prototype.setupScrolling = function(callback) {

	/** 
	 *	Making 'this' accessible
	 */
	var self = this;

	this.scrollerContainer.addEventListener('scroll', function() {

		/**
		 * 	Clear the timeout if it is already set, this will call the function 
		 *	500ms after the scroll event has been fired. We don't want it to be 
		 *	called multiple times.
		 */
		clearTimeout(this.scrollFunctionTimeout);

		this.scrollFunctionTimeout = setTimeout(function() {
			/**
			 *	Check the optional callback and run it if it is valid
			 */
			if(typeof callback !== 'undefined' && typeof callback === 'function') {
				callback();
			};

			/**
			 *	Then when we hit the bottom, load more content 
			 *	as long as there is not already fetching taking
			 *	place.
			 */

			if(self.checkBottomBoundsReached() && !this.fetchingContent) {
				self.loadContent().then(function(result) {
					self.renderContent(result.data.items);
				}).fail(function(error) {

				});
			}

		}, 500);
	});
};

/**
 *	Function to check for more content and load it
 *	
 *	@function checkBottomBoundsReached
 *	@return {Boolean} true if scrolled to the bottom or false
 */
Scroller.prototype.checkBottomBoundsReached = function() {

	var scrollTop = this.scrollerContainer.scrollTop,
		containerHeight = this.scrollerContainer.clientHeight,
		scrollHeight = this.scrollerContainer.scrollHeight;

	return scrollTop === (scrollHeight - containerHeight);
};