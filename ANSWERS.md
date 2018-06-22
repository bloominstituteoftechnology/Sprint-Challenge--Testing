<!-- Answers to the Short Answer Essay Questions go here -->

1.  In Jest, what are the differences between beforeAll, afterAll, beforeEach, and afterEach? When do they run? What are they used for?

- beforeAll executes the function passed to it Before any suite or test get launched.
- afterAll executes the function passed to is after all suites and tests ends.
- beforeEach executes the function passed to it just **before** each test case.
- after all executes the function passed to it just **after** each test case ends.

1.  What is the point of Test Driven Development? What do you personally think about this approach?

- It helps define the API / APP state cases on which base the code to be written.
- I like to have a coverage on the code written. Even though it takes much more time to develop any APP/API is wise to expend more time at the inceptions phase building a solid coverage structure. That offers confidence and boost the development process in a future.

1.  What is a mock function? How do we use it to test a callback passed to a function?

- Is a way to abstract the functionality of a function in order to check/test whether or not this 'mock-function' behaves as expected in the context within it is defined.

1.  Mention three types of tests.

- Unit
- Integration
- Functional
- Performance
- Usability
  ...

1.  What type of test performs database operations against a real server.

- Functional
