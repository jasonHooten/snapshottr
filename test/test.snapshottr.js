var SnapShottr = require("../"),
        assert = require("assert"),
        fs = require('fs');;


describe('()', function() {
    
    it('should accept an empty html string', function() {
        var snap = SnapShottr('');
        assert.equal(snap.isSnapShottr, true);
        assert.equal(snap._rawHtml,"");
    });
    
    it('should accept a well formed html string', function() {
        var snap = SnapShottr('<div>hello world</div>');
        assert.equal(snap._rawHtml, "<div>hello world</div>");
        assert.equal(snap._$('div').html(), "hello world");
    });
    
    it('should accept single quotes html string', function() {
        snap = SnapShottr('<div title=\'test\'>hello world</div>');
        assert.equal(snap._$('div').text(), "hello world");
    });
    
    it('should accept double quotes html string', function() {
        var snap = SnapShottr('<div title=\"test\">hello world</div>');
        assert.equal(snap._$('div').text(), "hello world");
    });
    
    // selector
    it('should accept html with a class selector', function() {
        var snap = SnapShottr('<div>not this one</div><div class="test">hello world</div>', ".test");
        assert.equal(snap._rawHtml, '<div class="test">hello world</div>');
    });


    it('should accept html with a id selector', function() {
        var snap = SnapShottr('<div>not this one</div><div id="test">hello world</div>', "#test");
        assert.equal(snap._rawHtml, '<div id="test">hello world</div>');
    });

    // make sure to remove unused tags from the dom, but not from the original html
    it('should strip out javascript tags', function() {
        var snap = SnapShottr('<script></script>');
        assert.equal(snap._rawHtml, "<script></script>");
        assert.equal(snap._$('script').length, 0);
    });
    
    it('should strip out iframe tags', function() {
        var snap = SnapShottr('<iframe></iframe>');
        assert.equal(snap._rawHtml, "<iframe></iframe>");
        assert.equal(snap._$('iframe').length, 0);
    });
    /*
    it('should strip out form tags', function() {
        var snap = SnapShottr('<form></form>');
        assert.equal(snap._$('form').length, 0);
    });
    */
    it('should strip out object tags', function() {
        var snap = SnapShottr('<object></object>');
        assert.equal(snap._$('object').length, 0);
    });
    
    it('should strip out embed tags', function() {
        var snap = SnapShottr('<embed></embed>');
        assert.equal(snap._$('embed').length, 0);
    });
   /*
    it('should strip out link tags', function() {
        var snap = SnapShottr('<link></link>');
        assert.equal(snap._rawHtml, "<link></link>");
        assert.equal(snap._$('link').length, 0);
    });
    
    it('should strip out head tags', function() {
        var snap = SnapShottr('<head></head>');
        assert.equal(snap._rawHtml, "<head></head>");
        assert.equal(snap._$('head').length, 0);
    });
    
    it('should strip out meta tags', function() {
        var snap = SnapShottr('<meta></meta>');
        assert.equal(snap._rawHtml, "<meta></meta>");
        assert.equal(snap._$('meta').length, 0);
    });*/
});



describe('{view}', function() {
    it('should return an empty string if empty', function() {
        var snap = SnapShottr('');
        assert.equal(snap.view(),"");
    });

    it('should return a string', function() {
        var snap = SnapShottr('test');
        assert.equal(snap.view(),"test");
    });

    it('should handle div tags', function() {
        var snap = SnapShottr('<div>test</div>');
        assert.equal(snap.view(),"<div>test</div>");
    });
});


describe('{appendCss}', function() {

    it('does nothing if no css is passed in', function() {
        var snap = SnapShottr('test');
        snap.appendCss();
        assert.equal(snap.view(),"test");
    });

    it('should create a style tag', function() {
        var snap = SnapShottr('test');
        snap.appendCss('');
        assert.equal(snap.view(),"<style></style>test");
    });

    it('should only ever create 1 style tag', function() {
        var snap = SnapShottr('test');
        snap.appendCss('');
        snap.appendCss('');
        assert.equal(snap.view(),"<style></style>test");
    });

    it('should append new css strings to the style tag', function() {
        var snap = SnapShottr('test');
        snap.appendCss('test1');
        snap.appendCss('test2');
        assert.equal(snap.view(),"<style>test1\ntest2</style>test");
    });

    it('should append multipe css strings in the arguments', function() {
        var snap = SnapShottr('test');
        snap.appendCss('test1', 'test2');
        assert.equal(snap.view(),"<style>test1\ntest2</style>test");
    });

    it('should clean the css of style tags', function() {
        var snap = SnapShottr('test');
        snap.appendCss('<style></style>');
        assert.notEqual(snap.view(),"<style><style></style></style>test");
        assert.equal(snap.view(),"<style></style>test");
    });
});


describe('{replaceCss}', function() {
    
    it('does nothing if no css is passed in', function() {
        var snap = SnapShottr('<style>old</style>test');
        snap.replaceCss();
        assert.equal(snap.view(),"<style>old</style>test");
    });


    it('should replace old css with new', function() {
        var snap = SnapShottr('<style>old</style>test');
        snap.replaceCss('new');
        assert.equal(snap.view(),"<style>new</style>test");
    });


    it('should alwyas replace old css with new', function() {
        var snap = SnapShottr('<style>old</style>test');
        snap.replaceCss('new');
        snap.replaceCss('new2');
        assert.equal(snap.view(),"<style>new2</style>test");
    });


    it('should replace old css with new', function() {
        var snap = SnapShottr('<style>old</style>test');
        snap.replaceCss('new', 'new2');
        assert.equal(snap.view(),"<style>new\nnew2</style>test");
    });
});


describe('{removeCss}', function() {
    
    it('should do nothing if there is no css', function() {
        var snap = SnapShottr('test');
        snap.removeCss();
        assert.equal(snap.view(),"test");
    });

    it('should remove css if it exsts', function() {
        var snap = SnapShottr('test');
        snap.appendCss('<style></style>');
        snap.removeCss();
        assert.equal(snap.view(),"test");
    });
});

describe('{links.getExternalCss}', function() {
    it('should return the correct href url', function() {
        var snap = SnapShottr('<link rel="stylesheet" type="text/css" href="testUrl"></link>');
        assert.equal(snap.getExternalCss()[0], "testUrl");
    });
    
    it('should return the correct href url', function() {
        var snap = SnapShottr('<link rel="stylesheet" type="text/css" href="testUrl1"></link><link rel="stylesheet" type="text/css" href="testUrl2"></link>');
        assert.equal(snap.getExternalCss()[0], "testUrl1");
        assert.equal(snap.getExternalCss()[1], "testUrl2");
    });
});

/*
describe('{export}', function() {
    beforeEach(function() {
        var snap = SnapShottr('<h1>test</h1>');
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


