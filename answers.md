## Self-Study/Essay Questions

Demonstrate your understanding of this week's concepts by answering the following free-form questions. Edit this document to include your answers after each question. Make sure to leave a blank line above and below your answer so it is clear and easy to read by your project manager.

1. In Jest, what are the differences between `describe()` and `it()` globals, and what are good uses for them?

     Describe allows us to group our tests under by what method we’re testing we name it with a string that describes what this grouping of tests is focused on. `it` is the same as `test` and is the function that will actually run our test.

2. What is the point of `Test Driven Development`? What do you think about this approach?

    Test Driven Development means you write tests before you write code. It helps you write better code by forcing to think of all the edge cases and then write code that accounts for them and it acts as a safety net when making changes or refactoring.

3. Mention three types of automated tests.

    Unit tests, Integration tests and component testing.
    Unit tests are fast and used to test correctnes and are written by the developer and useful when using TDD/BDD.
    Integration testing is where individual units are combined and tested as a group this helps to expose faults an interactions of integrated units. Component testing tests componenents like react it verifies changes to component output resulting from changes to state but does not verify interaction between components.