<!-- Answers to the Short Answer Essay Questions go here -->


1. In Jest, what are the differences between beforeAll, afterAll, beforeEach, and afterEach? When do they run? What are they used for?

beforeAll only executes one time for the code block it is in, before any of the beforeEach functions.

afterAll are used to clean up at the conclusion of the test spec. It runs a function after the tests in the test file have been completed.

beforeEach executes before the "describe" code blocks, and everything in it. 

afterEach runs a function after each one of the tests in the test file is completed. Primarily used to do clean up of any temp states you have tested in your tests.




2. What is the point of Test Driven Development? What do you personally think about this approach?

The idea behind TDD is that for applications that are more complex, if you write the tests for each function before you write the code, you can isolate and avoid bugs prior to writing bigger blocks of code, and thereby saving work on testing and bug fixes once you have the whole application built, and you are testing it prior to deploying.

I think that it's a good concept and idea, but it does require that the application be carefully and explicitly defined up front with artifacts such as wireframes and user stories so that the developers can write code to specs that explicitly define expected behaviors and results, which then means that test can be written to achieve each of those expected behaviors.


3. What is a mock function? How do we use it
They are also known as spies, because they basically observe the behavior of a function indirectly from the code you are testing, which gives you the ability to observe the function as it's being executed, rather than just looking at the expected output of the function.

4. Mention three types of tests.
Unit Testing - This is usually testing at the most basic level: at an individual unit or component to be sure that that unit is actually functioning as designed and expected.

System Testing - This is testing that looks at the performance of the application as it is put into the different environments where it is expected to run in production, to ensure that the configuration and code is capable of executing as the software is designed in every environment where it is expected to run successfully.

User Acceptance Testing (UAT) or Usability Testing - is testing done with the client and/or primary stakeholders of the product, to ensure that the features and functionality are behaving in the way they had expected, and also to ensure that any bugs that are discovered during this process are logged and resolved prior to the official launch/deployment of the software.


Integration Testing - This is the testing of groups of components (unlike unit testing, where each component is tested individually) to produce expected output of the appllication. This is to ensure that the application components, and any third party software and APIs are all performing and delivering as expected to produce the required output of the application/product.


5. What type of test performs database operations against a real server. 

Integration testing.
