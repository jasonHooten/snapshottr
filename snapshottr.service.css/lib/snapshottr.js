var $ = require('cheerio'),
    sanitize = require('./sanitize'),
    _ = require('underscore');



SnapShottr = module.exports = function(html, selector) {
    // Properties
    this._rawHtml = "", //the full raw html, with all tags
        this._$ = { }, // cheerio object
        this._dirty$ = { }, // full raw cheerio object, with all tags
        this._selector = ""; // optional css selector

    if (!(this instanceof SnapShottr)) return new SnapShottr(html, selector);

    if (html.isSnapShottr) return html;

    if(!html){
        this._rawHtml = '';
        this._$ =  $.load('');
        this._dirty$ = $.load('');

        return this;
    }

    this._$ = $.load(html);

    if(selector)
    {
        this._$ = $.load(this._$(selector));
        this._selector = selector;
    }
    
    this._dirty$ = this._$;
    this._rawHtml = this._$.html();

    sanitize.sanitize(this._$);

    return this;
}


/*
 * Set a signature of the object
 */

SnapShottr.prototype.isSnapShottr = true;

/*
 * Include the static functions
*/
_.extend(SnapShottr, require('./static'));


/*
 * The API
 */
var api = ['css', 'file', 'links'];
api.forEach(function(mod) {
    _.extend(SnapShottr.prototype, require('./api/' + mod));
});


/*
 * @api private
 */
SnapShottr.prototype._make = function(dom) {
  var snap = new SnapShottr(dom);
  snap.prevObject = this;
  return snap;
};


/**
 * Displays the current html
 * @return {String}     String of th html.
 */
SnapShottr.prototype.view = function(){
    return this._$.html();
};