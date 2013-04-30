define("Loader", ["Tools"], function(Tools){
	/**
	* @class
	* Loader singleton module.
	* Requirejs dependencies injector
	* @author Olivier Wietrich
	*/
	function LoaderConstructor(){
		var _isString = function(test, message) {
			if(typeof test !== "string"){
				throw new Error(message);
			}
		};
		/**
		* Load module ith given name.
		* @param {String} module's name
		* @throws {TypeError} error if name isn't a string
		* @return true if loaded
		*/
		this.load = function(name, sandbox, options){
			_isString(name, "error");

			var bool = false;
			//main could jave reset method to reset the widget
			if(!require.defined(name)){
				require([name], function(main){
					try {
						//pass a sandbox wit observer and the service name
						var args = options? options : [];
						args.unshift(sandbox);
						main.apply(null, args);
					} catch(error){
						//error has a list of modules that failed
						//if an error occurs, it is passed to the second
						//callback and the method return false...that's why we
						//catched the error
						//return what?
					}
					bool = true;
				}, function(error){
					//bool = false;
				});
			}
			return bool;
		};

		/**
		* Unload module ith given name.
		* @param {String} module's name
		*/
		this.unload = function(name){
			//throw something?
			Tools.loop(require.s.contexts._.defined, function(value, key){
				if(key.indexOf(name) !== -1){
					require.undef(key);
				}
			});
			/*for(var key in defined){
				if(defined.hasOwnProperty(key) && key.indexOf(name) !== -1){
					require.undef(key);
				}
			}*/
			require.undef(name);
		};
	}

	//do a factory?
	return new LoaderConstructor();
});