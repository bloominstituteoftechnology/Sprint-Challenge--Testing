# Please answer the following questions

1.  In Jest, what are the differences between `describe()` and `it()` globals, and what are good uses for them?

"Describe" is for a category of tests and "it" is for a single test. These functions make your jest output more readable.

2.  What is the point of `Test Driven Development`? What do you think about this approach?

It's a little like setting a scaffolding up before you begin to the construct a building. Once you have your tests you simultaneously have a checkliist for what
needs to be done as well as some confidence checks. In the right environment I could see TDD ensuring a team is able to link their code together smoothly
but for smaller projects the process is probably overkill; you're writing more code, after all, which in the end is yet another thing that could break.

3.  What are `mocks`? What are a good use cases for them?

A mock can be a stand in for data and functions. In one of my tests I wanted to see if a click handler would call its function. I didn't care particularly
-what- the function I was calling was, merely that it was called, so I used a mock to stand in for it.

4.  Mention three types of automated tests.

Unit, Integrated and Component testing.
