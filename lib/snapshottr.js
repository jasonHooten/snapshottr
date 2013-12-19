var cheerio = require('cheerio'),
    sanitize = require('./sanitize'),
    utils = require('./utils');

var newline = '\n';

function SnapShottr() {
    this._rawHtml = "";
    this._$ = { };
}


/**
 * Basic ping/pong function for testing.
 */
SnapShottr.prototype.ping = function(html) {
    console.log('pong..');
};

/**
 * Loads html (and css) into snapshottr
 * @param: {String}        html
 * @param: {css, [, css]}  array of css strings
 */
SnapShottr.prototype.load = function(html /* , css, [, css] */) {
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
SnapShottr.prototype.view = function(){
    return this._$.html();
};


/**
 * Replaces current css/style in an html doc.
 * @param: {css, [, css]}   array of css strings
 */
SnapShottr.prototype.replaceCss = function(/* css, [, css] */) {
    if(this._$('style') != null) {
        this._$('style').remove();
    }
    this.appendCss(Array.prototype.slice.call(arguments));
};


/**
 * Appends multiple css/style to the current css/style in an html doc.
 * @param: {css, [, css]}   array of css strings
 */
SnapShottr.prototype.appendCss = function(/* css, [, css] */) {
    var css = Array.prototype.slice.call(arguments).join(newline);
    
    if(this._$('style').length) {
        css = this._$('style').text().concat(newline + css);
    }else {
        this._$.root().prepend('<style></style>');
    }

    // remove any style tags from style
    if(css.indexOf('<style>') !== -1) {
        css = utils.replaceAll('<style>', '', css);
        css = utils.replaceAll('</style>', '', css);
    }

    this._$('style').text(css);
};


/////////////////////////////////
// Export the API 
exports.SnapShottr = SnapShottr;