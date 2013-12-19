var snapShottr = require("./../lib/snapshottr");

var snap;

beforeEach(function() {
    snap = new snapShottr;
});

describe('ping', function() {
    it('should pong', function() {
        expect(snap.ping()).toEqual("pong");
    });
});

describe('load', function() {
    it('should accept an empty html string', function() {
        snap.load('');
        expect(snap._rawHtml).toEqual("");
    });
    
    it('should accept a well formed html string', function() {
        snap.load('<div>hello world</div>');
        expect(snap._rawHtml).toEqual("<div>hello world</div>");
        expect(snap._$('div').text()).toEqual("hello world");
    });
    
    // make sure it can handle css
    it('should accept html and css', function() {
        snap.load('<div>hello world</div>', 'first');
        expect(snap._rawHtml).toEqual("<div>hello world</div>");
        expect(snap._$('style').text()).toEqual("first");
    });
    

    it('should accept html and multiple css', function() {
        snap.load('<div>hello world</div>', 'first', 'second');
        expect(snap._rawHtml).toEqual("<div>hello world</div>");
        expect(snap._$('style').text()).toEqual("first,second");
    });

    // make sure to remove unused tags from the dom, but not from the original html
    it('should strip out javascript tags', function() {
        snap.load('<script></script>');
        expect(snap._rawHtml).toEqual("<script></script>");
        expect(snap._$('script').length).toEqual(0);
    });
    
    it('should strip out iframe tags', function() {
        snap.load('<iframe></iframe>');
        expect(snap._rawHtml).toEqual("<iframe></iframe>");
        expect(snap._$('iframe').length).toEqual(0);
    });
    
    it('should strip out form tags', function() {
        snap.load('<form></form>');
        expect(snap._rawHtml).toEqual("<form></form>");
        expect(snap._$('form').length).toEqual(0);
    });
    
    it('should strip out object tags', function() {
        snap.load('<object></object>');
        expect(snap._rawHtml).toEqual("<object></object>");
        expect(snap._$('object').length).toEqual(0);
    });
    
    it('should strip out embed tags', function() {
        snap.load('<embed></embed>');
        expect(snap._rawHtml).toEqual("<embed></embed>");
        expect(snap._$('embed').length).toEqual(0);
    });
    
    it('should strip out link tags', function() {
        snap.load('<link></link>');
        expect(snap._rawHtml).toEqual("<link></link>");
        expect(snap._$('link').length).toEqual(0);
    });
    
    it('should strip out head tags', function() {
        snap.load('<head></head>');
        expect(snap._rawHtml).toEqual("<head></head>");
        expect(snap._$('head').length).toEqual(0);
    });
    
    it('should strip out meta tags', function() {
        snap.load('<meta></meta>');
        expect(snap._rawHtml).toEqual("<meta></meta>");
        expect(snap._$('meta').length).toEqual(0);
    });
});


