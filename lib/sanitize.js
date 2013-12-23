var _ = require('underscore');

var sanitize = exports.sanitize = function($){
    if(typeof $ === 'undefined'){
      return;
    }
    removeTags($);
};



var blackListTags = [
  "script",
  "iframe",
  "form",
  "object",
  "embed",
  "link",                
  "head",
  "meta"
];

var removeTags = function($) {
    _.each(blackListTags, function(node){
        if($(node) != null) {
            $(node).remove();
        }
    });
};



var entityMap = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': '&quot;',
    "'": '&#39;',
    "/": '&#x2F;'
  };

var escapeHtml = function(html) {
    return String(html).replace(/[&<>"'\/]/g, function (s) {
      return entityMap[s];
    });
}


