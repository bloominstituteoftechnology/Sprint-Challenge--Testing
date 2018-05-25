<!-- Answers to the Short Answer Essay Questions go here -->

1.  In Jest, what are the differences between beforeAll, afterAll, beforeEach, and afterEach? When do they run? What are they used for?

* The beforeAll function executes once and only once for the describe block containing it, before any of the beforeEach functions or any of the specs.

* The beforeEach function executes before any spec in the describe block containing it, as well as before any spec contained inside any inner describe. You'll see this in A More Complex Example below.

* beforeAll has a complementary function in afterAll that is run once per describe after all specs contained therein are finished.

* Likewise, the beforeEach function has a complementary afterEach function that is run after each spec.

* afterAll and afterEach are used for whatever cleanup is needed at the conclusion of the specs, and are not covered as part of this document.

2.  What is the point of Test Driven Development? What do you personally think about this approach?
3.  What is a mock function? How do we use it to test a callback passed to a function?
4.  Mention three types of tests.
5.  What type of test performs database operations against a real server.
