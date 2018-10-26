# Please answer the following questions

1.  In Jest, what are the differences between `describe()` and `it()` globals, and what are good uses for them?

    Describe breaks the test suite into components. Different parts of the application or different parts of the functionality should be broken up into describe statements. It is used to perform individual tests.

2.  What is the point of `Test Driven Development`? What do you think about this approach?

    TDD is used to write tests before an application is built to avoid not catching bugs and code regressions. I think that it is very important to use TDD in production and more organized code comes from it. 

3.  What are `mocks`? What are a good use cases for them?

    Mocks are fake functions that are used in testing. They allow you test parameters and call the function within the tests.

4.  Mention three types of automated tests.

    - Unit testing: testing each part of the application individually before combining parts
    - Integration testing: where the units are combined and tested together to expose faults in the interaction between     units
    - Snapshot testing: compares current UI to previous UI rendered and looks for changes
