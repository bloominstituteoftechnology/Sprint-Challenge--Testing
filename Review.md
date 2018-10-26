# Please answer the following questions

1.  In Jest, what are the differences between `describe()` and `it()` globals, and what are good uses for them?
describe() is a parent container that should hold it() functions and describe a group of it() functions. it() functions are used for the actual tests themselves and hold a string that describes the test it will perform.

2.  What is the point of `Test Driven Development`? What do you think about this approach?
It helps create a sort of 'guidelines' to follow when you're writing the code itself- and can help you catch bugs in the code quicker.

3.  What are `mocks`? What are a good use cases for them?
Mocks are stand in functions that wrap around functions that are passed to it and exposes various extra data. So a function that is used in a callback can be mocked and then tested on number of times called, the parameters passed to the function, and what the return values were.

4.  Mention three types of automated tests.
Unit, integration and regression