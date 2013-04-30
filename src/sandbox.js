define("Sandbox", ["module", "Tools"], 
	/*
	* @class
	* Sandbox module.
	* It wraps (façacde) an observer and allows to send messages among packages.
	* @author Olivier Wietrich
	*/
	function(module, Tools){
		/*
		* Sandbox module constructor.
		* @private 
		* @returns
		*/
		return function SandboxConstructor($identifier){

			var _observer = null,
				_logger = "logger" || module.config().logger,
				_notifications = "notifications" || module.config().namespace,
				_publish = function(namespace, parameters){
					return _observer.emit.apply(_observer, [namespace + ":" + parameters[0]].concat(Tools.toArray(parameters).slice(1)));
				};

			this.getIdentifier = function(){
				return $identifier;
			};


			/*
			* Set observer.
			* @param {Object} Observer's like.
			* @return {Boolean} true if the observer has been set.
			*/
			this.setObserver = function(observer){
				//may be call this methid setTransport
				//is it necessary?
				if(observer && typeof observer.emit === "function" && 
					typeof observer.on === "function" && 
					typeof observer.once === "function"){
					_observer = observer;
					return true;
				}
				return false;
			};

			/*
			* Publisher.
			*/
			this.emit = function(){
				//what happend if observer is not defined?
				_publish($identifier, arguments);
			};

			/*
			* Subscriber.
			*/
			this.on = function(){
				_observer.on.apply(_observer, arguments);
			};

			/*
			* Subscriber once.
			*/
			this.once = function(){
				//may be the sandbox should do the once.
				_observer.once.apply(_observer, arguments);
			};

			//this.notify (send to notification namespace?)
			this.notify = function(){
				_publish(_notifications, arguments);
			};
			//this.log

			this.log = function(gravity, message){
				_observer.emit.apply(_observer, [_logger, new Date().toString(), $identifier, gravity, message]);
			};

		};
});