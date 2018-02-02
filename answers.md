# Answers
1. Questoion: In Mocha, what are the differences between `before` `after` `beforeEach` `afterEach`? When do they run? What are they used for?
### Comparison
| Method | Time of Execution | Description |
|-------:|:-----------------:|:------------|
|before| Before the Whole Tests Suite| Executes code once before the whole test suite is run, commonly used to set up the testing environment with special conditions for the whole suite to use.|
|after| After the Whole Tests Suite| Executes code at the end of the whole tests suite, this is commonly used for clearing all those conditions set with the before method, but it can do other things such as closing connections, and executing exit codes.
|beforeEach| before each check | Eecutes code before each individual checking section inside the test suite, and it is useful for setting an environment that will be tested on that check alone.
|afterEach | after each check | Executes code after each check is finished, and it is used to clear the changes made during the check, specially if they will affect the outcome of other tests being run in the suite.

1. Question: What is the point of Test Driven Development? What do you personally think about this approach?
    * TDD is an approach that would benefit the project by keeping the goals in mind. Thinking of the expected results for every aspect of a software's design can be useful when in production. TDD forces the software architect/designer/engineer to think about the application and its expected functionality, and this helps in planning properly the behaviour of it, as will help spread the work on large teams with a consistent result. The tests will ensure that the original design and plan will be achieved, no matter the methods.
1. What is a `spy` in `sinon`? How do we use it to effectively test a `callback`?
    * Sinon Spy: is used to observe interactions and gather data about a speciffic method or application, to be used for the purpose of validation in testing. It contains methods within itself to retrieve such data like: how many times the spied function was executed, how long it took to execute, this is specially important when testing callbacks because it can report how many times the callback was executed and thus give insight on the effectiveness of a certain algoritm without much effort.