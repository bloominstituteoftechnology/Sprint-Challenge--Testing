# Please answer the following questions

1.  In Jest, what are the differences between `describe()` and `it()` globals, and what are good uses for them?

The difference is that "it()" (and the equivalent "test()") refer to individual tests while "describe()" is used to refer to multiple tests. The most common use of this is to create a block of tests with a describe() function, called a test suite. The test suite contains a number of individual tests using test() or it() that are related in some way; they may be testing the same endpoint or component, for example. The test suites allow developers to quickly see blocks of test results in a format like this:

describe (
  test()/it()
  test()/it()
  test()/it()
)

2.  What is the point of `Test Driven Development`? What do you think about this approach?

The most notable point about TDD is that the first step is to deliberately write a test that will initially fill. A developer will then write the minimum amount of code necessary to make this test work, add more tests in the same manner, and refactor the code as necessary. The point of this approach is that it allows developers to work in small, consistent steps and try to account for a wide variety of problems. I have been enjoying TDD personally. A number of other students in my group have expressed frustration about the method and it's certainly understandable given that TDD can be a tedious process, but I like being roced to think about the code from a different vantage point. Rather than worry about errors that I'm making, TDD forces me to think like a user to try and figure out all the creative ways that somebody can force an error that I may not have considered while writing the code. I think this makes me better at trying to account for these errors in the first place, and the practice writing tests to check for so many different potential problems is good practice for real-world environments.

3.  What are `mocks`? What are a good use cases for them?

Used in unit testing, mocks are units that are created to imitate (hence the name) the behavior of real units. This allows developers to test only the specific parts of the code they're interested in or responsible for. For example, if a team is responsible solely for developing the front end of an application and is not supposed to worry about server issues like network calls at all, this team might manually hardcode network responses without actually making the calls. This mockup allows the front end team to test their application with the network call dummy data to ensure that what's being returned is correct while leaving the actual back end work, namely making sure the network calls function properly, to the team that is supposed to handle it.

4.  Mention three types of automated tests.

Unit tests, integration tests, and component tests.
