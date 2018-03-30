<!-- Answers to the Short Answer Essay Questions go here -->

1. In Mocha, what are the differences between `before`, `after`, `beforeEach`, and `afterEach`? When do they run? What are they used for?
# 'before' functions run before all the tests in it's block. 'after' functions run after all tests in it's block. 'beforeEach' functions runs before each test in it's block. 'afterEach' functions run after each test in it's block. They are used as pre/post-conditions for tests.

2. What is the point of Test Driven Development? What do you personally think about this approach?
# TDD is the process of developing tests functions before developing the actual feature. This is important because in some cases, the tests may fail before development begins. In such a case, testing early may save some time and effort when developing those features later on. I think it's neat.

3. What is a `spy` in `sinon`? How do we use it to effectively test a `callback`?
# A 'spy' is used to get information regarding a callback/function (such as it's arguments, return value, how many times in was called).
