## Questions - Self Study - You can exercise your Google-Fu for this and any other Sprint Challenge in the future.
1. In Mocha, what are the differences between before after beforeEach afterEach? When do they run? What are they used for?

+ before
    + Before is run one time per describe() statement
    + Before is used to set the stage for your testing. In instances where tests are only reading data and not modifying it, it might create an object to test. In our case this week, we used Before to create our mock connection to the database in order to perform our tests
+ after
    + After is run once after all the describe statements are completed
    + After is used to reset after completing tests. In our case this week we disconnected from our mock database connection. It could also be used to clear out any data types that were created for the sole purpose of testing 
+ beforeEach
    + BeforeEach is run once before each it() statement. Note that if there are parent and child beforeEach statements, the parent will be performed first and then the child
    + This is used to perform a task that needs to be done before every test. For example, if tests are modifying the data that we are testing, it is wise to start each test with fresh, unaltered data. This ensures that you know exactly what you are testing on and that you don't need one test to be done correctly before the next is able to test
+ afterEach
    + After each runs once per it() statement, after it is finished. Again, note that parent afterEach commands will be run after child commands [ parent beforeEach, child beforeEach, child test, child afterEach, parent afterEach]
    + AfterEach is used to clear out or reset any data types that may have been modified during the testing process

2. What is the point of Test Driven Development? What do you personally think about this approach?

+ Test Driven Development
    + what is the point
    + what are my thought about this approach


3. What is a spy in sinon? How do we use it to effectively test a callback?

+ Sinon Spy - 
    + what it is
    + how it tests a callback
+ Sinon Stub
    + what it is
    + how it effectively tests a callback
