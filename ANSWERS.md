<!-- Answers to the Short Answer Essay Questions go here -->

1. In Mocha, what are the differences between `before`, `after`, `beforeEach`, and `afterEach`? When do they run? What are they used for?

These commands (often referred to as 'hooks') are used to set the state for your tests to run properly. The `before` and `after` hooks run before and after all tests, and can be thought of as equivalent to 'start' and 'end'. The `Each` versions run before each test itself, and follow or precede the main before and after hooks.  

2. What is the point of Test Driven Development? What do you personally think about this approach?

TDD saves you time in the long run by reducing the opportunity to introduce bugs. Once your tests are established, you can use them to catch mistakes before they are committed to the main code repository. It seems to be a logical extension of what programmers already do, namely reducing complexity through abstraction. What I love about a well written function is that, once I can verify it works as it is supposed to, I can begin to use it by name and forget about the implementation details. Testing is that verification system, only automated.

3. What is a `spy` in `sinon`? How do we use it to effectively test a `callback`?

A spy is like a fake or imposter function that records what is happening during execution. You can send the spy in as the callback, and then test whether or not the spy was called as you were expecting.
