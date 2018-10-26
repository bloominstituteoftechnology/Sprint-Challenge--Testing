# Please answer the following questions

1.  In Jest, what are the differences between `describe()` and `it()` globals, and what are good uses for them?

    it() designates a single test, where describe() is a collection of tests grouped together for organization.

2.  What is the point of `Test Driven Development`? What do you think about this approach?

    TDD(Test Driven Development) involves first writing failing tests that describe the desired functionality, and
    using that to direct how code is written.

    I can definitely see the worth is such a type of development strategy, however I believe it probably requires a
    greater time investment, especially the less experienced the developer.

3.  What are `mocks`? What are a good use cases for them?

    Mocks are stand in functions that wrap around functions that are passed to it and exposes various extra data. So a
    function that is used in a callback can be mocked and then tested on number of times called, the parameters passed to
    the function, and what the return values were.

4.  Mention three types of automated tests.

    Unit tests - does the function execute properly on it's own
    Component - does one component of a front end framework work on it's own
    Integration - When units or components are combined, do they still work like they should?
