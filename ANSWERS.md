<!-- Answers to the Short Answer Essay Questions go here -->

1. In Mocha, what are the differences between `before`, `after`, `beforeEach`, and `afterEach`? When do they run? What are they used for?

In Mocha the differences between before and after are:

before initiates a DB connection(run before all tests). beforeEach is run before each test.
after ends the DB connection(run after all tests). afterEach is run after each test. 

2. What is the point of Test Driven Development? What do you personally think about this approach?
TDD is a method of software developement where tests are wrote before code. Afterwards the engineer writes code constrained to pass these tests. This helps keep a projects scope within a certain set of boundaries. Although it can be tedious to write tests before code it has the advantage of verifying that the code you are writing is definitely passing the tests you have laid out for it versus attempting to conform code to pass tests after the fact. In addition it can be useful for preventing code bloat by making the problem you're programming clear cut. I believe TDD has it's place in certain projects but it can be a bottleneck for projects on the smaller end that do not need extensive verification and can afford to 'write fast, break things, and continue'. 

3. What is a `spy` in `sinon`? How do we use it to effectively test a `callback`?
A spy in sinon is effectively a function that you attach to keep a record of the return value, arguement and any errors that happen while the method it was attached to was called. 

