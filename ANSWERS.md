<!-- Answers to the Short Answer Essay Questions go here -->

1. In Mocha, what are the differences between `before`, `after`, `beforeEach`, and `afterEach`? When do they run? What are they used for?
  In Mocha there are 4 lifecycle hooks available:
  * `before` is run at the beginning of the test suite before any it blocks
  * `after` is run at the end of the test suite after all describe blocks
  * `beforeEach`is run at the beginning of each it block
  * `afterEach` is run at the end of each it block

2. What is the point of Test Driven Development? What do you personally think about this approach?
  TDD helps make writing code more predictable, reducing bugs in production code and keeping code consistent between developers. I personally find it tedious, but that has more to do with the scale of the projects we have applied it to. I can see the importance of it on a large project with multiple people working on it. It made the sprints take 4 times as long to finish because of wrestling with how tests handle promises. My thought process works better if I write a bit of actual code first for an MVP and then write the tests. Writing tests before any functionality feels very unnatural.

3. What is a `spy` in `sinon`? How do we use it to effectively test a `callback`?
  A spy provided by sinon is a function that records data on itself such as the number of times it was called, its values, and `this`. There are two types: annonymous and method wrappers. The annonymous function can be passed into functions to test them like a callback. They can also wrap an exisiting callback to test it specifically.