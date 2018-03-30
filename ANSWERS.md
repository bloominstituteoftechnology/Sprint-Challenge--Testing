<!-- Answers to the Short Answer Essay Questions go here -->

1. In Mocha, what are the differences between `before`, `after`, `beforeEach`, and `afterEach`? When do they run? What are they used for?

`before` is run once before all the tests in a `describe` and `after` is run once after all the tests in a `describe`.

`beforeEach` is run before each test in a `describe`, and `afterEach` after each test.

They are used for setting pre- (in the case of 'before' and `beforeEach`) or post- (`after` and `afterEach`) conditions for the tests.

2. What is the point of Test Driven Development? What do you personally think about this approach?

TDD means that developers should write tests before writing the actual code. TDD usually has 90-100% of code coverage. I think that TDD serves well for medium to large codebases due to it requiring siginificant amount of resources of the developing team. 

3. What is a `spy` in `sinon`? How do we use it to effectively test a `callback`?

A `spy` in `sinon` is a function that records arguments, return value, the value of this and exception thrown (if any) for all its calls. `spies` have the following features to test `callbacks` - `called`, `callCount`, `calledWith`, `threw`, `returned`, and more.