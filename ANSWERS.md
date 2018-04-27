<!-- Answers to the Short Answer Essay Questions go here -->

1. In Mocha, what are the differences between `before`, `after`, `beforeEach`, and `afterEach`? When do they run? What are they used for?

```

before/after run before/after all of the tests, whearas beforeEach/afterEach runs before/after each test.



```

2. What is the point of Test Driven Development? What do you personally think about this approach?

TDD is a process of writing tests prior to your program, and then writing your program around those tests. I think that if you have a full vision of the program you're creating it would be beneficial to make sure you're always staying on track and executing exactly what you intend. In scenarios where the app is more of a vague concept that gets fleshed out as it's written, I think it would be hard to write more than just basic tests initially, since you can't really test for functionality you haven't already thought of.

3. What is a `spy` in `sinon`? How do we use it to effectively test a `callback`?

```
Spy records the arguments, return values, and if there are execptions thrown. It can be used with the callback to make sure all the intended information is being used, and the correct responses are triggered.
```