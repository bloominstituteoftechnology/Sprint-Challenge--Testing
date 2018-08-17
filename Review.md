# Please answer the following questions

1.  In Jest, what are the differences between `describe()` and `it()` globals, and what are good uses for them?

    describe() is used to group tests and it() tests an individual piece of code (a unit). describe() can be used to test a component and it() can test pieces of that component

2.  What is the point of `Test Driven Development`? What do you think about this approach?

    TDD is to ensure that you can prevent bugs before they arise and so that you can have a clearer understanding of how your code works. It gives you confidence that it will work exactly the same way given a set of rules. 

    In my opinion, its great if your goal is to write stable software that many people will be collaborating on, for things that you want to scale. For quick hacks and prototypes, it may be a hindrance to rapid prototyping. I need to experiment with my workflow. 

3.  What are `mocks`? What are a good use case for them?

    Mocks are ways to create dummy data so you can test your code without having
to deploy it and gather real world data. You can create a fake user object and test your functions to make sure they interact with that object appropriately. 

4.  Mention three types of tests.

    end-to-end testing (full-stack)
    unit testing
    integration testing
