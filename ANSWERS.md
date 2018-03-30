<!-- Answers to the Short Answer Essay Questions go here -->

1. In Mocha, what are the differences between `before`, `after`, `beforeEach`, and `afterEach`? When do they run? What are they used for?

`before` -- runs before all tests in the block
`after` -- runs after all tests in the block
`beforeEach` -- runs before each test in the block
`afterEach` -- runs after each test in the block

2. What is the point of Test Driven Development? What do you personally think about this approach?

When working in a career environment, you have to keep in mind that everyone works with a style guide, source code, and have to complete projects which eventually have to work together to make a bigger project. This approach is also the outline of each piece of code you want to test. If you were to just use `console.log()`, which still works, the error would look alot more cryptic than if you just used test code. 

3. What is a `spy` in `sinon`? How do we use it to effectively test a `callback`?

A test spy is a function that records arguments, return value, the value of `this` and it records the number of calls a function makes, expecially when it has a callback. It's very helpful to a callback value when it counts the number of calls the function makes.