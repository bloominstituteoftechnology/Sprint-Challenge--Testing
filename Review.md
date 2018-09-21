# Please answer the following questions

1.  In Jest, what are the differences between `describe()` and `it()` globals, and what are good uses for them?

- `describe` allows several tests to be grouped under one test suite for the purposes of organization and visualization.
- `it` is an alias for `test` global in `jest` library. It is used to run unit tests.
- It is common to have several `it`s under one `describe` group.

2.  What is the point of `Test Driven Development`? What do you think about this approach?

Test Drive Development allows developers to define the requirements of an application in a solid manner. Writing tests before adding code gives direction to the developer as to what comes next.

3.  What are `mocks`? What are a good use cases for them?

`mock` functions are a way to keep track of whether a function has been called, if so how many times has it been called or with what arguments has it been called during a test. Mock functions are great candidates for checking button presses.

4.  Mention three types of automated tests.

- Unit testing
- Integration testing
- Snapshot testing
