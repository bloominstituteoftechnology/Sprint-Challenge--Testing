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
    The point of Test Driven Development is to change the way in which code is written, to avoid errors/needs for edits and rewrites/get it right the first time. The way this is done is by changing the order in which code and tests are done. Historically, it was 1. think, 2. write code, 3. write tests for code. TDD pushes the idea of 1. think, 2. write tests, 3. write code. The reason this makes sense is that by writing tests, you are outlining what exactly your code needs to do. This way, when you write your code you have a fleshed out path to take with writing your code.
        + Think about how an author might approach a novel. She could start writing a scene that is in her head, with a decent idea of how the novel will progress. Or she could sit down and outline out exactly how the plot will progress. The character is trapped in the burning factory after the final showdown. The character needs to escape. How will the character escape? Answering those questions early means that when the author goes to write, she already knows what she needs to write---though not specifically how to write it. 
    + I think this is a better way to write code. I think it solves a problem of the fact that step 1 is often ignored altogether. TDD forces a person to think more deeply about what their code will do and how before starting to type out code, because it is impossible to write tests when you have no idea what your end result will look like
    + I think this is hard for my cohort because we were often encouraged not to look at our tests and to write code, then test afterwards. So at this point we are completely changing gears by writing tests first and then writing code to answer it. Likely this is a common way to learn, but I wonder if it is the most effective way to learn


3. What is a spy in sinon? How do we use it to effectively test a callback?

+ Sinon Spy - 
    + what it is
    + how it tests a callback
+ Sinon Stub
    + what it is
    + how it effectively tests a callback
