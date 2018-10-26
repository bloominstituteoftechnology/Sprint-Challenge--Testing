# Please answer the following questions

1.  In Jest, what are the differences between `describe()` and `it()` globals, and what are good uses for them?
- `describe()` creates a block to group tests inside of it, providing a description of what the tests inside of it are about, and is great for grouping tests, providing a clear description of what type of tests will go on.
  - `it()` holds the actual testing inside of its body. `it()` provides a description of the TEST ITSELF, and is great for creating specific, concise tests.


2.  What is the point of `Test Driven Development`? What do you think about this approach?
- The point of `Test Driven Development`, also known as `TDD`, is the process of writing tests first and creating code around those tests: this allows to create error/side-effect-free code and ensures the code does exactly what you expect. I think the approach is fair, I personally think of the tests as I am writing the code; for example, when creating the GET endpoint or a POST endpoint, I already know in my head what status code I want to send under which circumstances thus I write the tests after.

3.  What are `mocks`? What are a good use cases for them?
- `Mocks` are a method of testing in isolation. A good use case would be testing a POST endpoint which relies on some sort of content via the request body. Instead of using the content (request body) it relies on to work, we can control the content that it uses via giving data we create on our own (something we have control over).

4.  Mention three types of automated tests.
1. Unit Testing
2. Snapshot Testing
3. Integration Testing
