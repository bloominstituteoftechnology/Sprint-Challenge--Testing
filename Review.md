# Please answer the following questions

1.  In Jest, what are the differences between `describe()` and `it()` globals, and what are good uses for them?

describe() is a method in jest which runs a collection of tests. it() is used for a single test.  describe() is useful because it allows the developer to gather together several tests that are related, perhaps to a single element or piece of functionality.  When used effectively, describe() makes the output of the test more organized and informative. 

2.  What is the point of `Test Driven Development`? What do you think about this approach?

Test Driven Development is a paradigm of testing that involves approaching the applications starting with the tests.  In essence, the developer would write the test thinking about the expected behavior of an element or function while considering possible user behavior.  The elements are written after the corresponding tests.  There are certainly benefits to this approach.  In my opinion the most meaningful consequence of using this approach is that it forces the developer to take a broader view of the code and consider what could happen before writing the code. I do think there are circumstances in which this approach could waste a lot of time, especially when components are relatively simple and don’t have the potential to break.  The more a component relies on forces outside of the application, the more scrutiny it should receive in testing.  A good developer (maybe me someday) would have the instincts to know when TDD would be beneficial or unproductive. 

3.  What are `mocks`? What are a good use cases for them?

Mocks are functions that come with the jest library.  As the name suggests, a mock is a method for imitating the behavior of a piece of functionality for testing purposes. This makes testing the links between code easier without diminishing the quality of the test since the function doesn’t actually have to be run in order to test it’s behavior.  

4.  Mention three types of automated tests.

unit tests - test a single piece of functionality.

integrated test - test the interactions between pieces of functionality

component tests - used with frameworks like React and cue to test the appearance and functionality of a component, i.e. does it render as expected. 