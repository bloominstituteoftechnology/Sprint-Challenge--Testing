1. In Mocha, what are the differences between `before` `after` `beforeEach` `afterEach`? When do they run? What are they used for?
Just like mocha tests can be asynchronous, so can your before() hook logic. Going back to the pre-population example, this is handy since that means all of your async pre-test logic won't force another level of indentation on all of your actual testing logic.By having a before() hook, you have a logical, semantically valid place to insert this kind of logic.

Mocha also provides several other hooks, namely: after(), beforeEach(), and afterEach(). You could probably ask this same question about all these other hooks as well, but if you buy into the notion that any of them have a validated existence, then before() really needs to be included to round out the API.

before() runs once per describe() block, and beforeEach() runs once per test (it() block). Is that true?

In brief, before is run once before all the tests in a describe and after is run once after all the tests in a describe, whereas beforeEach is run before each test in a describe, and afterEach after each test. Which one you want to use depends on your actual test.

However, all before hooks that apply are executed before any beforeEach hook. This explains the order above: sublevel before executes before top beforeEach because it is a before hook. And with after and afterEach, the same logic applies but the the order is reversed: all afterEach hooks that apply are executed before any after hook.


1. What is the point of Test Driven Development? What do you personally think about this approach?Test-driven development (TDD) is a software development process that relies on the repetition of a very short development cycle: Requirements are turned into very specific test cases, then the software is improved to pass the new tests, only. This is opposed to software development that allows software to be added that is not proven to meet requirements.A 2005 study found that using TDD meant writing more tests and, in turn, programmers who wrote more tests tended to be more productive. Hypotheses relating to code quality and a more direct correlation between TDD and productivity were inconclusive.

1. What is a `spy` in `sinon`? How do we use it to effectively test a `callback`?Spying on existing methods

sinon.spy can also spy on existing functions. When doing so, the original function will behave just as normal (including when used as a constructor) but you will have access to data about all calls. The following is a slightly contrived example:

var spy = sinon.spy();
Creates an anonymous function that records arguments, this value, exceptions and return values for all calls.
var spy = sinon.spy(myFunc);
Spies on the provided function

Spy objects are objects returned from `sinon.spy()`. When spying on existing methods with `sinon.spy(object, method)`, the following properties and methods are also available on `object.method`.

var callback = sinon.spy();

The callback function is acting more or less like a mock, as it's verifying if it was called with the correct arguments. Lets improve the test by turning callback into a real mock: