# Please answer the following questions

1.  In Jest, what are the differences between `describe()` and `it()` globals, and what are good uses for them?
   Describe tells you the main goal of the following tests, whiile the it block references each test specifically. Describe is best used for testing a component as a whole while It is great for testing specific pieces of a component.

2.  What is the point of `Test Driven Development`? What do you think about this approach?
 TDD creates tests for the application and then develop with those tests in mind. This lets you decide what behavior you are looking for and code toward that behavior. I think it's a decent approach but I think the best approach is a combination of Behavior Driven and Test Driven Development in which user behavior is considered and defined and then tests are created based on those expected behaviors, then code is written to satisfy the tests - the end result should be code that is thoroughly functional with a wider range of testing that figures in all the bizarro ways users can mess things up.

3.  What are `mocks`? What are a good use cases for them?
 Mocks are basically dummy data used to test code without having to deploy and populate real data. A bonus of mocks is that they keep a record of what gets called, how many times, how it's called, etc.

I'd employ mocks frequently throughout the initial development of the app, when I'm still testing functionality and I'm not ready to use real data. Another good use would be to help determine where a particular operation is getting hung up.

4.  Mention three types of automated tests.
  Unit, Regression, Snapshot