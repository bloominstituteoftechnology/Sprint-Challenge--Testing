# Please answer the following questions

1.  In Jest, what are the differences between `describe()` and `it()` globals, and what are good uses for them?
     - In Jest, `describe()` allows you to divide your test suite into groups, or components, of related tests, for the sake of organization. `describe()` cb functions can contain other `derscribe()` globals, or `it()` globals, which test something specific about your application.
2.  What is the point of `Test Driven Development`? What do you think about this approach?
     - `TDD` or `Test Driven Developement` is a way of developing robust, sustainable, applications by developing the application simultaneously with, and even after, developing tests. This provides a suite of guidelines for your project that can act like a framework, helping to prevent bugs caused by future changes, regardless of how familiar the future developer is with the original code base, among other things.
3.  What are `mocks`? What are a good use cases for them?
    - `mocks` are basically just simulations of real data (or units) that is either too complex, too big, or otherwise inaccesible for a testing environment. A good use case might be when you don't want to make an entire database of information, so you just mock up a javascript object to work for the time being.
4.  Mention three types of automated tests.
    -  Three types of automated tests are: Unit Testing, Funtional Testing, and Regression Testing. 
