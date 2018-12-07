# Please answer the following questions

1.  In Jest, what are the differences between `describe()` and `it()` globals, and what are good uses for them?

`describe()` and `it()` are semantic designators used to organize our test flow. `describe()` is used for top and mid-level categories, i.e. to specify specific components or functions or parts of same under test. `it()` is used for individual tests and should describe a very specific behavior that is then tested within the block, terminating in an `expect()` statement, which will return the correct passing or failing state. Judicious usage of both together will result in a testing suite that is easy to read and diagnose.

2.  What is the point of `Test Driven Development`? What do you think about this approach?

Whereas an intuitive approach to development might lead us to write our code and throw in some tests post hoc, `Test Driven Development` turns this workflow on its head with an opposite paradigm: write tests first, then write code. The benefit of this approach is that it will lead to code that has very high test coverage and subsequently a reduced frequency of uncaught bugs.

While I appreciate the benefits of this approach, I worry that for any circumstances other than a work environment with tightly controlled and comprehensively detailed specifications such an approach would stifle the creative, iterative process of building complex systems.

3.  Mention three types of automated tests.

Unit tests, integration tests, snapshot tests.
