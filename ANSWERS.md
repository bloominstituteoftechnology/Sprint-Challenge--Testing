<!-- Answers to the Short Answer Essay Questions go here -->

1. In Mocha, what are the differences between `before`, `after`, `beforeEach`, and `afterEach`? When do they run? What are they used for?

`before` runs before all tests in the current block, `after`runs after all tests in current block, `beforeEach` runs before tests in the current block, `afterEach` runs after each test in the current block.

2. What is the point of Test Driven Development? What do you personally think about this approach?

It is to give a project some structure, and make sure that certain 'milestones' are hit. I think this approach suits certain types of projects, and it can work well in certain teams since "reverse engineering" is also a valid strategy that could work depending on the project and team. 

3. What is a `spy` in `sinon`? How do we use it to effectively test a `callback`?

Anonymous functions and methods that already exist in the system under test. We can also use the fact that the function is only called once, or `this` value and arguments. 