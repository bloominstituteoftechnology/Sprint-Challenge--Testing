1. In Mocha, what are the differences between `before` `after` `beforeEach` `afterEach`? When do they run? What are they used for?
* 'before`- The `before()` hook in Mocha runs **before any** tests in each `describe()` block of code runs. It runs **before** the first run of a `beforeEach()` hook.
* `after` - The `after()` hook in Mocha runs **after all** tests in each `describe()` block of code runs. It runs **after** the last run of a `afterEach()` hook.
* `beforeEach`- The `beforeEach()` hook in Mocha runs **before every** test in a `describe()` block of code.
* `afterEach` - The `afterEach()` hook in Mocha runs **after every** test in a `describe()` block of code.

1. What is the point of Test Driven Development? What do you personally think about this approach?
 * In Test Driven Development, requirments are turned into test cases, then software is improved to pass the tests. This way, the software added is proven to meet the requirments specified. In my opinion, this approach makes alot of sense, because the features added have passed the tests so they should do what is expected.  

1. What is a `spy` in `sinon`? How do we use it to effectively test a `callback`?
* A `spy` in `sinon`- offers information about function calls without affecting thier behavior. 