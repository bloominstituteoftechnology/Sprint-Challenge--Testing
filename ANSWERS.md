<!-- Answers to the Short Answer Essay Questions go here -->


1. In Jest, what are the differences between beforeAll, afterAll, beforeEach, and afterEach? When do they run? What are they used for?
    -beforAll - runs a function before any test in a file. This is useful to set up some state before running some tests. This test will also wait for any promises to be fullfilled.

    -afterAll - runs a function after all tests in the file have been completed. If the functions reconigize that there is asynchornourus functions or promises, jest waits and for that the promise to be fulfilled before continuing. if in a desribe block it will run at the end of the block. Best used to gloablly reset state across tests 

    -beforEach - runs a function before each tests. Bested used if you have many tests to set 

    -afterEach - runs a function after each tests in the file is complete. Best used if you want to reset state after each test is ran and will also wait for promises to be fullfilled before continuing.

1. What is the point of Test Driven Development? What do you personally think about this approach?
    - The benefit of TDD is to not wrtie any code but instead tell a story of user cases before you write code. The workflow of for this theory is to help write clean, readable, and maintable code. If you can not write a test for code then it should not be written. I personally like the theory of this workflow. 

1. What is a mock function? How do we use it to test a callback passed to a function?
    - a mock function inspects the mock's state to ensure a callback can be invoked. 
1. Mention three types of tests.
unit integration and functional

1. What type of test performs database operations against a real server.
    intergration test
