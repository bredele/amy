var Loader = require('loader')
  , debug = require('debug')('amy')
  , Sandbox = require('sandbox');


/**
 * Expose `Amy`.
 */

module.exports = Amy;


/**
 * Initialize a new `Amy`.
 *
 * @api public
 */

function Amy() {
  this.loader = new Loader(require);
}


/**
 * Load a package and pass a sandbox and optional parameters.
 * @param  {String} name package's name
 * @return {Amy}       
 *
 * @api public
 */

Amy.prototype.use = function(name) {
  //pass others params
  loader.use(name, new Sandbox(name));
  debug('%s package loaded', name);
  return this;
};


/**
 * Load packag
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

