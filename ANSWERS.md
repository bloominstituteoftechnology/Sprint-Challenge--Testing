<!-- Answers to the Short Answer Essay Questions go here -->

1. In Mocha, what are the differences between `before`, `after`, `beforeEach`, and `afterEach`? When do they run? What are they used for?

2. What is the point of Test Driven Development? What do you personally think about this approach?

3. What is a `spy` in `sinon`? How do we use it to effectively test a `callback`?

1. 
- 'before' function will execute only once before the describe or before the whole test run. it is useful for creating a test database before the actual testing.

- after function will execute only once after the describe or after all the tests has been ran. it is useful for dropping a test database after all tests has been executed.

- beforeEach will run before each 'it' block gets executed. they're useful for creating or posting a document to the database for testing purposes.

- afterEach will run after each 'it' block gets executed. they're useful for removing each document that was previously created by beforeEach function.

2. TDD is useful in a sense that any new features that gets added to the application will have to pass the requirement through testing. Personally i can see the benefit of TDD but it may need some time to get used to this approach.

3.
a spy is a method in sinon library. it acts like a callback that can record the activies of a function that is being called. 



