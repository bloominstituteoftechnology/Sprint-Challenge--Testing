<!-- Answers to the Short Answer Essay Questions go here -->


1. In Jest, what are the differences between beforeAll, afterAll, beforeEach, and afterEach? When do they run? What are they used for?

#The differences, ironically, are what they are called, beforeAll test run this, afterAll tests, run this. beforeEach test do this, afterEach test do this. This is to help setup and teardown functionality to gelp run tests easier.

1. What is the point of Test Driven Development? What do you personally think about this approach?

#TDD helps you create the necesarry code to run/ pass the test. For example if you want to specifically test if a function works, right the test for the functions funcionality beforehand so that it fails. Then write just enough code to pass the test you have written. This helps ensures that the code won't break other code already exisisting, helps speed up development, and ensures a good ratio of test coverage to code.

#This approach feels slow to me, but it did gurantee that my code works, and since it works I can move on quicker and not fight over code.

1. What is a mock function? How do we use it to test a callback passed to a function?

#First we pass the mock function into our CB, then we create an instance of whatever field we are testing. Then we create a mock function by doing ```jestfn() => {}``` or anything similar for the function we are mocking. Then we can individually test that function without actually calling it.

1. Mention three types of tests.

#UnitTest, React testing, integration testing.

1. What type of test performs database operations against a real server.

#Unit testing does each unit/ module seperately so it can't be that. I think it is integration testing, since it tests all units integrated into one, then runs test based off of all the components working together.
