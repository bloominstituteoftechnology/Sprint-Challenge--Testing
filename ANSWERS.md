<!-- Answers to the Short Answer Essay Questions go here -->

1. In Mocha, what are the differences between `before`, `after`, `beforeEach`, and `afterEach`? When do they run? What are they used for?  
- The code in `before` will run before each `describe` block. The code in `after` will run after each  `describe` block.
- The code in `beforeEach` and `afterEach` will run before and after each `it` block, respectively.

2. What is the point of Test Driven Development? What do you personally think about this approach?  
- Test-Driven Development tries to make it easier to accomplish goals by turning the requirements into test cases. So you write the tests first, and then write your code in order to pass the tests.

- I personally don't like this approach because it feels really backwards to me, but I can see why it's useful. The only thing is making sure that your tests work the way they're supposed to, which can be really frustrating.

3. What is a `spy` in `sinon`? How do we use it to effectively test a `callback`?  
- A spy is like a wrapper for a function that keeps track of everything that happens with it. It keeps track of how many times it's called, what arguments it was called with, what it returns, and all sorts of useful stuff.