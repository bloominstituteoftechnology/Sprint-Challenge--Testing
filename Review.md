# Please answer the following questions

1.  In Jest, what are the differences between `describe()` and `it()` globals, and what are good uses for them?
describe() creates a block of related tests that are grouped together in one "test suite".

it() which is an alis for test() is required in a test file to run particular a test.  

2.  What is the point of `Test Driven Development`? What do you think about this approach?
Test-driven development is a  development process that relies on the  developer initially writing a test that fails and tehn making the required improvements that then produces the minimum amount of code to pass that test. As  result developmemnt and testimg can happen together to improve the product.

I think it's an excellent method to make sure testing doesn't happen after a ton of developmemt is done and it's too alte to change the direction of the code based on tests that may fail. Code can be changed based on testing quickly.

3.  What are `mocks`? What are a good use case for them?
Mocking is primarily used in unit testing. An object under test may have dependencies on other (complex) objects. To isolate the behavior of the object you want to replace the other objects by mocks that simulate the behavior of the real objects. This is useful if the real objects are impractical to incorporate into the unit test.

4.  Mention three types of tests.
Unit Testing
Integrated Testing
Component testing

