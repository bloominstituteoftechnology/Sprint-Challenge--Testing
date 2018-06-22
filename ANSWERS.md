<!-- Answers to the Short Answer Essay Questions go here -->


1. In Jest, what are the differences between beforeAll, afterAll, beforeEach, and afterEach? When do they run? What are they used for?

- **beforeAll** is a "lifecycle" hook to initiate a code snippet before all tests, this could be a global variable or connecting to the database in our case
- **afterAll** is the opposite of *beforeAll* and can be used to close connections or clean up db entries created in beforeAll etc
- **beforeEach** does what beforeAll does, but does it before every test
- **afterEach** opposite of *beforeEach*, we mostly use it to remove created users from our db, basically you use it to revert all changes made in the tests or in the beforeEAch

2. What is the point of Test Driven Development? What do you personally think about this approach?

- most common upsides: leaner code, less bugs, no regression
- easier refactoring down the road (as tests will still do their job and give you the information if you refactored right)
- lowering dev costs for projects over the middle- and longterm

I think it is a smart practice and there is no way around it.

3. What is a mock function? How do we use it to test a callback passed to a function?

- a mock function "replaces" other functions & callbacks in order for us to test rudimentary functionality of them
- as an example we'd replace window.alert with a mock function to see if our code calls it w/ the correct arguments without it actually calling the alert() function

4. Mention three types of tests.

- Unit, Integration, Functional

5. What type of test performs database operations against a real server.

- Integration tests
