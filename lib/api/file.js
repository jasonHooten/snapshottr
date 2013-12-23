var fs = require('fs');

var load = exports.load = function(html, fileName) {
    fs.writeFile("/tmp/test.html", html, function(err) {
        if (err) {
            console.log(err);
        } else {
            console.log("The file was saved!");
        }
    });
};