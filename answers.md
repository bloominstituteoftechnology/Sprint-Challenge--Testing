## In Mocha, what are the differences between before after beforeEach afterEach? When do they run? What are they used for?
* __Before__ is run *__ONLY ONCE__* before all the tests in a describe block.
* __After__ is run *__ONLY ONCE__* after all the tests in a describe block.
* __beforeEach__ is run *before* __EACH__ test in the describe block 
* __afterEach__ is run *after* __EACH__ test in the bescribe block.

## What is the point of Test Driven Development? What do you personally think about this approach?
* Test Driven Development's purpose is to encourage simple designs and inspire confidence. It starts with writing a test that will initially fail. Then, you write the most basic form of code in order to pass the test. Then, you refactor. The mantra "red/green/refactor" stems from TDD. 

* I think, based on deeper studying of what TDD is, that it can serve its purpose in certain areas. It's an important skill to have, especially in design. Therefore, I believe it is mainly a design technique vs a programming technique. The man who "rediscovered" it, Kent Beck, seemed to imply this when he said that TDD encourages simple designs and inspires confidence *(as noted above)*.

## What is a spy in sinon? How do we use it to effectively test a callback?

* Spy in sinon is a function that can tell us how many times a function was called, what arguments a call had, what values were returned or what errors were thrown. Spies are good to use when the goal of a test is to verify something happened. 

There are two types of spies:
 
 1.  As an anonymous function: A typcial way for this to be used is in testing how a function handles a callback.

 2. Wrapping methods that already exist in the system being tested: This will make the spy act like the original method, but will give you access to data about all calls.