var _ = require('underscore');

exports.execute = function(snap, callback){
    if(typeof $ === 'undefined'){
      return;
    }

    removeTags(snap);

    callback()
};


var blackListTags = [
  "script",
  "iframe",
 // "form",
  "object",
  "embed",
//  "link",                
//  "head",
//  "meta"
];

var removeTags = function($) {
    _.each(blackListTags, function(node){
        if($(node)) {
            $(node).remove();
        }
    });
};

