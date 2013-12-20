var cheerio = require('cheerio'),
    sanitize = require('./sanitize'),
    utils = require('./utils');

var newline = '\n';

function snapShottr() {
    this._rawHtml = "";
    this._$ = { };
}


/**
 * Basic ping/pong function for testing.
 */
snapShottr.prototype.ping = function(html) {
    console.log('ping -> pong');
    return 'pong';
};

/**
 * Loads html (and css) into snapshottr
 * @param: {String}        html
 * @param: {css, [, css]}  array of css strings
 */
snapShottr.prototype.load = function(html /* , css, [, css] */) {
    this._rawHtml = html;
    this._$ = (html === null) ? cheerio.load('') : cheerio.load(html);
    sanitize.html(this._$);

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


/**
 * Appends multiple css/style to the current css/style in an html doc.
 * @param: {css, [, css]}   array of css strings
 */
snapShottr.prototype.appendCss = function(/* css, [, css] */) {
    if(arguments.length === 0) return;

    var css = Array.prototype.slice.call(arguments).join(newline);

    if(this._$('style').length === 0){
        this._$.root().prepend('<style></style>');
    }

    if(this._$('style').text().length > 0){
        css = this._$('style').text().concat(newline + css);
    }

    // remove any style tags from style
    if(css.indexOf('<style>') !== -1) {
        css = utils.replaceAll('<style>', '', css);
        css = utils.replaceAll('</style>', '', css);
    }

    this._$('style').text(css);
};


/**
 * Replaces current css/style in an html doc.
 * @param: {css, [, css]}   array of css strings
 */
snapShottr.prototype.replaceCss = function(/* css, [, css] */) {
    if(arguments.length === 0) return;

    if(this._$('style') != null) {
        this._$('style').remove();
    }
    snapShottr.prototype.appendCss.apply(this, arguments);
};


/////////////////////////////////
// Export the API 
exports = module.exports = snapShottr