# Please answer the following questions

1.  In Jest, what are the differences between `describe()` and `it()` globals, and what are good uses for them?
describe() allows you to gather or group your tests into separate groupings within the same file, even multiple nested levels.
it() is the test case.

2.  What is the point of `Test Driven Development`? What do you think about this approach?

TDD is like a safety net.  It helps minimizes the risk of bugs in code.  It is an approach that ensures that your code has 100% testing coverage. That way, if anything breaks due to changes, the tests will catch it. It also ensures that code behaves the way you expect given specific examples.

3.  What are `mocks`? What are a good use case for them?

Mocks (and mock expectations) are fake methods (like spies) with pre-programmed behavior (like stubs) as well as pre-programmed expectations.  An example, fake a server to ensure offline, fast and expected responses when testing a process.

4.  Mention three types of tests.
Unit / Integration / Functional / snapshot / component
