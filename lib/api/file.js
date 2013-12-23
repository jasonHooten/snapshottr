var fs = require('fs'),
    zip = require('node-zip')();


var fileLocation = exports.fileLocation = "./tmp/";


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