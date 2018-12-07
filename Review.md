#Chad Jemmett
# Please answer the following questions

1.  In Jest, what are the differences between `describe()` and `it()` globals, and what are good uses for them?

  `Describe` is a group of tests. You can group tests by component or function. In a describe block you can use a `beforeEach` function to prepare some element of the app for the following tests. `it` focuses on one aspect of the app. The single return of a function, for example.
    `Describe` and `it` have their roots in behavior driven development. They are used to improve the langauage of TDD.

2.  What is the point of `Test Driven Development`? What do you think about this approach?

  Test driven development does three things. First, it allows you to plan out your application before writing any code. You have to have a clear picture of what your app will do when you are writing tests. Second, it allows for refactoring code without worrying it will break. If your tests show the outcome of your app, you can refactor the code to make it better or more efficient. Third, tests make for long term stability of your app. The tests can identify where your app breaks if you add or upgrade libraries. Tests are a message to your future self and other developers about what the app is supposed to do.

  I find test driven development difficult at this stage. I don't have enough experience with programming to know how to plan an application and prepare tests for it. I look forward to gaining more experience so that testing can save me time and effort. Which, I feel is the benefit of TDD.

3.  Mention three types of automated tests.

  1. Unit tests. Unit tests are used to test correctness. They are written by developers and are a TDD/BDD convention.

  2. Integeration tests. Integration tests make sure all the parts of the app work together.

  3.Component testing. Component testing is to check the appearance and function of a component. 
