In Mocha, what are the differences between before after beforeEach afterEach? When do they run? What are they used for?

Hooks are used to run data before and after that help with setting up preconditions before a test and cleaning up after. Before/after are run before and after all tests in a blocks while beforeEach/afterEach are run before and after each individual test. 


What is the point of Test Driven Development? What do you personally think about this approach?

The point is to create well designed code and to catch erors during the creation process. It can be tedious to write but is useful in keeping code clean and maintaining focus on what a code block should be doing. 


What is a spy in sinon? How do we use it to effectively test a callback?

Sinon is a library that helps with unit testing code which includes spy functions. A spy is a function that gives information about function calls such as how many times a function was called. 