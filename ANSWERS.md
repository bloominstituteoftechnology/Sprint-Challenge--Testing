<!-- Answers to the Short Answer Essay Questions go here -->

1.  In Jest, what are the differences between beforeAll, afterAll, beforeEach, and afterEach? When do they run? What are they used for?
    beforeAll and afterAll are run before and after all of the tests. beforeEach and afterEach are run after each of the tests.
    (Jest likes to name things descriptivelty)
    They're good for writing setup / cleanup that needs to happen related to more than one test in a DRY way.
1.  What is the point of Test Driven Development? What do you personally think about this approach?
    Test driven development puts a focus on what the software needs to actually _do_. I love it in principle,
    but actually trying to do it was a little weird. If I were to become accustomed to it I'm sure I would love it.
1.  What is a mock function? How do we use it to test a callback passed to a function?
    A mock function is wrapped in a spy by jest. This gives us access to the mock object, which contains information
    about what's been happening to the function.
1.  Mention three types of tests.
    unit testing, functional testing, integration testing
1.  What type of test performs database operations against a real server.
    functional testing
