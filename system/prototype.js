/**
 *  Prototyping Array functions
 */
Array.prototype.inArray = function() { 
  for (var j in this) { 
    if (this[j] == arguments[0]) { 
      return true;
    } 
  }

  return false;     
}

/**
 *  Prototyping String functions
 */
String.prototype.sanitize = function() { 
  return decodeURIComponent([this].map(function (e) { return e; }).join('')).replace(/'/g, '');
}

String.prototype.escape = function() { 
  return decodeURIComponent([this].map(function (e) { return e; }).join('')).replace(/'/g, "\\'");
}