<!-- Answers to the Short Answer Essay Questions go here -->

1. In Mocha, what are the differences between `before`, `after`, `beforeEach`, and `afterEach`? When do they run? What are they used for?
    * Each of these four methods are referred to as mocha "hooks". They allow you to write pieces of code which will run at specific times during the testing process.
    * `before` will run all its content code within a specific `describe` block before all other tests
    * `after` will run all its content code within a specific `describe` block after all other tests
    * `beforeEach` hooks are applied inside a `describe` block before each individual test.
    * `afterEach` hooks are applied inside a `describe` block after each individual test.

2. What is the point of Test Driven Development? What do you personally think about this approach?
    * TDD is just an approach to software development where instead of just jumping right into coding, the planning process begins by writing tests which must be passed in order for the code written to be considered viable.  I think this is a great approach, and that if you have the time and resources to commit to writing quality tests, then it makes a lot of sense.  I think it would work particularly well within a large organization, but perhaps not so well within smaller ones.

3. What is a `spy` in `sinon`? How do we use it to effectively test a `callback`?
    * 
