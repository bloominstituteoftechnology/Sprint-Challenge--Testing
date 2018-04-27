<!-- Answers to the Short Answer Essay Questions go here -->

1.  In Mocha, what are the differences between `before`, `after`, `beforeEach`, and `afterEach`? When do they run? What are they used for?

* `before` is a function that is ran before ALL the test with its function block. Run only ONCE.
* `after` is a function that is ran after ALL the test with its function block. Run only ONCE.
* `beforeEach` is a function that is ran before EACH the test with its function block.
* `afterEach` is a function that is ran before EACH the test with its function block.
* Each of these hooks are used to be sync or async when populating test cases.

2.  What is the point of Test Driven Development? What do you personally think about this approach?

* The concept of TDD is to have high test coverage with a high percentage rate of accuracy during testing. This type of testing is completed before you actually write out your code so it take alot of thought process and planning the test. This approach is very tedious but comprehensive. Planning is necessary but as a developer we need to know what the heck we are testing in the first place. But as someone that is inexperienced, this task might be dawnting because they want to test everything including those that are not necessary thus overkilling the testing and creating unnecessary buys. The whole gest of this type of testing is to eliminate the likelihood of bugs forming. With that being said planning and drafting thetesting before coding should be successful.

3.  What is a `spy` in `sinon`? How do we use it to effectively test a `callback`?

[`Spy is a function that records arguments, return value, the value of this and exception thrown (if any) for all its calls.`](http://sinonjs.org/releases/v4.2.2/spies/)

* We use spy effectively to effectively test a `callback` by creating a function then having the reference as callback. This usually will either return the result we want or have a value of undefined.
