<!-- Answers to the Short Answer Essay Questions go here -->

# Answers
## In Jest, what are the differences between beforeAll, afterAll, beforeEach, and afterEach? When do they run? What are they used for?
It's fairly straightforward. they really set it up to simplify the understanding...
1. beforeAll: run "beforeAll" the tests and is used for code that only needs to be run once like connecting to the database.

1. afterAll: run "afterAll" the tests are complete and can be used for disconnecting from a db.

1. beforeEach: run "beforeEach" test and can be used to initialize values that may have changed because of another test

1. afterEach: run "afterEach" test and can be used to reset values or delete database entries.
## What is the point of Test Driven Development? What do you personally think about this approach?
The point is to make cleaner more functional code as you go. I personally think it's slow and cumbersome. I prefer cowboy coding more. I realize it's more dangerous at scale and ideally shouldn't be done at all. However, I want to focus all of my talent on functionality for now, if need be we can always hire a tester and maintainer to fix what the team threw together.
## What is a mock function? How do we use it to test a callback passed to a function?
A mock function is a copy of another real function in the code. It is fully enclosed in the test so as not to damage the real program. Since callbacks are just calls to a function, we can pass mock function to test callbacks and tell the test to expect what the mock function is supposed to return.
## Mention three types of tests.
Unit tests, Component tests, Snapshot tests
## What type of test performs database operations against a real server.
Integration test
