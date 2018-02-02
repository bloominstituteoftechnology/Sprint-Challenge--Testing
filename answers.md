# Answers

1. In Mocha, what are the differences between `before` `after` `beforeEach` `afterEach`? When do they run? What are they used for?

* `before` is run once before all test in a `suite`.
* `after` is run once after all test in a s `suite`.
* `beforeEach` is run before each test in a `suite`.
* `afterEach` is running after each test in a `suite`.

`before` is used to connec to the database and `after` is to disconnect to the database. `beforeEach` is used to set up test data in the test database and `afterEach` is used to delete the test data in the test database.

2. What is the point of Test Driven Development? What do you personally think about this approach?

The point of `TDD` is to generate well designed code. You will have longer tests and more code coverage. I think using `TDD` methods will make it easier to find bugs and also let other programs understand and read your code as your wrote it.

3. What is a `spy` in `sinon`? How do we use it to effectively test a `callback`?

The primary use for spies is to gather information about function calls. You can also use them to help verify things, such as whether a function was called or not. When you are finished using the `spy` make sure you turn it back to it's original function.

