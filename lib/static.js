var cheerio = require('cheerio'),
    _ = require('underscore');


/**
 * Loads html (and css) into snapshottr
 * @param: {String}        html
 * @param: {string}        jquery style selector
 * @param: {css, [, css]}  array of css strings
 */
var load = exports.load = function(html, selector) {
    var SnapShottr = require('./snapshottr');
   
    var initialize = function(html, selector) {
        console.log('here');
        return new SnapShottr(html, selector, css);
    };

    // Add in the static methods
    initialize.__proto__ = exports;

    return initialize;
};