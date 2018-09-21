# Please answer the following questions

1.  In Jest, what are the differences between `describe()` and `it()` globals, and what are good uses for them?
    <!-- describe() is used to combine a bunch of related tests into a test suite while it() is the method that actually runs the test. You can combine a bunch of it() tests into a describe() test suite to run a group of tests for a specific component and only that component. -->
2.  What is the point of `Test Driven Development`? What do you think about this approach?
    <!-- the point is to think about what you want the code to do and act and then build around the expected functionality. It should allow for cleaner code with less bugs because all the necessary test cases should be accounted for before the coding begins. -->
3.  What are `mocks`? What are a good use cases for them?
    <!-- mocks are units that simulate the behavior of real objects. If you have a function that posts to a db you can mock the db so the function can be tested in it's ability to properly post to a db even though that db technically doesn't exist.  -->

4.  Mention three types of automated tests.
    <!-- end-to-end tests, integration test, and unit tests. -->
