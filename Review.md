# Please answer the following questions

1.  In Jest, what are the differences between `describe()` and `it()` globals, and what are good uses for them?
2.  What is the point of `Test Driven Development`? What do you think about this approach?
3.  What are `mocks`? What are a good use cases for them?
4.  Mention three types of automated tests.

# Answers

1. 'Describe' is used to organize several tests into a 'test suite'. 'it' is an alias for using the 'test' global and these tests are functions you run to test your code.
2. TDD means using these tests, to drive the design and building of your code. A 'hello world' program using TDD, you know you need output so you write a test for output. After testing the output, it fails, so you modify your code to pass the test. Now it gives output, so now you write a test for testing the correct output. It fails the correct output, so you modify your code to give correct output. Etc, etc. Adding tests, then modifying your code as needed. I think using a modified version of this approach, along with much better design in the initial planning stages, would be the way to go.
3. Mocks are used to simulate dependency conditions inside of your tests. SuperTest sounds like a mocking library, in that it let us simulate the response objects for our endpoints and test our API using the precise conditions we want to give it.
4. Unit (individual pieces of code), Integration (making sure those pieces of code fit with other pieces), and Functional (testing the complete application).