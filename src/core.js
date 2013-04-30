define("Core", ["Loader", "Sandbox", "Tools"], 
	/*
	* @class
	* Core module.
	* Application loader.
	* @author Olivier Wietrich
	*/
	function(Loader, Sandbox, Tools){
		/*
		* Core module constructor.
		* @private 
		* @returns
		*/
		return function CoreConstructor(){

			var _observer = null;

			/*
			* Set observer.
			* @param {Object} Observer's like
			* @return true if observer has been set
			*/
			this.setObserver = function(observer){
				//and once?
				if(typeof observer.emit === "function" && typeof observer.on === "function"){
					_observer = observer;
					return true;
				}
				return false;
			};

			/*
			* Inject wishes packages.
			* @param {Array} Array of packages
			*/
			this.start = function(modules){
				//do we need a queue if modules has not been started?
				Tools.loop(modules, function(module){
					var name = module.name,
						sandbox = new Sandbox(name);

					sandbox.setObserver(_observer);
					//if true init service message?-->pass a sandbox (should may be an object itself)
					Loader.load(name, sandbox, module.options);
				});
			};

			this.stop = function(){

			};
		};
});