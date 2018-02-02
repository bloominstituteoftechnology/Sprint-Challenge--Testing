# Answers To Sprint-Challenge--Testing Questions

* In Mocha, what are the differences between `before` `after` `beforeEach` `afterEach`? When do they run? What are they used for?

  * Mocha's before and after functions are run at respectively at the beginning and end of the test
  * Mocha's beforeEach and afterEach function are run respectively at the beginning and end of each it()

* What is the point of Test Driven Development? What do you personally think about this approach?

  * The point of Test Driven Development is to write code that is less prone to errors by either writing a test for what a function/ section expected outcome is suppose to be, then writing code to produce that outcome. By have automatic code in place also allows the programmer to see if some new code they write breaks the old code written.

  * I think one should use as many error preventing techinques that are viably possible in one's code, including using TDD. For one, like anything it is much easier to write the code when you already know what you want it to do. Two, testing catches more errors much more quickly and efficient than without testing.

* What is a `spy` in `sinon`? How do we use it to effectively test a `callback`?
  * A sinon spy test the functioniality of the function we are testing such as how many times a function is call or how may arguments it has or errors the function trhew
