## Questions - Self Study - You can exercise your Google-Fu for this and any other _Sprint Challenge_ in the future.

1. In Mocha, what are the differences between `before` `after` `beforeEach` `afterEach`? When do they run? What are they used for?

> before runs before all tests in a testing block

> after runs after all tests in a testing block

> beforeEach runs before each test in a block

> afterEach runs after each test in a block

1. What is the point of Test Driven Development? What do you personally think about this approach?

> The point of TDD is to generate code that is both testable and easier to refactor. Although TDD increases the odds of you implementing a good design it doesnt guarantee it. The tests are only as good as the developer writing them.

> In my experience working with code that is in production I made my company switch to TDD because the amount of time and money spent fixing unforeseen bugs when updating, or modifying code was too expensive. Many will see the upfront cost of spending time creating tests before writing the actual code as too expensive but when weighed against the alternative it saves way more than it costs.

1. What is a `spy` in `sinon`? How do we use it to effectively test a `callback`?

> This is a subject I wish we spent more time on. I am not sure so I am going to google it.

> A spy is a function that records arguments, return value, the value of this and exception thrown (if any) for all its calls.
> The primary use for spies is to gather information about function calls. You can also use them to help verify things, such as whether a function was called or not.
