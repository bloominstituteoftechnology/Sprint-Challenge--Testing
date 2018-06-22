<!-- Answers to the Short Answer Essay Questions go here -->


1. In Jest, what are the differences between beforeAll, afterAll, beforeEach, and afterEach? When do they run? What are they used for?

in 'beforeAll' runs a function before any tests are performed in its current file.  Waits for promise to be returned before tests are continued.  In 'AfterAll' runs a function after all the tests in the file are executed. in 'beforeEach' runs a function "before each" of the tests in the test file is run. in 'afterEach' runs a function 'after' each one of the tests in the file is completed.


1. What is the point of Test Driven Development? What do you personally think about this approach?  The main point of TDD is to help the developer to generate well designed code that can be testable and easy to refactor.  I like TDD.  Gets you to think about the other side of the coin (user).


1. What is a mock function? How do we use it to test a callback passed to a function? 
mocks are used to make modules or behaviors to test different parts of a processes.


1. Mention three types of tests.
Unit Tests- We test functions or classes individually with our input to match expected output.
Integration Tests- testing components,processes and their possible side effects.
UI Tests-  tests scenerios on app by controlling browser or website to ensure it behaves as expected. 


1. What type of test performs database operations against a real server.
Unit Tests.
