# Questions

1.  In Jest, what are the differences between `describe()` and `it()` globals, and what are good uses for them?
2.  What is the point of `Test Driven Development`? What do you think about this approach?
3.  What are `mocks`? What are a good use cases for them?
4.  Mention three types of automated tests.

# Answers

1. `describe` is for grouping tests, while `it` is for housing them directly (although, it can still house multiple tests in the form of multiple `expect`s). `describe` is just for clarity, while `it` is required for tests.
2. The point of T.D.D. is to be proactive in error handling. From the start of the project, someone who is doing TDD already is considering edge cases and is forcing themselves to handle them (given that they write good and thorough tests).
3. A mock will test a specific instance or case of some code. Mocks are good for breaking down things into their smaller parts of functionality and testing those directly.
4. There's unit testing (testing small parts, the smaller the better typically), integration testing (testing how things work together), regression testing (testing to make sure that [typically] slight changes haven't affected other parts of a program negatively), etc.