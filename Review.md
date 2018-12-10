# Please answer the following questions

1.  In Jest, what are the differences between `describe()` and `it()` globals, and what are good uses for them?

`it()` groups together any tests that are testing different aspects of the same thing, calling them one "test" together under your output. `describe()` does less, but is useful for grouping together multiple tests that are thematically similar. Typically you will have one or more `expect` under a `it`, and one or more `it` grouped together within a `describe` block.

2.  What is the point of `Test Driven Development`? What do you think about this approach?

TDD is automating the testing of your code with as high test-coverage as possible. I'm not convinced of its worth from the small examples we've done this week, but believe that it's a valuable princicple for bigger projects.

3.  Mention three types of automated tests.

Unit tests, snapshot tests, and integration tests.