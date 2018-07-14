<!-- Answers to the Short Answer Essay Questions go here -->


1. In Jest, what are the differences between beforeAll, afterAll, beforeEach, and afterEach? When do they run? What are they used for?

Before Each/After Each = these are functions that are called before each spec/it statement in a set of code. The Before All/After All are called only once during a test run - before the test run and after the test run. It's a great way to setup/tear down your test base so that you can see where errors are in your production code. 

1. What is the point of Test Driven Development? What do you personally think about this approach?

Test Driven Development is of the philosophy of writing tests firsts - and then write the code that will make those tests pass. It results in very functional and lean code that does exactly what it needs to do and nothing more. 

I think it's great for a more experienced developer who has traveled some distance in the development industry...for me, as a novice...I need to build first and then build the tests...starting with red stresses me out. 
1. What is a mock function? How do we use it to test a callback passed to a function?

=== it's used to mock what a real function does in a production situation to test code 

```type: js

    describe("callbacks", ()=> {
        it("should be called once in a function", ()=> {
            const cb = jest.fn();
            expect(cb).toHaveBeenCalled(1);
        })
    });

```

1. Mention three types of tests.
- Unit Testing
- React Testing 
- Server Testing

1. What type of test performs database operations against a real server.
- Supertest/Superagent testing
