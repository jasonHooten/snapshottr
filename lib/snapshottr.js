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
 * @param: {string}        jquery style selector
 * @param: {css, [, css]}  array of css strings
 */
snapShottr.prototype.load = function(html, selector /* , css, [, css] */) {
    if(!html){
        this._rawHtml = '';
        this._$ =  cheerio.load('');
        this._dirty$ = cheerio.load('');
    }

    this._$ = cheerio.load(html);
    if(selector)
    {
        this._$ = cheerio.load(this._$(selector));
    }

    this._dirty$ = this._$;
    this._rawHtml = this._$.html();

    sanitize.sanitize(this._$);

    var args = [];
    Array.prototype.push.apply( args, arguments );
    if(args.length > 2){
        args.shift();
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
exports = module.exports = snapShottr;