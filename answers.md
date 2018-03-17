1. In Mocha, what are the differences between `before` `after` `beforeEach` `afterEach`? When do they run? What are they used for?
- 'before': it means before I go and run any of the tests do some setup for me / do whatever specified inside the 'before' function before running any of the tests
- 'after': all the tests have run do whatever specified inside of the body of this 'after' function / after you use that to go and clean up after yourself wipe away all the test data that you used initially when you go and ran your tests
- 'beforeEach': specifies in you'll run this operation before every test / if you need to do some cleanup or teardown in between every particular test
- 'afterEach': specifies in you'll run this operation after every test

1. What is the point of Test Driven Development? What do you personally think about this approach?
- TDD(Test-Driven Development) is a process for when you write and run your tests. If you use the TDD method, it is better to write the test code first. Then create and refactor small code that can pass the test.
- Sometimes it feels like a tedious job, and sometimes it makes me feel like a more capable programmer.

1. What is a `spy` in `sinon`? How do we use it to effectively test a `callback`?
- 
