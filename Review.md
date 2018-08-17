# Please answer the following questions

1.  In Jest, what are the differences between `describe()` and `it()` globals, and what are good uses for them?
    The descibe function allows us to group multiple tests in a certain category. The it function usually tests for a specific functionality. For example, if we wanted to test a mathamatical function like add(), then we would use describe() to group all the add() function tests together and use the it() functions to test if the right number of arguments are passed in, does the add() function add the numbers together correctly, and etc.

2.  What is the point of `Test Driven Development`? What do you think about this approach?
    
    Test Driven Development makes the developer plan out how to start designing the application they are going to make. They are like dynamic comments that check whether you are doing what you said you were going to do, documentation that is alive. If you made a function behave differently then the test, you can either restructure your tests or restructure your functions.

3.  What are `mocks`? What are a good use case for them?
    
    Mocks are functions that tests whether the actual function is being called or not. It can also test whether the function has been invoked with the appropriate arguments when inside another function.

4.  Mention three types of tests.

    Snapshot testing is like github, it is useful for checking whether the UI is rendering the correct elements and if you are alright with the current changes. It is useful when your application is a decent size and is stable, if we have a small amount of code then it can be a hinderance because every small change breaks the tests. Unit testing is when we want to test a compartmentalized part of our application. Integration testing is where we test how components work with each other.