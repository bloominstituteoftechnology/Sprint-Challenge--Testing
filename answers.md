# Answers

1. In Mocha, what are the differences between `before` `after` `beforeEach` `afterEach`? When do they run? What are they used for?  

    *Answer:*  `before`, `after`, `beforeEach` & `afterEach` are **hooks** in Mocha. Hooks are like events, which gets triggered at specified time in its lifecycle.

    * `before` hook is called **before** running **all** the tests.
    * `after` hook is called **after** running **all** the tests.
    * `beforeEach` hook is called **before** running **each** test.
    * `afterEach` hook is called **after** running **each** tests.

---

2. What is the point of Test Driven Development? What do you personally think about this approach?  

    *Answer:* Test Driven Development (TDD) is a methodology in Software development where the tests are created prior to coding. This significantly reduces the time needed for development.

---

3. What is a `spy` in `sinon`? How do we use it to effectively test a `callback`?  

    *Answer:* A **spy** in sinon is a function that help in monitoring the activities of a function call. Using *spy* for testing callback functions by passing to the function which will be handling the callback. **Spy** provides many properties such as `called`, `calledOnce`, `callCount`, `withArgs`, etc.. which makes it ideal to be used for tests.
