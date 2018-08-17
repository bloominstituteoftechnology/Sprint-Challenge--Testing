# Please answer the following questions

1.  In Jest, what are the differences between `describe()` and `it()` globals, and what are good uses for them?
> `describe()` is used to break the test into test suites, or components. We can have nested `describe()` to break down the test suits even further.
  `it()` is used to perform individual test. Each test suite can have multiple `it()`, but `it()` cannot be nested or broken down into subtests.

2.  What is the point of `Test Driven Development`? What do you think about this approach?
> I think the point of TDD is to gain a solid understanding of the program you're going to write.  
  Because if we can write tests for our code before we actually develope the code, we can save a lot of time debugging our code, hence speeds up the development process.  
  I think this is absolutely beneficial to any project. However it'd be great to have these tests be solely handle by a team member or even a separate team, because we can do development paralelly, and speeds up the development even more.

3.  What are `mocks`? What are a good use case for them?
>Mock creates a fake object that have the same functionality as the original object. We then can use this mocked object as dependencies to perform unit test on other components that depend on it. 

4.  Mention three types of tests.
> Unit Testing.  
  Integration Testing.  
  Component Testing.