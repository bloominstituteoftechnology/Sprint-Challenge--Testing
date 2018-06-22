<!-- Answers to the Short Answer Essay Questions go here -->


1. In Jest, what are the differences between beforeAll, afterAll, beforeEach, and afterEach? When do they run? What are they used for?
    beforeAll runs before a test suite
        This can be used to start a connection to a database, for example
    afterAll runs after a test suite
        This can be used to then disconnect from the database.
    beforeEach runs before every test
        This can be used to populate data you'd like to manipulate or to otherwise help set up the environment
    afterEach runs after every test
        This can be used to remove data so that each test begins in the same environment
1. What is the point of Test Driven Development? What do you personally think about this approach?
    Test Driven Development helps to ensure that the code you're writing does what you want it to do because you write the tests first and then write the code.  It's kind of like hypothesis testing.  It's exactly like hypothesis testing.  I personally think this approach is great, though I would probably not want to implement it the way that I attempted to do so yesterday (write literally all of the tests before trying to write any code).  I think it's great for going piece by piece, but not for writing all of the tests and then writing all of the code after writing all of the tests - it's good to have immediate feedback if a test you've written even functions the way that you think it will before having to write all of them.
1. What is a mock function? How do we use it to test a callback passed to a function?
    A mock function is a function that pretends to use outside sources but really doesn't.  It can be used to test a callback passed to a function by mimicking the behavior of the function being tested without pulling in the additional libraries/resources that would be necessary to run the test.
1. Mention three types of tests.
    Integration, unit, snapshot.
1. What type of test performs database operations against a real server.
    Integration testing.
