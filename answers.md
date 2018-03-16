1.  In Mocha, what are the differences between `before` `after` `beforeEach` `afterEach`? When do they run? What are they used for?

    * "beforeEach" and "afterEach" hooks run during each test block, but as many times as they are called; in order beforeEach() hook, test, afterEach().
    * "before" and "after" hooks run before/after each test in a block, but only once

1.  What is the point of Test Driven Development? What do you personally think about this approach?

    * Test Driven Development (TDD) is the act of creating a test and then writing the code and adjusting it for fit before elaborating and adding more to it. In my... short experience writing test, I find this method a lot easier. I can test that my, for example, my API is actually doing the essentials before adding the extras later without worrying about the code breaking, well, less anyway... I mean, if it's still passing the test, we're good in theory...

1.  What is a `spy` in `sinon`? How do we use it to effectively test a `callback`?
    * Spy is cool. it acts as a dummy callback and gets tested in the callback function. It does whatever the job of the callback is and logs it to the console for out viewing pleasure.
