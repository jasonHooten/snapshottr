var $ = require('cheerio'),
    async = require('async'),
    _ = require('underscore');



SnapShottr = module.exports = function() {
    // Properties
    this._url = '';     // website url
    this._rawHtml = '',  // the full raw html, with all tags
    this._$ = { },       // cheerio object
    this._selector = ""; // optional css selector
}


SnapShottr.prototype.LoadUrl = function(url) {
    if (!(this instanceof SnapShottr)) return new SnapShottr(url);
    if (url.isSnapShottr) return url;

    // run url importer
}
 

SnapShottr.prototype.LoadHtml = function(url, html, selector) {
    if (!(this instanceof SnapShottr)) return new SnapShottr(url);
    if (url.isSnapShottr) return url;

    __make(this, url, html, selector);
}


/**
 * Displays the current html
 * @return {String}     String of th html.
 */
SnapShottr.prototype.view = function(){
    return this._$.html();
};


/*
 * Set a signature of the object
 */

SnapShottr.prototype.isSnapShottr = true;


/*
 * Set included services and api
 */

SnapShottr.services = ['cleanTags', 'includeCss'/*, 'inlcludeImage'*/];
SnapShottr.api = ['css', 'file'];


/*
 * Include the static functions
*/
_.extend(SnapShottr, require('./static'));


/*
 * Include the API
 */
SnapShottr.api.forEach(function(mod) {
    _.extend(SnapShottr.prototype, require('./api/' + mod));
});


/*
 * private
 */
function __make(snap, url, html, selector){
    snap._url = url;    
    snap._rawHtml = html, 
    snap._selector = selector; 

    runServices(snap);
}

function __runServices(snap){
    async.eachSeries(SnapShottr.services, 
        function(mod) {
            require('./services/' + mod).execute(snap);
        }, 
        function(err){
            if(err) throw err;
            return snap;
        }
    );
}


