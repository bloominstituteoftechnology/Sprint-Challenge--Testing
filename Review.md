# Please answer the following questions

1.  In Jest, what are the differences between `describe()` and `it()` globals, and what are good uses for them?
Describe allows grouping of multple tests and it represents the tests themselves. If you want to test an endpoint with multiple tests you would describe that endpoint and put all of your it tests inside that describe.

2.  What is the point of `Test Driven Development`? What do you think about this approach?
The point of TDD is to write the tests before you write the code, then write code that fails the test and then fix the code. Personally, I hate it. I think is a concept that stiffles creativity. It feels backwards. I don't know necessarily what my code is going to do before I do it. I don't know what to test for until I have built the code. 

3.  Mention three types of automated tests.
unit test, snapshot test, integration test