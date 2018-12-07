# Please answer the following questions

1.  In Jest, what are the differences between `describe()` and `it()` globals, and what are good uses for them?

'describe()' creates a block of code that functions as one test suite. It helps to organize the code and also is handy to use to define the purpose of the block of code.

'it()' works the same way as 'test()' in that it takes two arguements - one that's a string describing the individual test, and another that's a function with expectations. Using 'it()' is helpful for writing descriptive testing code that's easy to understand.

2.  What is the point of `Test Driven Development`? What do you think about this approach?

The point of TDD is to write the test before the functional code in order to make sure that the code meets certain criteria. I think that it can be a good thing in that it can force us to think through the objectives of our code and plan it ahead of time. I might not use it on personal projects much, but I see the benefit of using it on important projects.

3.  Mention three types of automated tests.

Component testing, snapshot testing, and unit testing