1. In Mocha, what are the differences between `before`, `after`, `beforeEach`, and `afterEach`? When do they run? What are they used for?

  * `before` runs before all tests in its block
  * `after` runs after all tests in its block
  * `beforeEach` runs before each test in its block
  * `afterEach` runs after each test in its block

2. What is the point of Test Driven Development? What do you personally think about this approach?

* The purpose of TDD is to begin with the end in mind, or to begin developing with a clearer picture of what the end result should be before writing the actual production code.
* Personally, I think this is a good approach to development, as long as its clear up front what the end goal should be. Of course things change, but if the end constantly changes then a possible downside to TDD would be wasting a lot of time before anything get to production and tested with real world users. **Overall though, I like TDD's approach and with a solid overal picture of the product TDD likely will be great for the team and development.**

3. What is a `spy` in `sinon`? How do we use it to effectively test a `callback`?

* `spies` are functions that record, or keep track of, arguments, return value, the value of `this` and any exceptions thrown. See [Sinon Spies] http://sinonjs.org/releases/v4.4.10/spies/. This is helpful in keeping track of the app's functions, such as how many times a function is called, etc.
