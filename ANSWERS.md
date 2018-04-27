<!-- Answers to the Short Answer Essay Questions go here -->

## Self Study Q&A

1.  In Mocha, what are the differences between `before`, `after`, `beforeEach`, and `afterEach`? When do they run? What are they used for?

* Mocha's lifecycle hooks open and close a test connection to the database, and can also accomodate API mocking in tests. The `before` and `after` hooks run once before and after _all_ tests in the `describe` blocks. The `beforeEach` and `afterEach` hooks run before and after each test in the `describe` blocks.

2.  What is the point of Test Driven Development? What do you personally think about this approach?

* Test Driven Development allows one to clearly map out what is to be expected of his/her production code. With TDD, test cases that pass only if certain conditions in the production code are met are written prior to the writing of production code. This in turn allows the dev to code along in confidence, with test cases checking exactly what he/she has _planned_ the tests to check for.
  Though it may be cumbersome, especially for those who are still learning about testing while simultaneously implementing it into a project, I'm glad Lambda has had us practice this early on in our developing experience. Good habits should be taught early.

3.  What is a `spy` in `sinon`? How do we use it to effectively test a `callback`?

* A test spy is a function that records information such as arguments, values it returns, and how many times it was called.
