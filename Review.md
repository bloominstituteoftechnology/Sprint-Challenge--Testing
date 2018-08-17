# Please answer the following questions

1.  In Jest, what are the differences between `describe()` and `it()` globals, and what are good uses for them?

- `describe()` is used to break the test into test groups. We can have nested `describe()` to break down the test groups even further.

-  `it()` is used to perform <small>individual test</small>. Each test group can have multiple `it()`, but `it()` cannot contain other than the target test.

2.  What is the point of `Test Driven Development`? What do you think about this approach?

- The point of `Test Driven Development` is to generate well designed code. You will have longer tests and more code coverage. I think using `TDD` methods will make it easier to find bugs and also let other programs understand and read your code as your wrote it.

3.  What are `mocks`? What are a good use case for them?

- Mock creates a fake object that have the same functionality as the original object. We then can use this mocked object as a dependency to perform unit testing on other components that depend on it.

4.  Mention three types of tests.
- Unit testing.  
- Integration testing.  
- End to End testing.
- User acceptance testing.
