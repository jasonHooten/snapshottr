var $ = require('cheerio'),
    _ = require('underscore');

/**
 * Appends multiple css/style to the current css/style in an html doc.
 * @param: {css, [, css]}   array of css strings
 */
var getExternalCss = exports.getExternalCss = function() {
    var list = [];

    if(this._dirty$('link').length > 0){
        list = _.map(this._dirty$('link'), function (link) {
            return $(link).attr('href');
        });
    }
    return list;
};


// @param: options.url     string the url to call
var appendCSSFiles = exports.AppendCssFiles = function(snap, callback) {
    
    var urls = snap.getExternalCss(),
        cssFiles = [];

    if(urls && urls.length > 0) {
        var cb = _.after(urls.length, function() {
            if(cssFiles.length > 0) snap.appendCss(cssFiles);
            callback(snap);
        });

        _.each(urls, function(url, index, list) {
            console.log(url);
            request("http://www.qvinci.com" + url, function(error, response, body) {
                if (!error && response.statusCode == 200) {
                    cssFiles.push(body);
                    cb();
                }
            });
        });
    }
    else {
        callback(snap);
    }
};