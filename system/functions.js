/**
 *  Prototyping functions
 */
Array.prototype.inArray = function(element) { 
  for (var j in this) { 
    if (this[j] == arguments[0]) { 
      return true;
    } 
  }

  return false;     
}