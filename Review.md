# Please answer the following questions

1.  In Jest, what are the differences between `describe()` and `it()` globals, and what are good uses for them? Describe() is used to label an overall "umbrella" of tests or subdivide a suite of tests, and it() is used to label & execute the individual tests.

2.  What is the point of `Test Driven Development`? What do you think about this approach? Test driven development is the method by where tests are written first, detailing what a certain piece of code should be doing, and then the appropriate code is attempted to be written fulfilling those tests. I think it can help a person zero in on certain edge/corner cases & potentially also help where multiple pieces of code are being designed by different individuals to function together & cohesively. It also helps for maintaining a large code base in future modifications.

3.  What are `mocks`? What are a good use cases for them?
"Mocks" are pieces of "mocked up data" that allow for testing specific behavior of written code. A good use case would be to test what data may present problems for certain assumptions being taken or implemented in given code & planning what desired behavior would be for encountering whatever corner/edge cases.

4.  Mention three types of automated tests.
    - Unit Testing
    - Component Testing
    - Integration Testing
