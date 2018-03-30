<!-- Answers to the Short Answer Essay Questions go here -->

## 1.  In Mocha, what are the differences between `before`, `after`, `beforeEach`, and `afterEach`? When do they run? What are they used for?
    They are 'hooks' that are used to setup preconditions for your tests run and to do any cleanup afterwards.
    `before` and `after` run _once_ before all the tests in the block, while `beforeEach` and `afterEach` run before every test in the block.

## 2.  What is the point of Test Driven Development? What do you personally think about this approach?
  The point of TDD is to test small individual components of an application in isolation to ensure it performs and behaves as intended. This should make it easier when debugging the application as a whole as you are able to isolate and identify individual problems. Often times the tests would be written prior to the actual code, which can help frame what the component is supposed to do, which mayin turn lead to greater insight on how the program should be structured as a whole.

  Personally, I find this approach to be logical and can see it being very useful in many circumstances. It may be overkill for smaller applications, but for more complex applications, especially where performance is important, I would think it would be almost mandatory.

## 3.  What is a `spy` in `sinon`? How do we use it to effectively test a `callback`?
  A spy is a function that records information about itself whenever it's called. This information can then be accessed and used in tests.
  You can send it into another function that expects a callback and later access its properties reveal how it was used by that function. This is done by using it's built-in methods like `callCount` and `calledOn`.
