1. In Mocha, what are the differences between before after beforeEach afterEach? When do they run? What are they used for?

Before and after run before and after, respectively, the entire suite of tests whereas beforeEach and afterEach run between each individual test. These are called hooks and set up preconditions or cleanup after test code is run. 

2. What is the point of Test Driven Development? What do you personally think about this approach?

Test Driven Development allows for more careful implementation of new features in code before beginning the coding itself, and therefore working in smaller blocks and having a more mindful approach to functionality. I think the idea behind this approach is amazing, and allows for baby steps when working with an established product that has more to lose by implementing something too quickly or that is too complex and needs refactoring. When working on my own, I tend to think in the opposite way making a feature and then testing it. 

3. What is a spy in sinon? How do we use it to effectively test a callback?

A spy is a function that records things like arguments, returned values, value of 'this', and a few other things. It can test a callback by passing the callback through the spy, which will then watch that function. We can then use assertion method of choice to check the recordings of the spy, therefore testing the callback.  