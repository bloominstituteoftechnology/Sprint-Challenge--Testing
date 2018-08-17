# Please answer the following questions

1. In Jest, what are the differences between `describe()` and `it()` globals, and what are good uses for them?

`describe()` is used to group together several related tests into a 'test suite'. It helps keep your test code well organized.`it()` or `test()` defines a testing block. Each test should be encapsulated in an `it()` function block.

2. What is the point of `Test Driven Development`? What do you think about this approach?

TDD is an approach to software development where the developer first writes the tests for a desired feature, and only after the test have been written, does the developer write the minimum amount of production code to pass the written test. The code is then refactored and retested to improve performance and readability. Personally, I'm not a fan of TDD, but that's probably because I'm the only one interacting with the code that I write. If I were part of a large. multi-user codebase, my opinion would likely change on TDD.

3. What are `mocks`? What are a good use case for them?

Mocks are fake objects or methods that simulate the behavior of real objects/methods. Mocks are created to help test another method or object that interacts with the mock.

4. Mention three types of tests.

Unit Test, Integration Test, UI-Tests