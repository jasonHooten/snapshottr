var snapShottr = require("./../lib/snapshottr"),
        assert = require("assert"),
        fs = require('fs');;

var snap;

beforeEach(function() {
    snap = new snapShottr;
});


describe('{load}', function() {
    it('should accept an empty html string', function() {
        snap.load('');
        assert.equal(snap._rawHtml,"");
    });
    
    it('should accept a well formed html string', function() {
        snap.load('<div>hello world</div>');
        assert.equal(snap._rawHtml, "<div>hello world</div>");
        assert.equal(snap._$('div').text(), "hello world");
    });
    
    it('should accept single quotes html string', function() {
        snap.load('<div title=\'test\'>hello world</div>');
        assert.equal(snap._$('div').text(), "hello world");
    });
    
    it('should accept double quotes html string', function() {
        snap.load('<div title=\"test\">hello world</div>');
        assert.equal(snap._$('div').text(), "hello world");
    });
    
    // make sure it can handle css
    it('should accept html and css', function() {
        snap.load('<div>hello world</div>', 'first');
        assert.equal(snap._rawHtml, "<div>hello world</div>");
        assert.equal(snap._$('style').text(), "first");
    });
    

    it('should accept html and multiple css', function() {
        snap.load('<div>hello world</div>', 'first', 'second');
        assert.equal(snap._rawHtml, "<div>hello world</div>");
        assert.equal(snap._$('style').text(), "first,second");
    });

    // make sure to remove unused tags from the dom, but not from the original html
    it('should strip out javascript tags', function() {
        snap.load('<script></script>');
        assert.equal(snap._rawHtml, "<script></script>");
        assert.equal(snap._$('script').length, 0);
    });
    
    it('should strip out iframe tags', function() {
        snap.load('<iframe></iframe>');
        assert.equal(snap._rawHtml, "<iframe></iframe>");
        assert.equal(snap._$('iframe').length, 0);
    });
    /*
    it('should strip out form tags', function() {
        snap.load('<form></form>');
        assert.equal(snap._rawHtml, "<form></form>");
        assert.equal(snap._$('form').length, 0);
    });
    */
    it('should strip out object tags', function() {
        snap.load('<object></object>');
        assert.equal(snap._rawHtml, "<object></object>");
        assert.equal(snap._$('object').length, 0);
    });
    
    it('should strip out embed tags', function() {
        snap.load('<embed></embed>');
        assert.equal(snap._rawHtml, "<embed></embed>");
        assert.equal(snap._$('embed').length, 0);
    });
   /* 
    it('should strip out link tags', function() {
        snap.load('<link></link>');
        assert.equal(snap._rawHtml, "<link></link>");
        assert.equal(snap._$('link').length, 0);
    });
    
    it('should strip out head tags', function() {
        snap.load('<head></head>');
        assert.equal(snap._rawHtml, "<head></head>");
        assert.equal(snap._$('head').length, 0);
    });
    
    it('should strip out meta tags', function() {
        snap.load('<meta></meta>');
        assert.equal(snap._rawHtml, "<meta></meta>");
        assert.equal(snap._$('meta').length, 0);
    });*/
});



describe('{view}', function() {
    it('should return an empty string if empty', function() {
        snap.load('');
        assert.equal(snap.view(),"");
    });

    it('should return a string', function() {
        snap.load('test');
        assert.equal(snap.view(),"test");
    });

    it('should handle div tags', function() {
        snap.load('<div>test</div>');
        assert.equal(snap.view(),"<div>test</div>");
    });
});


describe('{appendCss}', function() {
    beforeEach(function() {
        snap.load('test');
    });

    it('does nothing if no css is passed in', function() {
        snap.appendCss();
        assert.equal(snap.view(),"test");
    });

    it('should create a style tag', function() {
        snap.appendCss('');
        assert.equal(snap.view(),"<style></style>test");
    });

    it('should only ever create 1 style tag', function() {
        snap.appendCss('');
        snap.appendCss('');
        assert.equal(snap.view(),"<style></style>test");
    });

    it('should append new css strings to the style tag', function() {
        snap.appendCss('test1');
        snap.appendCss('test2');
        assert.equal(snap.view(),"<style>test1\ntest2</style>test");
    });

    it('should append multipe css strings in the arguments', function() {
        snap.appendCss('test1', 'test2');
        assert.equal(snap.view(),"<style>test1\ntest2</style>test");
    });

    it('should clean the css of style tags', function() {
        snap.appendCss('<style></style>');
        assert.notEqual(snap.view(),"<style><style></style></style>test");
        assert.equal(snap.view(),"<style></style>test");
    });
});


describe('{replaceCss}', function() {
    beforeEach(function() {
        snap.load('<style>old</style>test');
    });

    it('does nothing if no css is passed in', function() {
        snap.replaceCss();
        assert.equal(snap.view(),"<style>old</style>test");
    });


    it('should replace old css with new', function() {
        snap.replaceCss('new');
        assert.equal(snap.view(),"<style>new</style>test");
    });


    it('should alwyas replace old css with new', function() {
        snap.replaceCss('new');
        snap.replaceCss('new2');
        assert.equal(snap.view(),"<style>new2</style>test");
    });


    it('should replace old css with new', function() {
        snap.replaceCss('new', 'new2');
        assert.equal(snap.view(),"<style>new\nnew2</style>test");
    });
});


describe('{removeCss}', function() {
    beforeEach(function() {
        snap.load('test');
    });

    it('should do nothing if there is no css', function() {
        snap.removeCss();
        assert.equal(snap.view(),"test");
    });

    it('should remove css if it exsts', function() {
        snap.appendCss('<style></style>');
        snap.removeCss();
        assert.equal(snap.view(),"test");
    });
});

/*
describe('{export}', function() {
    beforeEach(function() {
        snap.load('<h1>test</h1>');
    });

    it('should export to a default location', function() {
       assert.equal(snap.fileLocation, "./tmp/");
    });

    it('should export an html file to the tmp folder specified', function() {
        var fileLoc = "./test/";
        snap.export("test1", fileLoc);
        fs.exists(fileLoc, function (exists) {
            assert.equal(exists, true);
        });
    });
});
*/

describe('{import}', function() {
    it('should import an html file from the tmp folder specified', function() {
        var fileLoc = "./test/";
        snap.import("importTest", fileLoc, function(data){
            assert.equal(data, "<div>importTest</div>");
        });
    });
});

describe('{links.getExternalCss}', function() {
    it('should return the correct href url', function() {
        snap.load('<link rel="stylesheet" type="text/css" href="testUrl"></link>');
        assert.equal(snap.getExternalCss()[0], "testUrl");
    });
    
    it('should return the correct href url', function() {
        snap.load('<link rel="stylesheet" type="text/css" href="testUrl1"></link><link rel="stylesheet" type="text/css" href="testUrl2"></link>');
        assert.equal(snap.getExternalCss()[0], "testUrl1");
        assert.equal(snap.getExternalCss()[1], "testUrl2");
    });
});