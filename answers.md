1. In Mocha, what are the differences between `before` `after` `beforeEach` `afterEach`? When do they run? What are they used for?

  * These are hooks used to initialize at varous times around the 'describe' function.  Before runs prior to any action in 'describe', beforeEach and afterEach run prior to to and post all describe functions and after is used to connect with the database, process errors, and close out the connection. 

2. What is the point of Test Driven Development? What do you personally think about this approach?

   * Test Driven Development ensures that each section of code has less bugs, as the process of its writing has been backed up and checked by   running it through test development code.   It can also be helpful to ensure that the code is being written in a more uniform fashion      that accords to the tests being written.   
   
    The usefullness of this process seems apparent in certain projects, where large teams are  having  to cooridinate many modules of code and some standardization needs to be written in and checked for bugs constantly. That being said, it would seem prudent for a project to really understand whether or not this is necessary, since the tedium and personal involved will increase the time of the project and its expense. 

3. What is a `spy` in `sinon`? How do we use it to effectively test a `callback`?

  * A spy is set to record certain actions taken in various functions in the code and return data to the programmer about the function, such    as errors, bugs, and amount of times run.   It is set on a variable and then passed into the argument inside the function which is being    tested. 