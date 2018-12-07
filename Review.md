# Please answer the following questions

1.  In Jest, what are the differences between `describe()` and `it()` globals, and what are good uses for them?
    -'describe' defines a block in which one or more tests will be created, and should be used to describe the actual object you will be testing on (an endpoint, a function, a component). 'it' denotes a unique test in that describe block which will run a test for a specific functionality for the thing you run tests for (the function returns an object, the component renders another component, etc)

2.  What is the point of `Test Driven Development`? What do you think about this approach?
    -TDD is all about writing tests before writing the actual code, which can be tedious, but it can help you develop what the actual code will be since it forces you to think about what needs to be tested in the first place. this allows you to build something with easily defined parameters and functionality. for absurdly simple one-purpose functions or components that have almost no functionality or body to them, it can be too time-consuming for the results you get to use TDD for EVERY function, but in large-scale applications or functions with many moving pieces, it is extremely valuable

3.  Mention three types of automated tests.

1) unit tests
2) component tests (as in React of Vue components)
3) snapshot testing with jest
