# Please answer the following questions

1.  In Jest, what are the differences between `describe()` and `it()` globals, and what are good uses for them?
  A: `describe()` is used for breaking the test suite into components (whether those components are functions, modules, or user-facing pieces of functionality).
    `it()` is used for individual tests. They should be as granular as they can be— if it could be split into different tests, it would probably be a time to use `describe()` instead.
   
2.  What is the point of `Test Driven Development`? What do you think about this approach?
  A: The point of Test Driven Development is to base your development around the tests, writing them at the same time as running them. This allows for having higher test-coverage (a higher percentage of your code that is tested automatically).

3.  What are `mocks`? What are a good use case for them?
  A: `mocks` are mock functions that test the links between code in these ways:
    • erasing the actual implementation of the function
    • capturing calls to the function (and the parameters passed in those calls)
    • capturing instances of constructor functions when instantiated with `new`
    • allowing test-time configuration of return values

    A good use case for mock functions is asserting how the functions get called, instantiated, or what was returned.

4.  Mention three types of tests.
  A: Unit testing, snapshot testing, and component testing.