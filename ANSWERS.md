<!-- Answers to the Short Answer Essay Questions go here -->

1. In Mocha, what are the differences between `before`, `after`, `beforeEach`, and `afterEach`? When do they run? What are they used for?

* before: Runs a particular function before an entire describe block.
* after: runs a particular function after an entire describe block
* beforeEach: runs a particular function before every single test in a describe block.
* afterEach: runs a particular function after every single test in a describe block.

2. What is the point of Test Driven Development? What do you personally think about this approach?

* Test driven development is an approach to writing code that values passing tests first, above all else. I think that in certain cases it may be useful, perhaps extremely large applications that are being added to constantly, but unnecessary for smaller projects.

3. What is a `spy` in `sinon`? How do we use it to effectively test a `callback`?

* A sinon spy is a function that is able to record lots of information on how it was called. It can effectively be used to test a callback function as it can tell you how many times that callback was called, how it was called, when it was called, and arguments that it was called with.