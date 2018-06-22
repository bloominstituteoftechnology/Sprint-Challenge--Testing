<!-- Answers to the Short Answer Essay Questions go here -->


1. In Jest, what are the differences between beforeAll, afterAll, beforeEach, and afterEach? When do they run? What are they used for?

The difference comes from when the run, as indicated in the name. beforeAll runs before any tests do. AfterAll runs after all tests have run. BeforeEach runs before each test does and afterEach runs after each test. They can be used to do a lot of things, but we've used them this week mostly to connect/disconnect to our mongo db through mongoose or delete created items (like users) to make testing smoother.

1. What is the point of Test Driven Development? What do you personally think about this approach?

To write out tests before actually building anything to make sure that all the required functionality is present and working. I think it's very useful to push the developer/dev team in planning out their app well before building any of it, as you need to know exactly what you want your app to do before writing any tests.

1. What is a mock function? How do we use it to test a callback passed to a function?

A mock function is a fake function that can be used in place of a callback. We use it to test the mocks state in order to assure that the callback is being invoked properly (i.e. what we expect to happen to cb, does happen).

1. Mention three types of tests.

So we can use expect to test for correct length(.toHaveLength), a boolean(.toBeTruthy(), .toBeFalsy()), to match a given string/message(.toMatch(), .toEqual()), and so much more.

1. What type of test performs database operations against a real server.

One that involves the supertest library.
