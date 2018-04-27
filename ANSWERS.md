<!-- Answers to the Short Answer Essay Questions go here -->

1.  In Mocha, what are the differences between `before`, `after`, `beforeEach`, and `afterEach`? When do they run? What are they used for?

* Before runs before any test is executed, beforeEach happens prior to each test suite, and after runs after all tests are completed, whereas afterEach runs after each test suite. Before and after are used to create and close the connection to the database, for example. beforeEach and afterEach are used to create and remove mock data that will be used for each test.

2.  What is the point of Test Driven Development? What do you personally think about this approach?

* Test driven development is supposed to force developers to plan and think about their product before coding it. Essentially to make known the expected behaviors of the code, before any coding happens. By knowing the expected outcome, and testing all the edge cases rigorously, the code base is expected to have fewer bugs and defects. I think the approach is valuable if it is universally adopted by a team. It's high overhead at the beginning, but I think it prevents future headaches.

3.  What is a `spy` in `sinon`? How do we use it to effectively test a `callback`?
    A spy is a placeholder function that records information about it's environment. It records how many times it's been called, what values it gets or returns, and any errors thrown. We pass a spy into a callback function and then later access the data on the spy to confirm that it has been called the expected number of times, or with the expected parameters.
