var debug = require('debug')('amy')
  , toArray = require('toarray');


/**
 * Expose `Amy`.
 */

module.exports = Amy;


/**
 * Initialize a new `Amy`.
 *
 * @api public
 */

function Amy(loader) {
  this.loader = loader;
}


/**
 * Load a package and pass a sandbox and optional parameters.
 * @param  {String} name package's name
 * @return {Amy}       
 *
 * @api public
 */

Amy.prototype.use = function(name) {
  var mod = this.loader(name);
  if(typeof mod === 'function'){
    mod.apply(null, toArray(arguments, 1));
  }
  debug('%s package loaded', name);
  return this;

  // this.loader.use(name, new Sandbox(name));

};

Amy.prototype.async = function() {
  // body...
};


/**
 * Load packages
 * @param  {[type]} package [description]
 * @return {[type]}         [description]
 *
 * @api public
 */

Amy.prototype.start = function(packages) {
  for(var i = 0, l = packages.length; i < l; i++){
    // var package = packages[i];
  }
};

