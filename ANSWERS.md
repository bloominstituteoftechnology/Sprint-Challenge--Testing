# Answers

**1.** In Mocha, the differences between `before`, `after`, `beforeEach` and `afterEach` are that even though they are all hooks, they run in the order that they are defined. 

`before` is run before any test case, `after` is run after all of the test cases are complete, `beforeEach` is run before each test case, `afterEach` is run after each case is completed. 

These hooks are used for things such as populating a database with dummy conent before each test and then clearing that database for each test.

**2.** The point of Test Driven Development is an approach to programming where developers are encouraged to write tests of their code before actuallly writing the code itself. By writing tests first, developers are able to have a roadmap of what an ideal version of the project is supposed to accomplish.

Personally, I definitely understand and can see the benefits of knowing exactly what we want our code to accomplish beforehand. That being said, I do find the actual writing of these tests fairly tedious, but since many companies do use TDD, I am glad to learn it.

**3.** The `spy` in `sinon` is a function that records arguments, returns values, the value of `this` and exceptions thrown. We can effectively test a `callback` with it because when we pass it in as a `callback`, it can keep track of things such as how many times it is called. Then we can inspect the usage using built in methods such as `calledOnce`. This allows us to know that everything is functioning as expected.

