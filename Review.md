# Please answer the following questions

1.  In Jest, what are the differences between `describe()` and `it()` globals, and what are good uses for them?
    Describe() is used to create a block of tests that belong to one test category. A method for organizing tests.

    it() is the method in which you use for each individual test.

2.  What is the point of `Test Driven Development`? What do you think about this approach?
    The point of TDD is so that you test for the purposes and outcomes that you want to achieve with the code written. The tests then are designed to achieve those outcomes and so the code you write must pass the tests to have them perform what was expected.

    I personally am not a huge fan of the approach. I believe that this can all be done simply by writing good, solid, and organized code in the first place.

3.  What are `mocks`? What are a good use case for them?
    They are simulated objects that allow you to test a certain application. This application is dependant on information or data from other applications or networks but your job is to test the one so you simulate data or input so that testing can be done.

    The fake APIs we built for server testing is a good example. We sent codes instead of actual data so that we can test to see what is passed through and what isn't.

4.  Mention three types of tests.
    -Unit Testing
    -Integration Testing
    -End to End Testing
