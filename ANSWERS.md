<!-- Answers to the Short Answer Essay Questions go here -->


1. In Jest, what are the differences between beforeAll, afterAll, beforeEach, and afterEach? When do they run? What are they used for?
beforeEach and afterEach are able to handle asynchronous, async, to complete functions with promises; which is for the purpose of running several tests for a database; these are executed for every test. beforeAll and afterAll is to setup only onece, at the beginning or the end, and it can also execute functions with promises; these are usually executed only once for all tests.
1. What is the point of Test Driven Development? What do you personally think about this approach?
In the industry, it's a way to test the functionality of various components to make sure they function as intended. When applied properly, it reduces development time as there is more time to go over the code and understand how it all works, and to ultimately develop new features that work as intended (without wasting too much time debugging many different parts of the application).

1. What is a mock function? How do we use it to test a callback passed to a function?
It's a testing method, which replace dependencies with the mock function. It allows for 'capture calls', 'set return values', and 'change the implementation'. The most common way is to set a variable mock to jest.fn() . 
1. Mention three types of tests.
Unit testing (individual functions), component testing (React components, shallow:isolated components), and complete testing (full render of all components).
1. What type of test performs database operations against a real server.
Unit testing. Tests are usually completed by testing the get post put and delete, which use promises.
