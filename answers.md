### 1. In Mocha, what are the differences between before after beforeEach afterEach? When do they run? What are they used for?

- before is run once before all the tests in the decribe block while after is run after all the tests in the describe block

- beforeEach is run before each individual test in a describe block while afterEach is run is run after each individual test

### 2. What is the point of Test Driven Development? What do you personally think about this approach?

- The point is to have a better understanding of the scope of the project. In other words you are completing your project around the tests you created which helps with bugs and keeps the code cleaner.

- I definitely need some practice but it definitely has its benefits especially in larger projects.

### 3. What is a spy in sinon? How do we use it to effectively test a callback?

- spy in sinon is essentially a dummy callback. It is used in a cb function you want to test and can keep track of the number of callbacks called while logging it into the console.