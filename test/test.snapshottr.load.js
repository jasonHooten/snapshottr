var SnapShottr = require("../"),
         expect = require("chai").expect;

describe('()', function() {  
	it('should create an empty object', function() {
		var snap = new SnapShottr();
 		expect(snap).to.exist;
		expect(snap.isSnapShottr).to.be.true;

		expect(snap._url).to.be.empty;
		expect(snap._rawHtml).to.be.empty;
		expect(snap._selector).to.be.empty;
		expect(snap._$).to.be.empty;
	});
});