# Please answer the following questions

1.  In Jest, what are the differences between `describe()` and `it()` globals, and what are good uses for them?
describe() is used to group related test under one "test suite" it() is used for the
creation of one individual test.
2.  What is the point of `Test Driven Development`? What do you think about this approach?
The point of test driven development is to, in a sense, plan ahead. It allows you to think
about how a program should work before you make it. In BDD you create code and then
reactively write tests when things go wrong, but with TDD you proactively design and troubleshoot
problems before they arise. I personally find TDD more tedious but it seems to be more
efficient in the long run.
3.  What are `mocks`? What are a good use case for them?
Mocks are Jest methods used to test functionality by providing functions and routes
data that can be controlled by the tester as opposed to live data from a server or database.
One use case is testing the results of server calls without having to actually update or
change your database.
4.  Mention three types of tests.
Unit Tests, Component Tests, Integration tests.
