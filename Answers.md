1. In Jest, what are the differences between describe() and it() globals, and what are good uses for them?

Describe() is a container which can contain many different tests. It can create divisions for different endpoints and components. It() is holding individual tests and contains all testing logic. It cannot be nested and must to run one by one.

2. What is the point of Test Driven Development? What do you think about this approach?

TDD includes the practice of writing tests first, but focuses on tests which describe behavior, rather than tests which test a unit of implementation. Using TDD allows us to make sure that everything is working before adding new features to the app and avoid debugging after feature implementation.


3. Mention three types of automated tests.

Unit test
Integration test
Input – output test