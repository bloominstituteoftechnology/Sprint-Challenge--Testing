# Please answer the following questions

1.  In Jest, what are the differences between `describe()` and `it()` globals, and what are good uses for them?

    Describe() is a way to organize your tests, describe allows you create a category of tests and place them inside the describe callback function.

    it() is function that allows you to perform a behavior driven design test using Jest.


2.  What is the point of `Test Driven Development`? What do you think about this approach?

    Test Driven Development is a software development process where you write specific test cases prior to actually developing any code. The methodology prescribes that you write a test, initially causing it to fail purposefully. Then you write the minimum amount of code necessary to pass the test. If the test continues to fail, make small changes until it passes. Once it passes you can choose to refactor the code to make the test more verbose, or move on to the next test.

    I'm not sure how much I like doing TDD. Sometimes it's hard for me to come up with ways to test something I haven't actually built yet. I prefer building something first and then testing that it works.


3.  Mention three types of automated tests.

    - Jest
    - Puppeteer
    - Jasmine

