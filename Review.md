# Please answer the following questions

1.  In Jest, what are the differences between `describe()` and `it()` globals, and what are good uses for them?
Describe() is only used to break test suites down into components so that you can organize your tests. It() is where the tests are actually performed.

2.  What is the point of `Test Driven Development`? What do you think about this approach?
The whole point of TDD is to write your tests first, see that it fails, then write your code and make sure it passes. I think it's a great approach because it covers a lot more of your code and maintaining and adding to your code is easy.

3.  Mention three types of automated tests.
Unit tests, which are fast and simple to write and execute. Component tests, which are for appearance and functionality of componenets. Snapshot tests, which checks the output using jest.