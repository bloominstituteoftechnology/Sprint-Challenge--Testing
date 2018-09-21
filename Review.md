# Please answer the following questions

1.  In Jest, what are the differences between `describe()` and `it()` globals, and what are good uses for them?
    describe() is a global that contains it() tests. describe() is great for organizing test suites so that it is more readable for users of the tests.
2.  What is the point of `Test Driven Development`? What do you think about this approach?
    Test Driven Development is a backwards approach to the logic side of web programming. I think that this apprach is great if you know exactaly where you are going with the app and there are clearly defined desired outcomes. A game with explicit rules is a great example of when TDD would be wise to use. If the end result is less defined I would not approach it this way. 
3.  What are `mocks`? What are a good use cases for them?
    'mocks' are basically a sandbox enviornment for testing code that is dependent on imported files. For example you could use a 'mock' database with fake data to test instead of testing with a live database, this would make it quicker. It may use the true import that the live site is using but it doesn't have to. 
4.  Mention three types of automated tests.
    Unit testing - insures that a piece of the code returns as expected, usually with functions
            -component testing - insures comonents behave as expected // because of single unit
    integration testing - back and front end 
            -snapshot testing - insures that the page has not be edited since the last snapshot 
    end-to-end testing == 

    //look into this I got these wrong they are nested