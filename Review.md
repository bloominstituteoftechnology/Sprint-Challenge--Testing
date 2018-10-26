# Please answer the following questions

1.  In Jest, what are the differences between `describe()` and `it()` globals, and what are good uses for them?
    The 'describe()' global is used to group together a set of test cases that get executed as part of a test suite. The 'it()' global is used to define a single unit test that should be independent of all others.

2.  What is the point of `Test Driven Development`? What do you think about this approach?
    Test Driven Development provides developers a methodology for defining how a piece of software should work before writing the code. I think it is useful to follow this approach to ensure that all edge cases are covered when building software. However, when building something that is not very defined at the beginning it can add too much overhead to getting started.

3.  What are `mocks`? What are a good use cases for them?
    Mocks are a technique to isolate tests by replacing what we do not control. Mock functions make it easy to test the links between code by erasing the actual implementation of a function. Mocks are used to 'spy' and test how a function would work.

4.  Mention three types of automated tests.
    Unit tests, React (GUI) tests, Web API tests.
