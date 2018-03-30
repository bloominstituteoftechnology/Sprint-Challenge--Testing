<!-- Answers to the Short Answer Essay Questions go here -->

1.  In Mocha, what are the differences between `before`, `after`, `beforeEach`, and `afterEach`? When do they run? What are they used for?

These are Mochas Hooks, they allow you to run code order to set up testing grounds for tests to run or reset them at the appropriate stage. For example the `before` hook allows you to run code prior to test being ran as long as the test are siblings with the hook and share scope within the test block. `beforeEach` allows you to execute code before every test in the shared testing scope. `after` and `afterEach` follow the same logic except your tests will run after.

Example:

```
describe('hooks', function() {

  before(function() {
    // runs before all tests in this block
  });

  after(function() {
    // runs after all tests in this block
  });

  beforeEach(function() {
    // runs before each test in this block
  });

  afterEach(function() {
    // runs after each test in this block
  });

  // test cases
});
```

2.  What is the point of Test Driven Development? What do you personally think about this approach?

In my opinion, test driven developement is a useful way of developing software in certain cases. Its foretelling nature forces a developer to know in great detail what it is the software needs to do before any code is written. This greatly increases developement speed since goals are clearly laid out and no time is wasted thinking of other options. However, my hang up with this type of developement is I don't see it being ideal for a codebase whose development is based on feedback/guidance from a userbase/disparate sources. I think TDD has great power when a product is developed around an expert persons vision or a single source of feedback. The rigity in the develope path laid out by TDD amplifies the experts ability to produce. It is this strength that morphs into slowness when adjustments to the path must be made on a regulare basis. In summary TDD... use it when its best.

3.  What is a `spy` in `sinon`? How do we use it to effectively test a `callback`?

Spies are just what they are named. It is software that can either 'tag along' with the code as you run it and compare the behavior of your spy to see if test run accordingly or you can wrap your code in a spy and run it. Testing a callback with a spy you can count the number of callbacks the spy was called back. It spying on your code should share the same callback count. Similar thinking can be applied to test other aspects of your code.
