<!-- Answers to the Short Answer Essay Questions go here -->

1. In Mocha, what are the differences between `before`, `after`, `beforeEach`, and `afterEach`? When do they run? What are they used for?

* `before` and `after` run before `describe` statements. `beforeEach` and `afterEach` run before `it` blocks.

* They are used to setup a Test Driven Development.

2. What is the point of Test Driven Development? What do you personally think about this approach?

* It makes developing and testing faster and better. You don't need to keep going to the browser to make manual checks by repeatedly refreshing your browser.

3. What is a `spy` in `sinon`? How do we use it to effectively test a `callback`?

* A spy is a function that records arguments, return value, the value of this and exceptions thrown (if any) for all its calls. We use it to check how many times a function was called and what arguments were passed to a function.s