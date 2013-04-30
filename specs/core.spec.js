//handle preload?
require(["Core", "Loader"], function(Core, Loader){

	describe("Core consctructor", function(){

		it("should have a constructor", function(){
			expect(Core).toBeInstanceOf(Function);
		});

		it("should be an object", function(){
			expect(new Core()).toBeInstanceOf(Object);
		});
	});

	describe("Observer implementation", function(){
		var core = null;
		beforeEach(function(){
			core = new Core();
		});

		describe("Observer setter", function(){
		
			it("should have a observer setter", function(){
				expect(core.setObserver).toBeInstanceOf(Function);
			});

			it("should allow to set an observer", function(){
				expect(core.setObserver({})).toEqual(false);
				//think about the observer implementation
				expect(core.setObserver({
					emit : function(){},
					on : function(){}
				})).toEqual(true);
			});
		});

		

		/*it("should have observer methods", function(){
			expect(core.emit).toBeInstanceOf(Function);
			expect(core.on).toBeInstanceOf(Function);
		});*/
	});

	describe("Loader implementation", function(){
		var core = null;
		beforeEach(function(){
			core = new Core();
		});

		it("should have loader methods", function(){
			expect(core.start).toBeInstanceOf(Function);
			expect(core.stop).toBeInstanceOf(Function);
		});

		it("should start/load an array of modules", function(){
			//packages are defined in the requirejs config (main modules are called automatically)
			define("package1");
			define("package2");

			//test parameters
			/*core.start(["package1", "package2"]);
			expect(require.defined("package1")).toEqual(false);
			expect(require.defined("package2")).toEqual(false);*/

			core.start([{name : "package1"},{name : "package2"}]);
			expect(require.defined("package1")).toEqual(true);
			expect(require.defined("package2")).toEqual(true);

		});

		//refactor inversion control and permission
		it("should pass a sandboxed observer", function(){
			var observer = {emit : function(){}, on : function(){}, once : function(){}};
			spyOn(Loader, "load").andCallThrough();
			spyOn(observer, "emit").andCallThrough();

			core.setObserver(observer);
			core.start([{name : "package1"}]);

			expect(Loader.load.wasCalled).toEqual(true);
			var sandbox = Loader.load.mostRecentCall.args[1];

			expect(sandbox).toBeInstanceOf(Object);
			expect(sandbox.emit).toBeInstanceOf(Function);
			expect(sandbox.on).toBeInstanceOf(Function);

			sandbox.emit("event");
			expect(observer.emit.wasCalled).toEqual(true);
			expect(observer.emit.mostRecentCall.args[0]).toEqual("package1:event");

		});


	});
});