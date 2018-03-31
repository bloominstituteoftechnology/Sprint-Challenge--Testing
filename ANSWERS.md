<!-- Answers to the Short Answer Essay Questions go here -->

### 1. In Mocha, what are the differences between `before`, `after`, `beforeEach`, and `afterEach`? When do they run? What are they used for?
`Before` and `after` hook runs before and after all the tests from `describe` are ran. `Beforeeach` and `aftereach` is ran for `each` test in a `describe`.

### 2. What is the point of Test Driven Development? What do you personally think about this approach?
The main point of TDD is to write tests for codes that fail. I like this approach because it ensures to write a program that prevents any bugs by overseeing all possible errors in a program.

### 3. What is a `spy` in `sinon`? How do we use it to effectively test a `callback`?
A `spy` wraps around a method, records arguments and return values.
