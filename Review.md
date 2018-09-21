# Please answer the following questions

1.  In Jest, what are the differences between `describe()` and `it()` globals, and what are good uses for them?
'Describe' creates a block of tests in one test suite, 'it' is an alias for 'test', which is how you write a single test. 'Describe' is good for naming a section of tests about one function or route, 'it' describes what a test should do.
2.  What is the point of `Test Driven Development`? What do you think about this approach?
The point is to keep the development time down and decrease bugs and regressions. You start by writing the tests and then develop the code to pass those tests only. I think this is a smart way to develop code that you want to be pretty sure is bug-free or close to it.
3.  What are `mocks`? What are a good use cases for them?
'Mocks' are simulated objects that replace real objects in TDD. Some use cases are when simulating an entire big database, when testing for hard-to-reach states like network errors, and when the intended object isn't in existence yet.
4.  Mention three types of automated tests.
React/UI tests, unit tests, API tests, integration tests.
