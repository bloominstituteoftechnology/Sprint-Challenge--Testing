<!-- Answers to the Short Answer Essay Questions go here -->

1. In Mocha, what are the differences between `before`, `after`, `beforeEach`, and `afterEach`? When do they run? What are they used for?
- before() runs before all tests in a describe. beforeEach() runs before each test in a describe.
- after() runs after all tests in a describe. afterEach() runs after each test in a describe.

2. What is the point of Test Driven Development? What do you personally think about this approach?
- Test Driven Development (TDD) means you write the tests before writing the code. What do I think?
  I admire organized people who function like that. Unfortunately, I'm not one of them. I know I
  know, you'll call me a cowboy coder. But I think speed is important and I can always my code
  later.

3. What is a `spy` in `sinon`? How do we use it to effectively test a `callback`?
- A spy is used to gather information about function calls. To test a callback, you'd assign the
  spy as the function's callback param and use `.calledOnce` to see if the callback was called. 
