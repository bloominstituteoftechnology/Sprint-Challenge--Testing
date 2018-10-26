# Please answer the following questions

1.  In Jest, what are the differences between `describe()` and `it()` globals, and what are good uses for them?
- describe() declares a group of test cases types, whereas it() declares a group of tests that verifies a specific aspect of the code
- E.g. describe() can be used to group several it() 's for a POST endpoint, while a nested it() can group several test cases for the add functionality

2.  What is the point of `Test Driven Development`? What do you think about this approach?
- Test-driven development/design (TDD) is a software development process where test cases are written before actually software codes were written and check against the test cases.  Personally, I think test cases should be written by an independent group simultaneous as the software codes are being developed by the developers.  Developers are inherently bias toward the codes he/she had developed, so it is necessary to separate the roles for the two processes.  However, an intermediary is necessary to (a) proof-read the test cases, and (b) fixed the software codes based on failed tests.  This may lead to a lot of man power devoted to testing.  In a small startup with only a couple of developers, the developers may simple assume different roles for different components of the software (i.e if Developer A writes Component A and Developr B writes Component B, Developer B writes test cases for Component A and Developer A write test cases for Component B)

3.  What are `mocks`? What are a good use cases for them?
- Mocks are a way to examine and manipulate how a function is being called.  It is useful when a developer needs to examine a database endpoint functionality, by using mock to simulate a certain server response value in order to check the return functionality.

4.  Mention three types of automated tests.
- unit test
- component test
- integration test