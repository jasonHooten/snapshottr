var utils = require('./../utils');

var newline = '\n';

/**
 * Appends multiple css/style to the current css/style in an html doc.
 * @param: {css, [, css]}   array of css strings
 */
var appendCss = exports.appendCss = function(/* css, [, css] */) {
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
var replaceCss = exports.replaceCss = function(/* css, [, css] */) {
    if(arguments.length === 0) return;

    if(this._$('style') != null) {
        this._$('style').remove();
    }
    appendCss.apply(this, arguments);
};