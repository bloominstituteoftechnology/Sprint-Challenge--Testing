<!-- Answers to the Short Answer Essay Questions go here -->

1. In Mocha, what are the differences between `before`, `after`, `beforeEach`, and `afterEach`? When do they run? What are they used for?
The difference between these hooks are what needs to be done before a certain action takes place and after in the case of before and after, for example before the test for server begins, the before hook can erase what is in the database, 
in the same way, after testing, after hook clears the test enivironment. In the case of beforeeach and aftereach, these can be used to run the callback before the test. 

2. What is the point of Test Driven Development? What do you personally think about this approach?
TDD is where you write the test before writing the functional code. Personally once your code is tested and ready, writing the functinal code a lot more easier, cleaner and save time. 

3. What is a `spy` in `sinon`? How do we use it to effectively test a `callback`?
A spy is function that records arguments, return values, the value of this and exception thrown if any. When passed as a callaback, we will get access to these informations. 