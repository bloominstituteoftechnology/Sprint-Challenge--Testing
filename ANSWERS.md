<!-- Answers to the Short Answer Essay Questions go here -->


1. In Jest, what are the differences between beforeAll, afterAll, beforeEach, and afterEach? When do they run? What are they used for?

beforeAll runs before the test suite runs; afterAll runs at the end of the test suite as the final function; beforeEach runs before each test is ran within the the test suite; afterEach runs at the end of each test within the suite.

1. What is the point of Test Driven Development? What do you personally think about this approach?

    Test Driven Development allows a programmer to set down the parameters of what they want their program to do: before any code is written. The written code can the be tailored to match the exact functionality planned. 
    This also allows for building an MVP that passes the prescribed tests; then refactoring the code for readibility or performance and as long as the tests pass the function retains the desired functionality.

    As a new developer and a generally solo developer I don't see it being critical; it's difficult enough to remember how to code rather than write tests to test the code that you are about to write; for me it's redundant.

    As a team or project manager I can see TDD being invaluable to ensure consistency and cohesive code base for the current project.

1. What is a mock function? How do we use it to test a callback passed to a function?
    A mock function is a empty function call to determine if the tested function is working as desired; without a mock call you wouldn't be able to test if a function is returning the desired output.

1. Mention three types of tests.
    unit tests; tests a specific function in isolation.
    stress test; to test the limits of the desired function/program
    performance test; to test the overall performance and speed of the desired function/program

1. What type of test performs database operations against a real server.
    Unsure what the question is asking specifically.

