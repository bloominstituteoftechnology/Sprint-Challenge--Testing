# Please answer the following questions

1.  In Jest, what are the differences between `describe()` and `it()` globals, and what are good uses for them?
--> describe() : is for grouping the test cases and nest them under a common title for easier viewing purposes.
    it()  : is used to write the real test cases. We give a simple description of what we are going to test as the first argument in it() function. Then the callback function to be called.
    Uses of describe() and it() that you can write multiple scernario testing for one function or component under one describe.

2.  What is the point of `Test Driven Development`? What do you think about this approach?
--> Test-driven development (TDD) is a development technique where you must first write a test that fails before you write new functional code. 
    May be TDD is the simplest way to achieve both good quality code and good test coverage.
    I think the TDD concept will be good for program quality but as it is based on reverse-concept may need experience programmer to do it.

3.  Mention three types of automated tests.
--> Automated tests include many different types but 3 popular ones are: 
        - Unit tests : are fast, small tests written by developers. 
        - Integration tests : are important to test different components in a system and how they interact.
        - Snapshot testing : are unique tests that checks the current output to prior output and fails with any new changes. You can update the snapshots    using `u` button.
