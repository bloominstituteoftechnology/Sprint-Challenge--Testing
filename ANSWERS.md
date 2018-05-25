<!-- Answers to the Short Answer Essay Questions go here -->


1. In Jest, what are the differences between beforeAll, afterAll, beforeEach, and afterEach? When do they run? What are they used for? 
* ANSWER: These are called helper functions and some setup work needs to take place before you can run your tests and afterwards. If you have work needed to be done repeatedly for a lot of tests, `beforeEach` and `afterEach` can be used. These handle asynchronous code by taking a done param or returning a promise.
One time setups at the beginning of your code can be implemented such as `beforeALL` and `afterALL`. These both by default block apply to every test within your file.

2. What is the point of Test Driven Development? What do you personally think about this approach?
* ANSWER: TDD is a software process relying on repetition of short dev cycles. This is used to increase the odds of developing well designed code (typically bug free!). Basically it means you should first write test suites that your code will run against.

3. What is a mock function? How do we use it to test a callback passed to a function?
* ANSWER: Mock Functions test links between code. They do this by erasing the actual implementation of your function. This then captures calls to it, which also capture instances of your constructor functions when instantiated with `new` thus allowing your test time configuration of return values. 

4. Mention three types of tests.
* ANSWER: Component testing, Server testing & Unit testing

5. What type of test performs database operations against a real server.
* ANSWER: Server Testing