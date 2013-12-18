var cheerio = require('cheerio');

var newline = '\n';

function SnapShottr() {
    this._rawHtml = "";
    this._$ = { };
}

SnapShottr.prototype.ping = function(html) {
    console.log('pong..');
};

SnapShottr.prototype.load = function(html) {
    this._rawHtml = html;
    this._$ = (html === null) ? cheerio.load('') : cheerio.load(html);
};

// @param: css, [, css]
SnapShottr.prototype.replaceCss = function(/* css, [, css] */) {
    if(this._$('style') != null) {
        this._$('style').remove();
    }
    this.appendCss(Array.prototype.slice.call(arguments));
};


SnapShottr.prototype.appendCss = function(/* css, [, css] */) {
    var css = Array.prototype.slice.call(arguments).join(newline);
    
    if(this._$('style').length) {
        css = this._$('style').text().concat(newline + css);
    }else if(this._$.contains('head')) {
        this._$('head').append('<style></style>');
    }else {
        this._$.root().prepend('<style></style>');
    }

    // remove any script tag
    if(css.indexOf('<style>') !== -1) {
        replaceAll('<style>', '', css);
        replaceAll('</style>', '', css);
    }

    this._$('style').text(css);
};


SnapShottr.prototype.view = function(chunk){
    return this._$.html();
};

/////////////////////////////////
// Export the API 
exports.SnapShottr = SnapShottr;


////////////////////////////////
// Private functions
function escapeRegExp(str) {
  return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
}

function replaceAll(find, replace, str) {
  return str.replace(new RegExp(escapeRegExp(find), 'g'), replace);
}