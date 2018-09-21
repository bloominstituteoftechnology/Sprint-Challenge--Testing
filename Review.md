# Please answer the following questions

1.  In Jest, what are the differences between `describe()` and `it()` globals, and what are good uses for them?
Answer: `describe()` is used to group tests together into a suite and is useful for good organization.  `it()` or `test()` is used to write an individual test. 
2.  What is the point of `Test Driven Development`? What do you think about this approach?
Answer: `Test Driven Development` is where you write the tests before you write the corresponding code, and this is useful because you're making sure in advance that all parts of your code are behaving exactly as you expect them.  I think it's really smart and useful in a lot of different cases, but could be impractical in certain cases as well.  This is especially true where full integration testing would better determine if functionality has been achieved, as opposed to the "false sense of security" of passing many individual unit tests.
3.  What are `mocks`? What are a good use cases for them?
Answer: `mocks` or "spies" allow you to test the behavior of functions being called by some of your code, and we can use `jest.fn()` to implement this when testing React components that issue events in response to user interaction.
4.  Mention three types of automated tests.
 Answer: Integration testing (testing the interaction of all parts of the code as a whole), unit testing (testing each individual part of the code), component testing (for UI libraries like React).
