<!-- Answers to the Short Answer Essay Questions go here -->


1. In Jest, what are the differences between beforeAll, afterAll, beforeEach, and afterEach? When do they run? What are they used for?
- beforeAll: Ran once before any of the tests in that specific description block.

- afterAll: Ran once after any of the tests in that specific description block.

- beforeEach: Ran once before each of the tests in that specific description block.

- afterEach: Ran once after each of the tests in that specific description block.

1. What is the point of Test Driven Development? What do you personally think about this approach?
> The point of TDD is to know that as long as your tests are passing then you can be sure that your data is returning correctly and interactivity between components are also working as intended.

> Personally I do not see the value in TDD from a solo developer point of view. I feel to properly work with a TDD mindset you need to have the application completely architected before even writing the tests. You need to know the names of methods that are going to be created, where they will reside in the app, the data you want to send and receive. I think TDD might be okay for a company or a project that has been architected and has those people to plan all of this before any code, tests included, has been written. For small projects and maybe any project I think using BDD might be a safer and more agile/flexibile approach.

1. What is a mock function? How do we use it to test a callback passed to a function?
> Mock functions are exactly what the name suggests. You overwrite a real function with a jest-mock function, `window.alert = jest.fn()`. So instead of the tests calling the real `window.alert` it will now call this empty Jest function. From here we can test things such as how many times it was called in order to know whether or not our UI/methods are working.

1. Mention three types of tests.
- Integration: Testing your components and making sure they are doing what you expect them to do.

- Unit: Testing functions/methods by supplying input and getting the expected, or unexpected, output.

- Function tests: aka UI Tests, testing the application in the browser.

1. What type of test performs database operations against a real server.
- Unit Tests
