# Please answer the following questions

1.  In Jest, what are the differences between `describe()` and `it()` globals, and what are good uses for them?
`describe()` is used to split up test suites to test specific modules, components, etc. `it()` is used to implement individual tests within a `describe()`.

2.  What is the point of `Test Driven Development`? What do you think about this approach?
Test driven development is when you begin the development process by writing tests and write only what code you need to pass the tests. I think it's a good approach because it increases the coverage of tests for your code, thereby reducing bug count.

3.  What are `mocks`? What are a good use cases for them?
`mocks` are used to simulate the behavior of a component, function, etc. It basically allows multiple instances of something to be tested in unison without actually spinning up the app.

4.  Mention three types of automated tests.
Unit tests, snapshot tests, integration tests.