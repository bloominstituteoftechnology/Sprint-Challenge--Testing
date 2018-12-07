# Please answer the following questions

1.  In Jest, what are the differences between `describe()` and `it()` globals, and what are good uses for them?
    describe: used to group individual tests by overarching category, one describe for each component being tested
	it: used for individual tests, should correlate to one behavior/outcome, can contain multiple expectations

2.  What is the point of `Test Driven Development`? What do you think about this approach?
    Using testing as the foundation for writing new code forces developers to explicate what they want their code to do before writing it, determine if it’s necessary, and writing only what’s necessary to pass each test. Testing incrementally in this way also helps ensure that adding a new section of code doesn’t cause previous tests to fail.
    
3.  Mention three types of automated tests.
	unit tests, component tests, snapshot tests