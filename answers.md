## Questions - Self Study - You can exercise your Google-Fu for this and any other _Sprint Challenge_ in the future.

1. In Mocha, what are the differences between `before` `after` `beforeEach` `afterEach`? When do they run? What are they used for?
    * `before` runs before all of the tests and can be used to create a database.
    * `after` runs after all of the tests and can be used to drop a database.
    * `beforeEach` runs before each test and can be used to seed data for the tests.
    * `afterEach` runs after each test and can be used to remove the seeded data that may have been manipulated by the test.  
1. What is the point of Test Driven Development? What do you personally think about this approach?
   * It is a method of writing the tests before functional code. I believe test driven development can bring a lot of focus to a project's small details, so I like it.
1. What is a `spy` in `sinon`? How do we use it to effectively test a `callback`?
    * `spy` is a function that can be used to test how a function handles a callback. We can use it to test how many times a `callback` is called.