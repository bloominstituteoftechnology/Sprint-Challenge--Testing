# Please answer the following questions

1.  In Jest, what are the differences between `describe()` and `it()` globals, and what are good uses for them? <br>

    Describe creates a block that groups together several related tests in one "test suite". This enables us to organize our tests into groups and create a "test hierarchy" if we wish. <br>
    
    it() is an alias of test(). The it() global is commonly used in BDD to state imperative claims about what code "should" do. <br><br>

2.  What is the point of `Test Driven Development`? What do you think about this approach? <br>

    In TDD, we write production code only after we write the tests for that code. By doing this, we can prevent unintended behavior from the beginning. <br>

    I think it's probably good practice to do TDD, but I despise testing, so I'm hoping to avoid it where I can. <br><br>

3.  What are `mocks`? What are a good use cases for them? <br>
    A mock simulates the behavior of a real object. Mocks are used in cases in which the real objects are impractical to incorporate into the unit test. (There was 0 coverage of this topic this week, very weird to see it here.)
    <br><br>

4.  Mention three types of automated tests. <br>
    * Unit Tests
    * Component Tests
    * Integration Tests