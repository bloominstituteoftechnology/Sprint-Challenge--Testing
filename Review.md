# Please answer the following questions

1.  In Jest, what are the differences between `describe()` and `it()` globals, and what are good uses for them?
A: Describe() is used group together several related tests into one suite.  It() is used to once per test and describes what the result of test should be.
2.  What is the point of `Test Driven Development`? What do you think about this approach?
A: The point of TDD is that it produces well designed code that correctly executes as desired.  It has its pros and cons.  It can be tricky to write since you start with the tests before the code is written.  It does reduce bugs quite a bit though.  
3.  What are `mocks`? What are a good use cases for them?
A: Mocks are way of simulating the behavior of a real method or object in a controlled environment.  They are helpful in unit testing, in that they allow us to test methods in isolation.
4.  Mention three types of automated tests.
Three types of automated tests are: unit testing, integration testing and snapshot testing.