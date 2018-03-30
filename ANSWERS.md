<!-- Answers to the Short Answer Essay Questions go here -->

1. In Mocha, what are the differences between `before`, `after`, `beforeEach`, and `afterEach`? When do they run? What are they used for?
 
 According to the Mocha documentation, 'before, after, beforeEach and afterEach" are hooks that run and execute logic in different blocks of the testing file. 
 `before` runs before all tests in a given function block and is only called once before the testing file is executed.
 `after`  runs after all tests in a given function block and is only called once after the testing file is executed.
 `beforeEach` runs before each test in a given function block or each test that matches the beforeEach hook. 
 `afterEach` runs after each test in a given function block or each test that matches the afterEach hook.

2. What is the point of Test Driven Development? What do you personally think about this approach?

  Test Driven Development is where you write a test for development of application source code. 
  Test-driven development (TDD) has multiple tests which start with adding a test designed to fail 
	originally for the purposes of re-running new tests and makes new changes to the tests and running them until they pass.   
  There are two types of tests, acceptance tests and developer tests. I personally understand the value of test driven development
	and I like the approach in theory but its quite tedious to keep track of because it feels like the tests for acceptance and development
	are too similar, however it actually is very helpful to use test driven development to boil down the functions down to required functionality
	as TDD can actually save development time on large application by mitigating big large bugs that can cause calamity at work
  (which I have actually witnessed first during my time as an intern at a firewall company in Seattle, I was on team that fixed it).     
	
3. What is a `spy` in `sinon`? How do we use it to effectively test a `callback`?
 
  A Spy in sinon actually a function that according to the docs returns information about the calls being made to it. 
  Spies in Sinon actually have two different versions: anonymous function sinon.spy(); which are one way to test that callbacks are being called 
	correctly(not only when but where callbacks are called. It also checks that functions are invocated correctly. 
  The anonymous functions also won’t do anything except record information about its calls. 
	The second version are wrapper method functions with sinon syntax: sinon.spy(object, method). 
	The second "wrapper method function" versions are exactly the same as the anonymous variety except the spy won’t do anything except record information about its calls made to the function.      
 
