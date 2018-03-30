<!-- Answers to the Short Answer Essay Questions go here -->

1.  In Mocha, what are the differences between `before`, `after`, `beforeEach`, and `afterEach`? When do they run? What are they used for?

    * `before` runs before all the tests in the block and only run , it is generally used to set us the database connection
    * `after` runs after all the tests in the block and only run once, it is generally used to close the database connection and remove the data
    * `beforeEach` runs before each test in the block and is dependent on the amount of tests, it is generally used to create test data
    * `afterEach` runs after each test in the block and is dependent on the amount of tests, it is generally used to remove any possible modified test data from the prior test

2.  What is the point of Test Driven Development? What do you personally think about this approach?

    * The point of a TDD is to make the tests first before the actual application code. The purpose is to have a clear indication of where you want to go with your application and essentially be bug free. I personally have not made a firm opionion on this idea yet. I am an indecisive person so probably making a test framework first would be a good idea to keep myself on track with what I wanted to do in the first place, but then again I would probably have a hard time making decisions on what I wanted to do exactly because I like to play around. So for me as a developer, I would probably say no I don't care for it. But if I were a developer coming into a business and I had tests that I had to pass while developing, I would probably like it because I would have specific goals that are required to meet.

3.  What is a `spy` in `sinon`? How do we use it to effectively test a `callback`?
    * A spy is a function that monitors arguments, returns values, and the `this` value. Spies can be passed to a funcion that handle a callback to test them.
