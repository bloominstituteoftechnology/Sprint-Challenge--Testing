# Please answer the following questions

1.  In Jest, what are the differences between `describe()` and `it()` globals, and what are good uses for them?

`describe()` is used as a  container for different tests. `Describe` is useful for creating divisions for tests that are performing on different endpoints or components.
Describe can be nested to further subdivide testing suites for as much specificity as needed. `it()` is where individual tests are performed, and contain all of the actual
testing logic. `it()` operators can't be nested, they can only run one test at a time.



2.  What is the point of `Test Driven Development`? What do you think about this approach?

Test Driven Development is useful for creating a testing architecture that can be utilized for future product releases to prevent regressions in code.
By building out unit tests, you can make sure all tests are passing before adding new features to the application, without having to do as much debugging after the features
are implemented. I definitely see the utility of unit testing, and however tedious it may be, thankfully most tests only need to be written once.


3.  Mention three types of automated tests.

Unit testing
Component tests
Snapshots
