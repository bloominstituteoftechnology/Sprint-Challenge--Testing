1. In Jest, what are the differences between `describe()` and `it()` globals, and what are 
good uses for them?

    describe() is used to group your tests in a logical fashion. Putting all tests for an
    endpoint in a describe() makes it easier to see the results of the tests. It also helps
    define a scope for the functions beforeEach, afterEach, beforeAll, afterAll. Describes
    can also be nested in other desribes which makes for even more logical arrangements.

    it() or test() are the tests themselves. They are the logical structures used to run
    each test and contain assertions (expects). They are used to test a particular bit of
    functionality and either pass or fail given the desired vs. actual result.

1. What is the point of `Test Driven Development`? What do you think about this approach?

    The point of TDD is to force you to become clear about what you want your individual
    units of software to do and to define it with tests before you ever write the code for
    the units. The idea being that it makes better code and builds in robustness from the
    start.

    I think TDD can be highly useful, although there are some drawbacks that come with it.
    It takes longer to write code this way and for some projects it may be more work than
    necessary. Still, in general, I think building up unit tests as early as possible is
    a good thing for large projects that will be publicly used. Having a sense of how well
    your code is working is highly beneficial.

1. Mention three types of automated tests.

    Unit, Component, & Snapshot