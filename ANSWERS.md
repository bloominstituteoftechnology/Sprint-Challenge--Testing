<!-- Answers to the Short Answer Essay Questions go here -->

1.  In Mocha, what are the differences between `before`, `after`, `beforeEach`, and `afterEach`? When do they run? What are they used for?

`before` is run once before all the tests in a `describe` and `after` is run once after all the tests in a `describe`, whereas `beforeEach` is run before each test in a describe, and `afterEach` after each test.

2.  What is the point of Test Driven Development? What do you personally think about this approach?
    It's a good way of making sure things are working properly and continue to as a project scales. It may seem tedious but can save much time in the long run.

3.  What is a `spy` in `sinon`? How do we use it to effectively test a `callback`?
    A spy is a function that records all the activity and traits of itself when used in place of data
