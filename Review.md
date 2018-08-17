# Please answer the following questions

1.  In Jest, what are the differences between `describe()` and `it()` globals, and what are good uses for them?

describe() breaks your test suite into components. Depending on your test strategy, you might have a describe for each function in your class, each module of your plugin, or each user-facing piece of functionality.

You can also nest describe() to further subdivide the suite.

it() is where you perform individual tests. You should be able to describe each test like a little sentence. You shouldn't be able to subdivide tests further- if you feel like you need to, use describe instead.

2.  What is the point of `Test Driven Development`? What do you think about this approach?

Test-Driven Development is a process for when you write and run your tests. Following it makes it possible to have a very high test-coverage. TDD also reduces the likelihood of having bugs in your tests, which can otherwise be difficult to track down.

3.  What are `mocks`? What are a good use case for them?

Mocks are imitations of objects and are primarily used in unit testing. An object under test may have dependencies on other (complex) objects. To isolate the behavior of the object you want to replace the other objects by mocks that simulate the behavior of the real objects. This is useful if the real objects are impractical to incorporate into the unit test.

4.  Mention three types of tests.

Unit testing, integration testing, end to end testing, component testing, snapshot testing, coverage testing, functional testing, performance testing and acceptance testing.
