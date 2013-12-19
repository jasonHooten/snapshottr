/**
 * Convert a string to camel case notation.
 * @param  {String} str Original string
 * @return {String}     String in camel case notation.
 */
var camelCase = exports.camelCase = function(str) {
  return str.replace(/[_.-](\w|$)/g, function(_, x) {
    return x.toUpperCase();
  });
};

/**
 * Replaces all occruences of a string with a new string.
 * @param  {String} find    String to be replaced.
 * @param  {String} replace String to be replaced with.
 * @param  {String} str     Original string.
 * @return {String}         String with replaced text.
 */
var replaceAll = exports.replaceAll = function (find, replace, str) {
  return str.replace(new RegExp(escapeRegExp(find), 'g'), replace);
}

function escapeRegExp(str) {
  return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
}