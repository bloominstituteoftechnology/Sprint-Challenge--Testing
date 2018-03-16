# Self Study: Testing

#### 1. In Mocha, what are the differences between before  after  beforeEach  afterEach? When do they run? What are they used for?
* ```before() and after()``` run __once__ before all the tests in a describe run, and after all the tests in a describe run respectively.
* ```beforeEach and afterEach()``` will run before and after __each__ test is run.
* Hooks are used to set up conditions for your various tests, before they run, and also clean up dummy data afterwards so each test can be run in isolation if necessary.

#### 2.  What is the point of Test Driven Development? What do you personally think about this approach?
* TDD's point is to facilitate the writing of clean, and maintainable code. I personally think this approach can be useful given the right situation or project.


#### 3. What is a spy in sinon? How do we use it to effectively test a callback?
* A spy in Sinon is a function that monitors arguments, return values, and the value of this. You can use Sinon assertions to test various aspects of a callback and it's behavior.


