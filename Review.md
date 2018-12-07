# Please answer the following questions

1.  In Jest, what are the differences between `describe()` and `it()` globals, and what are good uses for them?
describe is best suited for labeling a specific unit that you'll be testing and is a wrapper for small unit labels and unit tests. The 'described' unit will generally be a whole file or smaller functional units within a file. 'It' is suited for labeling and wrapping specific tests that are done on a described unit. A series of 'it' test blocks are usually nested inside of describe blocks.
2.  What is the point of `Test Driven Development`? What do you think about this approach?
It's meant to develop applications that are built to be easily monitored and tested. It's also meant to allow for 'clean-edged' development, meaning that a clear outline of component functionality is set before development, leading developers to build with very specific guidelines. It's dandy.
3.  What are `mocks`? What are a good use cases for them?
Mocks are used to test functions and how they can affect our outputs. A mock could be great for testing buttons or other user-induced events.
4.  Mention three types of automated tests.
Unit, Snapshot, and Component tests.
