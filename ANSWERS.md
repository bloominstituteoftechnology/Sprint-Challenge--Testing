<!-- Answers to the Short Answer Essay Questions go here -->

1. In Mocha, what are the differences between `before`, `after`, `beforeEach`, and `afterEach`? When do they run? What are they used for?
- `before` is called before the `describe` tests are run, and `after` is called aftewards. `beforeEach` is called before each `it` block, and `afterEach` afterwards. They are used to set up the testing environment.

2. What is the point of Test Driven Development? What do you personally think about this approach?
- I suppose it's to make sure that you know exactly what you want the program to do and have all of it's parameters in place before you build the code so that the code fits perfectly into your idea. I don't like the approach because the only way to test the testing code is to build the main code, and if there are bugs, which there always are, then you need to go back and edit both files to get them to agree with each other. So you end up having to work with both files anyway. It makes more sense to me to build the main code first, working with it in things like Postman, and then once you're done, build a testing platform to attack it from every angle.

3. What is a `spy` in `sinon`? How do we use it to effectively test a `callback`?
- A `spy` replaces a `cb`, so the `spy` works in the same exact way that a `cb` would be except that it provides additional information about the `cb`, like how many times it was called, what was passed into it, etc.