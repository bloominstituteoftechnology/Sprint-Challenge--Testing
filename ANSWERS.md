<!-- Answers to the Short Answer Essay Questions go here -->

1. In Mocha, what are the differences between `before`, `after`, `beforeEach`, and `afterEach`? When do they run? What are they used for?
> * __before:__ Runs before ALL the tests in the `describe` block and before the `beforeEach` command  are run at each level of nested scope.
> * __after:__ Runs after ALL the tests in all `describe` blocks have run and after the `afterEach` command has run.
> * __beforeEach:__ runs before each `describe` block and after the `before` block has run.
> * __afterEach:__ runs after each `describe` block but before the final `after` method runs.

2. What is the point of Test Driven Development? What do you personally think about this approach?
> This seems like a more difficult and cumbersome approach to coding. However, I think the main upside is that you really have to think about the code you are going to write before you start coding.

3. What is a `spy` in `sinon`? How do we use it to effectively test a `callback`?
> It allows us to test the functionality of a callback without actually running the callback in the code.
