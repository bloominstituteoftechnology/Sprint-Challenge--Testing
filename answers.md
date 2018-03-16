Q: - In Mocha, what are the differences between before after beforeEach afterEach? When do they run? What are they used for?

A: - Before and after are hooks used to run a piece of code before and after all test code, they run right before the first describe, and after all of them are done. BeforeEach and AfterEach run after each describe.

Q: - What is the point of Test Driven Development? What do you personally think about this approach?

A: - The purpose is to have code that does exactly what you are expecting it to.

Q: - What is a spy in sinon? How do we use it to effectively test a callback?

A: Creates an anonymous function that records arguments, this value, exceptions and return values for all calls.
