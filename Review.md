# Please answer the following questions

- **1. In Jest, what are the differences between `describe()` and `it()` globals, and what are good uses for them?**
- `describe()` helps groups tests together and nest them under a common title for easier viewing purposes. `it()` let's you assert tests on different components.

- **2. What is the point of `Test Driven Development`? What do you think about this approach?**
- Test Driven Development is about writing tests first before writing application code. It's failing the tests on purpose and then writing application code to make them pass. TDD is a beneficial since it inspires confidence and designs that works since they have been pre-tested. It also helps minimizes the risk of regression. In my opinion, TDD is just another tool we can use to develop and not one I personally favor since it operates on a reverse logic during development which takes more cognitive load. However, I can truly see the benefit of learning it, using this first as a stepping stone for juniors to learn.

- **3. What are `mocks`? What are a good use cases for them?**
- Mocks are useful to capture calls to a function, see return values, and instances of a constructor function with the keyword `new`. They are also known `spies` that lets you see the behavior of a function called indirectly. You use `jest.fn()` to create a mock function, `jest.mock()` to mock a module, or `jest.spyOn` to emulate a function in isolation.

- **4. Mention three types of automated tests.**
- Automated tests include many different types but 3 popular ones are units tests, integration tests, and snapshot testing. *Unit tests* are fast, small tests written by developers. *Integration* tests are important to test different components in a system and how they interact. *Snapshot testing* are unique tests that checks the current output to prior output and fails with any new changes. You can update the snapshots using `u` button.
