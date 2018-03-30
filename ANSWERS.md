<!-- Answers to the Short Answer Essay Questions go here -->

<!-- I still can't get lists to work... just went with 
     different size headers instead...                   -->


## In Mocha, what are the differences between `before`, `after`, `beforeEach`, and `afterEach`? When do they run? What are they used for?

#### before: This runs first.  Opens the database/connection.

#### after: This runs last.  Close the database/connection.

#### beforeEach: this runs after before.  Used for dummy data.

#### afterEach: this runs after beforeEach, before after.  Used for clearing dummy data.

#### `after -> for every test: beforeEach/afterEach ->`

#### In general, before/beforeEach sets up conditions, after/afterEach negates conditions.

## What is the point of Test Driven Development? What do you personally think about this approach?

#### 'The point of' is a bit vague, but I guess that is alluding to the fact you are writing tests to help guide your code to be ideal.  i.e. you grasp the idea of what your code should be by understanding what you should test.

#### It makes sense to some degree to do TDD.  If you write your code first (I suppose this is BDD), you will just test that code to make sure it is doing what you want.  With TDD, you write tests and make code conform to the test instead.  Either way could be fallible.  You might right code that in turn passes your tests but your code doesn't account for something.  You could write tests that don't account for something and your code will then also reflect this error.  I have no preference.

## What is a `spy` in `sinon`? How do we use it to effectively test a `callback`?

#### A spy is something that mimics what your code would do given certain arguments.  It stores return values and allows you to test either components as they are in and of themselves or how they interact with other components 