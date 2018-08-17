# Please answer the following questions

1.  In Jest, what are the differences between `describe()` and `it()` globals, and what are good uses for them?
    Describe groups test into logical groups depending on approach to testing. It also allows to set up conditions that apply for all tests.
    It creates a specific test in which an expect or asset is made.

2.  What is the point of `Test Driven Development`? What do you think about this approach?
    TDD is to ensure that we are clear about what an application is expected to be able to do from the very beginning, and that we have a clear way of determining
    that we have achieved this. It also means that we can have our intentions for the program actually encoded, so that as the application is refactored and changse,
    we can know if it is still meeting its intentions, or if not, if this is due to error, or if we need to be clear about our intentions changing.

    I like TDD a lot as it forces a more deliberate and explicit approach to program design. It also means we can jump back into a project and make changes without
    having to worry we're breaking things unknowingly. It does seem to introduce more overhead, so we will want to make sure that the app merits it when we 
    choose to introduce it.

3.  What are `mocks`? What are a good use case for them?
    Mocks mean introducing our own data or functions to stand in for imports and external dependencies of an application we are testing. This lets us concentrate
    our testing on only the internals of whatever we are testing at the moment, and does not make us reliant on the availability and performance of other code
    that our application interacts with. Some examples would be database calls, or library calls.

4.  Mention three types of tests.
    * Unit testing: this means testing pure functions, and comparing expected output given specified input.
    * Integration testing: this means testing that application components interact together appropriately. This means zooming outu from unit testing, and looking
    more at whether we are achieving specific outcomes from our code.
    * Snapshot testing: This means making a record of the markup and possibly styles rendered by our code and checking to see whether this has changed. This is
      a highly sensitive approach. It is most useful when the appearance of a site has achieved stability, and is well served by having snapshots focus on
      specific portions of a page, rather than the entire display.