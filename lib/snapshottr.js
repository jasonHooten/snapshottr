var cheerio = require('cheerio'),
    sanitize = require('./sanitize'),
    _ = require('underscore');



function snapShottr() {
    this._rawHtml = "";
    this._$ = { };
    this._dirty$ = { };
}


/*
 * The API
 */
var api = ['css', 'file', 'links'];
api.forEach(function(mod) {
    _.extend(snapShottr.prototype, require('./api/' + mod));
});


/**
 * Loads html (and css) into snapshottr
 * @param: {String}        html
 * @param: {css, [, css]}  array of css strings
 */
snapShottr.prototype.load = function(html /* , css, [, css] */) {
    this._rawHtml = html;
    this._$ = (html === null) ? cheerio.load('') : cheerio.load(html);
    this._dirty$ = (html === null) ? cheerio.load('') : cheerio.load(html);
    
    sanitize.sanitize(this._$);

    var args = [];
    Array.prototype.push.apply( args, arguments );
    if(args.length > 1){
        args.shift();
        this.appendCss(args);
    }
};


/**
 * Displays the current html
 * @return {String}     String of th html.
 */
snapShottr.prototype.view = function(){
    return this._$.html();
};


/////////////////////////////////
// Export the API 
exports = module.exports = snapShottr