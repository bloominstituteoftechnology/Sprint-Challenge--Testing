# Please answer the following questions

1.  In Jest, what are the differences between `describe()` and `it()` globals, and what are good uses for them?

describe() allows you to create a block of tests. It allows us to modularize our tests and essentially create subsections for our tests. it() is essentially test(), but is influenced by BDD standards. it() allows us to test for something that we may expect from our code.

2.  What is the point of `Test Driven Development`? What do you think about this approach?

TDD is when we write tests before our application, which allows us to think deeply about what we want from our application and how we want to handle certain edge cases and errors. This allows for minimal bugs and good design principles, but is more time consuming.

3.  What are `mocks`? What are a good use cases for them?

Mock functions allow us to test functions and how they can affect our outputs while keeping track of how many times the function was called and what it was called with. In short, I think it's just a tool we can use to easily test our functions.

4.  Mention three types of automated tests.

- Unit tests
- Snapshot tests
- Component tests
