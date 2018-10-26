# Please answer the following questions

1.  In Jest, what are the differences between `describe()` and `it()` globals, and what are good uses for them?
    The it() global denotes a particular test of a particular unit; many it() globals can be nested inside of a describe() global indicating they are all testing the same unit. This helps to organize your tests and make your terminal more readable.

2.  What is the point of `Test Driven Development`? What do you think about this approach?
    The point of Test Driven Development is to build sound code step by step through testing each individual piece before you build it; that way you can anticipate what the code needs and where any bugs may be likely to occur.

3.  What are `mocks`? What are a good use cases for them?
    In unit testing, the unit you are working on may have dependencies on other units that you don't want to test at the moment, so mocks are simulated methods or objects that you make for the unit you are testing to see how it would behave in response to the real methods or objects.

4.  Mention three types of automated tests.
    Unit Tests, Integration Tests, Component Tests
