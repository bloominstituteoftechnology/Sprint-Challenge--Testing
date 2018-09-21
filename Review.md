# Please answer the following questions

1.  In Jest, what are the differences between `describe()` and `it()` globals, and what are good uses for them?

Describe() is used to create test suits. Also it can be used to break test suits even further and describe() can be nested.
it() is used to perform small individual test cases. Each test suit can have multiple it() test cases but it() can test only one target.

2.  What is the point of `Test Driven Development`? What do you think about this approach?

The reason TDD is used to produce well designed and tidier code. Before designing an app we already have some information from the client of what is required so it is easier to meet acceptance criteria from the start as we already know what to test. Also TDD helps developers to stay focused on writing the code to pass the tests - less deviation from what code needs to be written first, and that reduces the gold-plating. There more benefits so last but not least - tests serve as a documentation for the developers.

3.  What are `mocks`? What are a good use cases for them?

Mocks create a fake object or a function that have the same behaviour as the original objects or functions. Mocks can be used as dependencies to perform unit testing on other components.

4.  Mention three types of automated tests.
Unit testing, Integration testing, Functional testing, Black Box testing, Regression testing, Data driven testing 
