## Sprint Challenge Questions - Answers by Troy Bradley (CS6) ##

#### In Mocha, what are the differences between `before` `after` `beforeEach` `afterEach`? When do they run? What are they used for?
  - `before` runs as soon as the `npm test` command is processed, before any testing. It sets up the database connection so the API can persist data during testing. 
  - `after` runs after all tests have run. It tears down the database connection and deletes all test data. 
  - `beforeEach` runs before each test and seeds the database with test data so that all tests have the same data to work with.
  - `afterEach` runs after each test and deletes the data so that if it was modified by the previous test, the next test will have "clean" seed data to work with. Otherwise, one test may cause a subsequent test to improperly fail due to modified data. We want tests to fail if they don't function properly, not because a previous test modified data.

#### What is the point of Test Driven Development? What do you personally think about this approach?

  - `Test Driven Development` is an approach to software development that requires the developer (or team of developers) to design tests for each function as they are coding it. This ensures that code performs as intended and should result in fewer bugs in the resulting codebase.
  - I personally feel that while this approach adds a certain amount of tedium to the development process, it is a good approach for any project that is intended to "ship" to the public or any paying customers. I am glad to hear that testing is a specialty and that in large companies, each team has access to testing specialists who will assist with this part of the dev process. 

#### What is a `spy` in `sinon`? How do we use it to effectively test a `callback`?

  - A `spy` in `sinon` is "a function that records arguments, return value, the value of `this` and exception thrown (if any) for all its calls." (Source: sinon docs) What this means is that a `spy` is very well named. It can report back to a test anything the programmer needs to know to debug a function in a codebase. It can tell if the function is receiving the correct input, what `this` refers to inside the function, and any exceptions or errors that may be interfering with the function.
  - A `callback` is passed to another function as an argument. The `spy` reports if the callback is properly being passed to the function. 