# Please answer the following questions

1.  In Jest, what are the differences between `describe()` and `it()` globals, and what are good uses for them? <br>
    `describe()` establishes a test suite and tells us what the suite is for. `it()` actually runs a test with a detailed description of what is being tested. `it()`s are generally nested within a `describe()` <br> <br>
2.  What is the point of `Test Driven Development`? What do you think about this approach? <br>
    This is to establish what the code needs to do first and write test for it, so that as development continues we can actively test the code. I think this approach makes sense. <br> <br>
3.  What are `mocks`? What are a good use case for them? <br>
    `mocks` simulate something like an api request or a function call. In React component testing, we need to be able to check that a component is making a function call and `mocks` wills do that ofr us. In server testing, we can use `mocks` to fake an api request so that we are using up free request to a public api or something like that. <br> <br>
4.  Mention three types of tests. <br>
    Unit testing, Component testing, Snapshot testing
