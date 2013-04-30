require(["Loader"], function(core){
	describe("Core construction", function(){
		it("should be an object singleton", function(){
			expect(core).toBeInstanceOf(Object);
		});
	});

	describe("Core load module", function(){

		it("should have a load function", function(){
			expect(core.load).toBeInstanceOf(Function);
		});

		it("should load modules by string id", function(){
			expect(function(){
				core.load();
			}).toThrow("error");
			expect(function(){
				core.load(false);
			}).toThrow("error");
			expect(function(){
				core.load(2);
			}).toThrow("error");
			expect(function(){
				core.load(null);
			}).toThrow("error");

			//promises? with timeout?
			expect(typeof core.load("module")).toEqual("boolean");
		});

		//we should may be load file in a asynchronous way (setTimeout)
		it("should require specified module", function(){
			define("test1");

			//a module is not defined until we require it
			expect(require.defined("test1")).toEqual(false);
			core.load("test1");
			expect(require.defined("test1")).toEqual(true);
		});

		//is it necessary to return a boolean?
		it("should return true if the module has been loaded", function(){
			define('test2');

			//we catch error for next test
			expect(core.load("test2")).toEqual(true);

			//error results are synchronous
			expect(core.load("test3")).toEqual(false);
			expect(core.load("test4")).toEqual(false);
		});

		it("should execute the module constructor", function(){
			//we catch error if doesn't have a constructor method
			var spy = jasmine.createSpy("constructor");
			define("testExec", function(){
				return spy;
			});
			core.load("testExec");
			expect(spy).toHaveBeenCalled();
		});

		it("should pass a sandbox object as a parameter", function(){
			var spy = jasmine.createSpy("constructor"),
				sandbox = {};
			define("testExecSandbox", function(){
				return spy;
			});

			//is array?
			core.load("testExecSandbox", sandbox);
			expect(spy.mostRecentCall.args[0]).toBe(sandbox);
		});

		it("should pass parameters to the module constructor", function(){
			var spy = jasmine.createSpy("constructor");
			define("testExec2", function(){
				return spy;
			});
			//is array?
			core.load("testExec2", {}, ["test", true, 2]);
			expect(spy.mostRecentCall.args[1]).toEqual("test");
			expect(spy.mostRecentCall.args[2]).toEqual(true);
			expect(spy.mostRecentCall.args[3]).toEqual(2);
		});

		it("can't load a module which is already defined", function(){
			define("testDefined1");
			core.load("testDefined1");
			expect(core.load("testDefined1")).toEqual(false);
		});

		it("should undefined a module which fails to load", function(){
			//callback error...asynchronous?
			//there is also a timeout

			//run(core.load("what"));
			//expect()

		});

	});

	describe("Core unload module", function(){

		it("should have an unload function", function(){
			expect(core.unload).toBeInstanceOf(Function);
		});

		it("should unload a module", function(){
			define("test5");
			require(["test5"]);
			expect(require.defined("test5")).toEqual(true);

			core.unload("test5");
			expect(require.defined("test5")).toEqual(false);
		});

		//should we return something?

		it("should unload all module dependencies", function(){
			//modules should run in isolation??? I think though! but shared dependencies?
			define("dep1");

			//simulate the packages engine in require.s.contexts._.defined
			define("dep1/dep2");
			core.load("dep1");
			core.load("dep1/dep2");

			spyOn(require, "undef").andCallThrough();
			core.unload("dep1");

			//it should be 2??? (may be called by require somewhere)
			expect(require.undef.calls.length).toEqual(3);
			expect(require.defined("dep1")).toEqual(false);
			expect(require.defined("dep1/dep2")).toEqual(false);
		});
	});


	describe("core stop module", function(){
		//should unload and remove associated dom
	});
});