<!-- Answers to the Short Answer Essay Questions go here -->


1. In Jest, what are the differences between beforeAll, afterAll, beforeEach, and afterEach? When do they run? What are they used for?

* beforeAll and afterAll run either before or after all of the tests are run.  beforeEach and afterEach run after each individual test is run.  They streamline testing env set up so that we do not need to write the same code over again

2. What is the point of Test Driven Development? What do you personally think about this approach?

* Test driven dev presupposes we have all of our requirements (functional and technical) laid out in advance.  It assumes we know how the app is supposed to work and what tests are needed in advance.  I like the approach, and will like it more when I have better comfort with testing syntax.

3. What is a mock function? How do we use it to test a callback passed to a function?

* A mock function allows us to test a function without actually needing to call the function that we want to test. We would use it to test a cb by passing it in and validating that it gets called and that it returns the expected value/

4. Mention three types of tests.

* Unit testing, integration testing, user acceptance testing

5. What type of test performs database operations against a real server.

* Integration testin
