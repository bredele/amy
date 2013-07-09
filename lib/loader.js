var toArray = require('toarray');


/**
 * Expose `Loader`.
 */

module.exports = Loader;


/**
 * Initialize a new `Loader`.
 *
 * @api public
 */

function Loader() {
  
}


/**
 * Load commonjs package.
 * @param  {name} name package name
 */

Loader.prototype.use = function(name) {
  var mod = require(name);
  if(typeof mod === 'function'){
    mod.apply(null, toArray(arguments, 1));
  }
  return this;
};


Loader.prototype.async = function(name) {
  //use bredele/lazy-loading
};
