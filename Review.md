# Please answer the following questions

1.  In Jest, what are the differences between `describe()` and `it()` globals, and what are good uses for them?
    -- Describe is a way to group tests together for organization whereas test()/it() is the actual test 

2.  What is the point of `Test Driven Development`? What do you think about this approach?
    -- TDD is writing tests prior to code. I can see how writing all your tests could be beneficial as you know as you go that your code is correct, but I also think writing your code first and testing after could be faster, even if you do have to change some bugs in the code. Maybe this would change as you know what to test for later.

3.  What are `mocks`? What are a good use cases for them?
    -- Mocks allow you to test while simulating a dependency (like fetch or axios)

4.  Mention three types of automated tests.
    -- Integration testing (testing communication between different parts of code), unit testings (testing a smaller, specific part of code), component testing (testing libraries, like React)