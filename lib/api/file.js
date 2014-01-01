var fs = require('fs');


var fileLocation = exports.fileLocation = "./tmp/";

/**
 * exports a html file from snapshottr.
 * @param: fileName             the file's name to import
 * @param: optionFileLocation   {optional} the files location, defaults to "./tmp/"
 * @param: callback             the callback function once the operation is complete
 */
var exportFile = exports.export = function(fileName, optionFileLocation, callback) {
    optionFileLocation = optionFileLocation || fileLocation;

    fs.writeFile(optionFileLocation + fileName + ".html", this.view(), function(err, data) {
        if (err) {
            console.log(err);
            throw err;
        }
        callback(data);
    });
};



/**
 * Imports a html file into snapshottr.
 * @param: fileName             the file's name to import
 * @param: optionFileLocation   {optional} the files location, defaults to "./tmp/"
 * @param: callback             the callback function once the operation is complete
 */
var importFile = exports.import = function(fileName, optionFileLocation, callback) {
    optionFileLocation = optionFileLocation || fileLocation;

    fs.readFile(optionFileLocation + fileName +".html", function (err, data) {
        if (err) {
            console.log(err);
            throw err;
        }
        callback(data);
    });
};