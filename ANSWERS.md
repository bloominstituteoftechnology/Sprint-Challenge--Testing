## Self-Study/Essay Questions

Demonstrate your understanding of this week's concepts by answering the following free-form questions. Edit this document to include your answers after each question. Make sure to leave a blank line above and below your answer so it is clear and easy to read by your project manager.

1. In Jest, what are the differences between `describe()` and `it()` globals, and what are good uses for them?
  `describe()` is used to segment your test suite into components, whereas `it()` is used to execute individual tests. For example a robot that needs to select a product might need several steps to complete the task:
    Navigate to bin
    Choose product color
    Pull product and place in internal bucket

    `describe('select a product, pull it from the shelf and place in bucket)`
      it('navigate to bin')
      it('will choose the red product')
      it('will place the red product in bucket 1')

2. What is the point of `Test Driven Development`? What do you think about this approach?
   The TDD approach defines the conditions needed for the function to pass.  Then the developer writes code to pass the test.  The code will meet the requirements because the specified outcome is required in order to pass. 

3. Mention three types of automated tests.
    Three automated test types are functional tests, unit tests and integration tests.
    Functional tests target a single function like `countAislesPassed` or `turnAtTargetAisle`.
    Unit tests would include all the functions comprising the action `navigateToBin` or `chooseProductColor`.
    Integration tests would be the entire suite of tests that commands the robot to `retrieveProduct`, i.e. all three units: `navigateToBin`, `chooseProductColor` and `placeProductInBucket`.