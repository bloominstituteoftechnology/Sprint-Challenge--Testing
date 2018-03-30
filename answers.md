# In Mocha, what are the differences between `before` `after` `beforeEach` `afterEach`? When do they run? What are they used for?

Before and After run once before all the tests in a describe block, where as beforeEach and afterEach run both before and after each test in said block, respectively.

# What is the point of Test Driven Development? What do you personally think about this approach?

Test Driven Development is a process by which one writes tests for desired functionality before writing any code. The initial tests fail, and then the process of refactoring so that said tests pass begins. Once the tests pass, one can safely refactor and refine the code. I think TDD is a safer way of approaching a project and encourages the use of forward thinking within the development process. 

# What is a `spy` in `sinon`? How do we use it to effectively test a `callback`?

A spy in sinon is a function that acts as a stand in for other pieces of code. It enables one to pass information into the test run of a function, imitating the intended use case. 