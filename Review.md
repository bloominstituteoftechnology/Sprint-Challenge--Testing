# Please answer the following questions

1.  In Jest, what are the differences between `describe()` and `it()` globals, and what are good uses for them?
describe() splits the test suite into components, and it() can run a specific test within that component. So a GEt request will have a describe(), and can have multiple it() tests within it.

2.  What is the point of `Test Driven Development`? What do you think about this approach?
Test driven developments has programmers write tests first and then the code that lets it pass later. You write a failing test, then create code that lets it pass. I like this approach because it ensures that my code is doing the right thing. I don't spend time adding unnecessary features. Whatever features a client requests are coded into the tests.

3.  What are `mocks`? What are a good use cases for them?
mocks simulate objects, for example you can test endpoints for a mock database even if a real dataase doesn't exist.

4.  Mention three types of automated tests.
unit tests, integrated tests, & snapshot tests
