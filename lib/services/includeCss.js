var request = require('request'),
    _ = require('underscore');


exports.append = function(snap, callback) {
    
    var urls = getExternalLinks(snap),
        cssFiles = [];

    if(urls && urls.length > 0) {
        var cb = _.after(urls.length, function() {
            if(cssFiles.length >= 0) snap.appendCss(cssFiles);
            callback(snap);
        });

        _.each(urls, function(url, index, list) {
            request(host + url, function(error, response, body) {
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



var getExternalLinks = function(snap) {
    var list = [];

    if(this._dirty$('link').length > 0){
        list = _.map(this._dirty$('link'), function (link) {
            return $(link).attr('href');
        });
    }
    return list;
};