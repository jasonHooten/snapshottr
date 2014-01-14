var $ = require('cheerio'),
    _ = require('underscore');

/**
 * Appends multiple css/style to the current css/style in an html doc.
 * @param: {css, [, css]}   array of css strings
 */
var getExternalCss = exports.getExternalCss = function() {
    var list = [];

    if(this._dirty$('link').length > 0){
        console.log("we have links: " + this._dirty$('link').length); 
        list = _.map(this._dirty$('link'), function (link) {
            return $(link).attr('href');
        });
    }
    return list;
};