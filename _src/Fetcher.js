/**
 *	The Fetcher class to fetch remote data
 *	
 *	@class Scroller
 */
function Fetcher() {

};

/**
 *	Function to fetch new content from an endpoint
 *	
 *	@function fetch
 *	@param	{Number} offset - 
 */
Fetcher.prototype.fetch = function(url, offset, limit) {

	var deferred = Q.defer();

	$.ajax({
		url: url,
		type: 'get',
		dataType: 'json'
	}).done(function(res) {
		deferred.resolve({
			status: 'ok',
			data: res
		});
	}).fail(function(err) {
		deferred.reject({
			status: 'error',
			data: err
		});
	});

	return deferred.promise;
};