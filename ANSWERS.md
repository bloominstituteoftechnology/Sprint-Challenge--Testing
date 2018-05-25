<!-- Answers to the Short Answer Essay Questions go here -->

1.  In Jest, what are the differences between beforeAll, afterAll, beforeEach, and afterEach? When do they run? What are they used for?

In jest, these functions are considered to be 'setup and teardown globals', meaning they can be used to repeat setup and teardown for many tests. 'beforeAll' runs before the first test, paired with 'afterAll', which runs after the last test. Moreover, 'beforeEach' runs before each and every test, while 'afterEach' runs after every single test.

1.  What is the point of Test Driven Development? What do you personally think about this approach?

The point of test driven development is to have to think through the necessary requirements of your code, while also reducing the amount of bugs that are written. As far as tdd goes, I see the value in it- as it seems like it would encourage refactoring as a healthy habit. At first it seems like more work, but in the long run I can imagine it saves time and builds better practices.

1.  What is a mock function? How do we use it to test a callback passed to a function?

A 'mock function' is a duplicate function written in testing to inpspect the mocks 'state' in comparsion to the original function to be sure the proper callback is being returned. I mean do you want me to write the code? You write a mock function, then expect the mock calls.

1.  Mention three types of tests.
    Three important types of testing are 'unit testing', 'Component testing', and 'snapshot testing'

1)  What type of test performs database operations against a real server.

I don't know and can't find the answer.
