# Please answer the following questions

1.  In Jest, what are the differences between `describe()` and `it()` globals, and what are good uses for them?

describe() does exactly that, it describes what a group of tests are for. A good use for this global would be to describe a group of tests belonging to the same function or the same route.
it() runs a test. This is the function you want to wrap your testing logic in. Multiple it() globals can be inside a describe().

2.  What is the point of `Test Driven Development`? What do you think about this approach?

The point of test driven development is to have a high percentage of your code that is tested automatically. This leads to less bugs since you are testing first and writing code to create passing test second. I think this is a smart approach to testing. While it is time consuming, it makes for a more maintainable code base in the future.

3.  What are `mocks`? What are a good use cases for them?

Mocks are fake data that enable you to test a specific behavior in your program. A good time to use mocks would be testing an API. In this instance, you would need to test the behavior of your program and may not have real data to do so.

4.  Mention three types of automated tests.
    Unit testing
    Integration testing
    Component testing
