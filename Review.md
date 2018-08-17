# Please answer the following questions

1.  In Jest, what are the differences between `describe()` and `it()` globals, and what are good uses for them?

`it()` performs an individual test while `describe()` groups `it()` calls as a means of organizing these tests. For instance a component may be tested with multiple `it()` statements, so to logically group these we could place them in a `describe()` that specifies that these tests are related to that component.


2.  What is the point of `Test Driven Development`? What do you think about this approach?
The point of `Test Driven Development` is to solidify functional requirements and design of code before it is written. It helps in Agile processes by establishing criteria for development, encouraging refactoring and mitigating risks by isolating code changes.

I think it is a good idea for larger companies, but I have yet to see it done well in practice. Usually testing is more of an afterthought, or something that comes later in the process.


3.  What are `mocks`? What are a good use case for them?
`mocks` are isolated bits of functional code that can be used by a test. When used with functions `mocks` allow us to test when a function has been called and capture what is returned when we supply it with arguments.

4.  Mention three types of tests.
Unit tests are quick, discrete tests on granular pieces of functionality in isolation. Integration tests focus on the interplay between various bits of functionality, such as that of a component. Snapshot tests compare the current output of code against prior output to monitor for unexpected changes.