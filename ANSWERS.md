<!-- Answers to the Short Answer Essay Questions go here -->
Start sprint

1. In Jest, what are the differences between beforeAll, afterAll, beforeEach, and afterEach? When do they run? What are they used for?

--They are all lifecycle hooks; they can be used to initiate connections, clean up connections after they are initiated, and work with database objects;
--beforeAll: executes code before any tests are run on a global level;
--afterAll: executes code after all tests have run on a global level;
--beforeEach: executes code before each individual test;
--afterEach: executes code after each individual test;

1. What is the point of Test Driven Development? What do you personally think about this approach?

--TDD is a good approach for smaller projects (in my opinion) because it is simpler to establish tests and write code for a smaller application. This tends to cut down on unnecessary code and helps to debug faster. Most of all, money is saved because less time is spent writing unnecessary tests or debugging.

1. What is a mock function? How do we use it to test a callback passed to a function?

--A mock function is kind of like a callback in the way that it can be placed within a test to run a function. This can be used to see if proper arguments are being passed in without actually having to write each part of that particular test suite.

1. Mention three types of tests.

--Snapshot tests, Component tests, Performance tests

1. What type of test performs database operations against a real server.

--Integration testing?
