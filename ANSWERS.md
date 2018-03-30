<!-- Answers to the Short Answer Essay Questions go here -->

1. In Mocha, what are the differences between `before`, `after`, `beforeEach`, and `afterEach`? When do they run? What are they used for?

# before - runs once before all tests
# after - runs once after all tests
# beforeEach - runs before each test
# afterEach - runs after each test

2. What is the point of Test Driven Development? What do you personally think about this approach?

# TTD is to make code in a big/complex project such that if someone else were to break it, running through the tests could easily pinpoint which system has broke. Personally, I think that for small projects/dev the use of console.log() is more beneficial since they usually pinpoint issues and do it in realtime.

3. What is a `spy` in `sinon`? How do we use it to effectively test a `callback`?

# A function that saves argument data and gives back a value. It is used to get data about function calls and to test functions/ function methods in general. 
