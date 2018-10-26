# Please answer the following questions

1.	In Jest, what are the differences between `describe()` and `it()` globals, and what are good uses for them?

*	`describe()` groups together several related tests into a test suite. You can also nest describes to further subdivide the suite into hierarchies. While a describe isn't strictly required, you can use it to better organize your code.

*	`it()` is an alias for `test()`. You use it to perform individual tests.

***

2.	What is the point of `Test Driven Development`? What do you think about this approach?

*	`TDD` is a development process where you write tests before writing code. You first write an initially failing automated test, then write functional code that makes the test pass(referred to as the `Red Green Refactor cycle`).

*	When implemented properly, `TDD` can help in regression testing and reduce the number of bugs in your code.

***

3.	What are `mocks`? What are a good use cases for them?

*	`mocks` are a technique used to replace something you do not control with something you can control. A mock function can capture calls and return specific values.

*	A basic way to mock is to use `jest.fn()` to reassign a function to a mock function such that anywhere in the code the original function is used, the mock function will be called isntead. Another way to mock is to use `jest.mock()` to set the exports of a module to a mock function.

***

4.	Mention three types of automated tests.

*	`Unit tests`
*	`Integration tests`
*	`Regression tests`
