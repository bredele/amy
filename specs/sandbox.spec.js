require(["Sandbox"], function(Sandbox){
/*should stdout sur console ou par requête ajax type syslog..faire logger.js et signal.js*/


	describe("Sandbox construction", function(){

		it("should have a constructor function", function(){
			expect(Sandbox).toBeInstanceOf(Function);
		});

		it("should be an Object", function(){
			expect(new Sandbox()).toBeInstanceOf(Object);
		});

	});

	describe("Sandbox Identifier", function(){

		var sandbox = null;
		beforeEach(function(){
			sandbox = new Sandbox("test")
		});

		it("should have a function to return the sandbox's identifer", function(){
			var sandbox = new Sandbox();
			expect(sandbox.getIdentifier).toBeInstanceOf(Function);
		});

		it("should set the identifier at the sandbox's construction", function(){
			expect(sandbox.getIdentifier()).toEqual("test");

			var other = new Sandbox();
			expect(other.getIdentifier()).not.toBeDefined();
		});
	});

	describe("Sandbox observer", function(){
		var sandbox = null,
			observer = null;
		beforeEach(function(){
			sandbox = new Sandbox("test");
			observer = {
				emit : jasmine.createSpy("emit"),
				on : jasmine.createSpy("on"),
				once : jasmine.createSpy("once")
			};
		});

		describe("Sandbox observer setter", function(){

			//the observer is created inside the sandbox?

			it("should have a setter function", function(){
				//no getter
				expect(sandbox.setObserver).toBeInstanceOf(Function);
			});

			it("should only set Observer's like objects", function(){
				//configure methods?
				expect(sandbox.setObserver({})).toEqual(false);
				expect(sandbox.setObserver(null)).toEqual(false);
				expect(sandbox.setObserver()).toEqual(false);
				expect(sandbox.setObserver(true)).toEqual(false);
				expect(sandbox.setObserver(observer)).toEqual(true);
			});


			/*it("should set the observer at initialization", function(){

			})*/

		});

		describe("Sandbox emit handler", function(){

			it("should have an emit function", function(){
				expect(sandbox.emit).toBeInstanceOf(Function);
			});

			it("should emit a message namespaced by the sandbox identifier", function(){
				sandbox.setObserver(observer);
				sandbox.emit("topic");
				expect(observer.emit).toHaveBeenCalled();
				expect(observer.emit.mostRecentCall.args[0]).toEqual("test:topic");
			});

			//should we test the observer result? Like a message has been really emitted?

			it("should pass every arguments to the observer emit function", function(){
				sandbox.setObserver(observer);
				sandbox.emit("topic", true, 2, "test");
				expect(observer.emit.mostRecentCall.args[1]).toEqual(true);
				expect(observer.emit.mostRecentCall.args[2]).toEqual(2);
				expect(observer.emit.mostRecentCall.args[3]).toEqual("test");
			});
		});

		describe("Sandbox on handler", function(){

			it("should have an on function", function(){
				expect(sandbox.on).toBeInstanceOf(Function);
			});

			it("should listen message", function(){
				var func = function(){},
					scope = {};

				sandbox.setObserver(observer);
				sandbox.on("topic", func, scope);

				expect(observer.on).toHaveBeenCalled();
				expect(observer.on.mostRecentCall.args[0]).toEqual("topic");
				expect(observer.on.mostRecentCall.args[1]).toBe(func);
				expect(observer.on.mostRecentCall.args[2]).toBe(scope);
			});
		});

		describe("Sandbox once handler", function(){
			it("should have an once function", function(){
				expect(sandbox.once).toBeInstanceOf(Function);
			});

			it("should listen message", function(){
				var func = function(){},
					scope = {};

				sandbox.setObserver(observer);
				sandbox.once("topic", func, scope);

				expect(observer.once).toHaveBeenCalled();
				expect(observer.once.mostRecentCall.args[0]).toEqual("topic");
				expect(observer.once.mostRecentCall.args[1]).toBe(func);
				expect(observer.once.mostRecentCall.args[2]).toBe(scope);
			});
		});

		describe("Sandbox notify handler", function(){

			beforeEach(function(){
				sandbox.setObserver(observer);
			});

			it("should have a notify function", function(){
				expect(sandbox.notify).toBeInstanceOf(Function);
			});

			it("should emit a namespaced with a configurable notifications namespace", function(){
				observer.emit.reset();
				sandbox.notify("event");
				expect(observer.emit).toHaveBeenCalled();
				expect(observer.emit.mostRecentCall.args[0]).toEqual("notifications:event");
			});

			it("should pass every arguments to the observer emit function", function(){
				sandbox.notify("topic", true, 2, "test");
				expect(observer.emit.mostRecentCall.args[1]).toEqual(true);
				expect(observer.emit.mostRecentCall.args[2]).toEqual(2);
				expect(observer.emit.mostRecentCall.args[3]).toEqual("test");
			});

			//how to test the namespace configuration?

		});


		describe("Sandbox Logger handler", function(){

			beforeEach(function(){
				sandbox.setObserver(observer);
			});
			it("should have a log function", function(){
				expect(sandbox.log).toBeInstanceOf(Function);
			});

			//test parameters?

			it("should emit messages through the sandbox", function(){
				sandbox.log(20, "this is a debug message");
				expect(observer.emit).toHaveBeenCalled();
			});

			it("should log messages with date", function(){
				spyOn(Date.prototype, "toString").andCallThrough();
				sandbox.log(20, "this is a debug message");

				expect(Date.prototype.toString).toHaveBeenCalled();
				var date = new Date(observer.emit.mostRecentCall.args[1]);
				//isNan not defined?
				//expect(isNan(date.getTime())).toEqual(false);
				expect(date.toJSON()).toBeDefined();

			});

			it("should log messages by priority and package name", function(){
				sandbox.log(20, "this is a debug message");

				//the package to send the log (should be configurable)
				expect(observer.emit.mostRecentCall.args[0]).toEqual("logger");
				
				//the identifier we gave to our sandbox for our tests
				expect(observer.emit.mostRecentCall.args[2]).toEqual("test");
				//the gravity level
				expect(observer.emit.mostRecentCall.args[3]).toEqual(20);
				//the debug message
				expect(observer.emit.mostRecentCall.args[4]).toEqual("this is a debug message");

			});

		});
	});




});