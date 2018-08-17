# Please answer the following questions

1.  In Jest, what are the differences between `describe()` and `it()` globals, and what are good uses for them?
describe is used to setup sections of tests, so you can group them easier. it global is used to describe the specific test you are about to run.
2.  What is the point of `Test Driven Development`? What do you think about this approach?
The point is to help eliminate bugs in the software, as you write it. This makes your approach more efficient, and less bugs go out into production.
It's a great approach, but it does require more time in the beginning while you are learning what to test for.
3.  What are `mocks`? What are a good use case for them?
    Mocks are functions we can use to replace something we don't control, with something we do. for example, if we needed to mimic calls to a 3rd party API,
    or to a dB, we could setup a mock to mimic the output from those.
4.  Mention three types of tests.

unit test
integration test
regression test