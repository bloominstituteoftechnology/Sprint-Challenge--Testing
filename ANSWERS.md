<!-- Answers to the Short Answer Essay Questions go here -->

1. In Mocha, what are the differences between `before`, `after`, `beforeEach`, and `afterEach`? When do they run? What are they used for?
  * `before` and `after` are calls that mocha makes before and after a given test suite. Similarly, `beforeEach` and `afterEach` run before and after each individual test. All four are generally used to initialize data and connections needed for a test, then to erase any traces of data leftover from the test. For example, one might add dummy data and establish a connection to a database using before/beforeEach, and then remove that dummy data and close that connection using after/afterEach.

2. What is the point of Test Driven Development? What do you personally think about this approach?
  * The main goal of TDD is to have an end product with very high test coverage. This way, most of an application's code is covered by tests automatically in a way that reduces bugs inside the tests themselves. I think utilizing TDD is useful with a large project that requires significant amounts of bug-free testing. This way, future changes that introduce app-breaking bugs will be easier to locate and fix. In small projects, TDD seems impractical.

3. What is a `spy` in `sinon`? How do we use it to effectively test a `callback`?
  * A sinon spy is a function used to gather information about function calls, such as the number of times it was called or the arguments it was given.

  An example of using a spy to test a callback would be:

```
  const callBack = sinon.spy();
  [1,2,3].forEach(callBack);
  expect(callBack).to.have.callCount(2);
```