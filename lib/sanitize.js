var _ = require('underscore');

var blackList = [
  "script",
  "iframe",
  "form",
  "object",
  "embed",
  "link",                
  "head",
  "meta"
]


var html = exports.html = function($){
  if(typeof $ === 'undefined'){
    return;
  } 
  _.each(blackList, function(node){
    if($(node) != null) {
        $(node).remove();
    }
  });
};