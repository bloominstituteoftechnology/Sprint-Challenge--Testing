# Please answer the following questions

1.  In Jest, what are the differences between `describe()` and `it()` globals, and what are good uses for them?
    describe breaks our test suites down into components, while it() is where we define the actual tests. Describes best use is for organizational purposes when you have multiple tests for one endpoint as one example.
2.  What is the point of `Test Driven Development`? What do you think about this approach?
    TDD helps drive well written code by testing it as you go along. I think this approach makes sense when you are working with a team who may or may not know best practices for writing code.
3.  What are `mocks`? What are a good use cases for them?
    Mocks are a way to simulate certain things to allow tests to work. Some objects rely on other objects to complete what they are doing, so we use 'mocking' to simulate the objects they rely upon to fully test that our object works.
4.  Mention three types of automated tests.
    Unit testing, UI testing, and API testing.
