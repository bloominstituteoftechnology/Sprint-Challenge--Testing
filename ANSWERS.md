<!-- Answers to the Short Answer Essay Questions go here -->

1. In Mocha, what are the differences between `before`, `after`, `beforeEach`, and `afterEach`? When do they run? What are they used for?
- ```Mocha``` provides these hooks to be used as precondition setups and cleanups for tests. ```Hooks``` will run in the order they're defined and may be ```sync``` or ```async```. <mark>before()</mark> runs <i>once</i> and <u>before all</u> tests in the block. <mark>after()</mark> runs <u>after all</u> tests in the block. <mark>beforeEach()</mark> runs <u>before each</u> test in the block. <mark>afterEach()</mark> runs <u> after each</u> test in the block.

2. What is the point of Test Driven Development? What do you personally think about this approach
- ```TDD``` is a programming approach that encourages <i>developers</i> to write <u>tests</u> of their code, <i>way before</i> actually writing the code itself. You're basically writing an instruction manual for your application. The <u>goal</u> is to catch any errors before making the software available. I personally like this approach (once I actually get the hang of it). It gives you an opportunity to provide a detailed roadmap for what the ideal version of your code is suppose to be.

3. What is a `spy` in `sinon`? How do we use it to effectively test a `callback`?
- A ```Spy``` in sinonJS is a function that records ```arguments```, return ```values```, the value of ```this``` and ```exceptions``` thrown for all its calls. There are two types of spies: anonymous functions and ones that are wrapped in methods that already exist in the system under a test. To effectively test a callback an anonymous function spy is used to record information by assigning the callback with a  spy and calling it within the test.
