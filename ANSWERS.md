<!-- Answers to the Short Answer Essay Questions go here -->


1. In Jest, what are the differences between beforeAll, afterAll, beforeEach, and afterEach? When do they run? What are they used for?

- Before all runs BEFORE ALL the tests run, after all runs AFTER ALL the tests have run, beforeEach runs before each tets runs, equal to the amount of tests, after each runs after each tests runs, similar to before each. They can be used for clearing the database, or cleaning up, after the tests. They can also be used to connect and disconnect from the test db. 



1. What is the point of Test Driven Development? What do you personally think about this approach? 

- The point of TDD is to have everything as protected as possible from failing before you even start developing. It gets any big things out of the way that could cause major headaches down the road. 


1. What is a mock function? How do we use it to test a callback passed to a function?

- A mock function is used to test links between code by removing te actual implementation of the function, capturing calls to the function, and capturing instances of constructor functions. We use them, and inspect the mocks state to ensure callbacks are passed properly. 




1. Mention three types of tests.

-
server side tests,
client side tests, 
and unit tests 





1. What type of test performs database operations against a real server.

- This would be unit testing. 
