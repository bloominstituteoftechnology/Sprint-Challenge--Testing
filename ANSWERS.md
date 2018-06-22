<!-- Answers to the Short Answer Essay Questions go here -->


1. In Jest, what are the differences between beforeAll, afterAll, beforeEach, and afterEach? When do they run? What are they used for?
beforeall: runs once before all of the tests in a suite. afterAll: runs once after all the tests in a suite are executd. beforeEach: runs each time before each individual test is executed. AfterEach: runs each time after each test is executed. The can be used for many purposes to facilitate tesitng; we have used them mainly for crecreating mock data on which to run our test, as well as connecting to the db, and then destroying that mock data after the test is run and disconnecting from the db.
1. What is the point of Test Driven Development? What do you personally think about this approach?
The point of TDD is to have development driven by testing, by which the developers will only build the parts of the app which are determined by testing to be needed. I have no opinion on this appproach. Why would I have an opinion after 1 week of learning testing?
1. What is a mock function? How do we use it to test a callback passed to a function?
A mock function is a function that mimics the actions of part of an app in order to test the ramifications of said actions; i.e to test thier effect on state in a React app. We can use it to test a callback passed to a function by mimicing calling that function and observing what effects the function has.
1. Mention three types of tests.
server testing, client testing, integration testing
1. What type of test performs database operations against a real server.
server testing