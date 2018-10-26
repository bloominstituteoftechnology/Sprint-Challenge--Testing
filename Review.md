# Please answer the following questions

1.  In Jest, what are the differences between `describe()` and `it()` globals, and what are good uses for them?
    `describe()` divides your test suite into groups that you can label and nest to keep tests organized by features, modules, or functions. `it()` is used to perform individual tests.

2.  What is the point of `Test Driven Development`? What do you think about this approach?
    TDD makes you plan out your design requirements before you write the functional code to satisfy those requirements. It lets you take small steps adding code and verifying it, making it easier to catch and fix bugs as you go. I think it can be cumbersome but ultimately helpful in the way it helps you plan out exactly what you need your code to do and keeps hard to find bugs to a minimum.

3.  What are `mocks`? What are a good use cases for them?
    `mocks` are simulated objects that mimic the behavior of real objects in controlled ways. They help you test specific cases in your units tests that might be otherwise impractical or difficult to incorporate.

4.  Mention three types of automated tests.
    unit tests
    integration tests
    snapshot testing
