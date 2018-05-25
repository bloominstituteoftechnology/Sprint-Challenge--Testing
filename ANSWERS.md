<!-- Answers to the Short Answer Essay Questions go here -->

1.  In Jest, what are the differences between beforeAll, afterAll, beforeEach, and afterEach? When do they run? What are they used for?

* The beforeAll function executes once and only once for the describe block containing it, before any of the beforeEach functions or any of the specs.

* The beforeEach function executes before any spec in the describe block containing it, as well as before any spec contained inside any inner describe. You'll see this in A More Complex Example below.

* beforeAll has a complementary function in afterAll that is run once per describe after all specs contained therein are finished.

* Likewise, the beforeEach function has a complementary afterEach function that is run after each spec.

* afterAll and afterEach are used for whatever cleanup is needed at the conclusion of the specs, and are not covered as part of this document.

2.  What is the point of Test Driven Development? What do you personally think about this approach?

* the goal of TDD is to write clean code that works.

3.  What is a mock function? How do we use it to test a callback passed to a function?

* Mock functions make it easy to test the links between code by erasing the actual implementation of a function, capturing calls to the function (and the parameters passed in those calls), capturing instances of constructor functions when instantiated with new, and allowing test-time configuration of return values.

4.  Mention three types of tests.

* Unit tests
  Unit tests are very low level, close to the source of your application. They consist in testing individual methods and functions of the classes, components or modules used by your software. Unit tests are in general quite cheap to automate and can be run very quickly by a continuous integration server.

* Integration tests
  Integration tests verify that different modules or services used by your application work well together. For example, it can be testing the interaction with the database or making sure that microservices work together as expected. These types of tests are more expensive to run as they require multiple parts of the application to be up and running.

* Functional tests
  Functional tests focus on the business requirements of an application. They only verify the output of an action and do not check the intermediate states of the system when performing that action.

* There is sometimes a confusion between integration tests and functional tests as they both require multiple components to interact with each other. The difference is that an integration test may simply verify that you can query the database while a functional test would expect to get a specific value from the database as defined by the product requirements.

5.  What type of test performs database operations against a real server.
