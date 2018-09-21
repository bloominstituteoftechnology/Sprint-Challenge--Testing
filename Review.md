# Please answer the following questions

1.  In Jest, what are the differences between `describe()` and `it()` globals, and what are good uses for them?
2.  What is the point of `Test Driven Development`? What do you think about this approach?
3.  What are `mocks`? What are a good use cases for them?
4.  Mention three types of automated tests.

1. describe() breaks your test suite into components. Depending on your test strategy, you might have a describe for each function in your class, each module of your plugin, or each user-facing piece of functionality.

it() is where you perform individual tests. You should be able to describe each test like a little sentence, such as "it calculates the area when the radius is set".

2. TDD or Test-Driven Development is a process for when you write and run your tests. Following it makes it possible to have a very high test-coverage. Test-coverage refers to the percentage of your code that is tested automatically, so a higher number is better. TDD also reduces the likelihood of having bugs in your tests, which can otherwise be difficult to track down. I personally think while TDD seems to be better than BDD, TDD is more rigid, given that the component(s) have to be written based on the components' ability to pass the tests. Nonetheless, I see TDD's value in smaller projects.

3. Mocking is primarily used in unit testing. An object under test may have dependencies on other (complex) objects. To isolate the behavior of the object you want to replace the other objects by mocks that simulate the behavior of the real objects. This is useful if the real objects are impractical to incorporate into the unit test. i.e. The calculator we tested for React App Testing.

4. Unit testing, Integration Testing, Component Testing.