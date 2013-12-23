var fs = require('fs'),
    zip = require('node-zip')();


var fileLocation = exports.fileLocation = "./tmp/";


var exportFile = exports.export = function(fileName, optionFileLocation) {
    optionFileLocation = optionFileLocation || fileLocation;

    fs.writeFile(optionFileLocation + fileName + ".html", this.view(), function(err) {
        if (err) {
            console.log(err);
        }
    });
};