 Please answer the following questions

1.  In Jest, what are the differences between `describe()` and `it()` globals, and what are good uses for them?
2.  What is the point of `Test Driven Development`? What do you think about this approach?
3.  Mention three types of automated tests.

## Answers

1.  `describe()` identifies the major category, item, theme, component, or category that is being tested.  It is used in order to set up sections of tests that pertain to one particular thing, in which that thing could be a function, a component, a general block of code, a feature, and so on.  In simple terms, it identifies "what" is being tested.  `it()` on the other hand identfies not what is being tested but rather the expectations and outcomes of the test itself.  One could reason that it is a formal statement of what the test actually is and instead of indicating what is being tested, it provides what you would expect the item being tested to do, such as being rendered, returning a certain value, being defined, or being executed with a particular argument.  The best way to see their difference, really, is via an example:

```javascript
    describe('Class Methods', () => { 
        describe('addTwo()', () => {
            it('should be defined', () => {
                /* expect statement ... */
            })
            it('should add two numbers', () => {
                /* ... expect ... */
            })
        })
    })

```

2.  TDD essentially is a reverse-design process in which you write tests, intentially break them - make them fail, or make them red, and then figure out how to fix them and make them green.  From this process, the tests then are completed and server as a guide for writing the actual code of the application which should flow and follow the passing tests that were written prior to it.  Overall, I think the approach would be useful in a number of contexts and conditions; however, perhaps depending on certain factors involving what is being developed it may not be as practical or efficacious.  However, for the contexts and situations it would suit well, this reverse design process is quite powerful.  Relating to something I have previous experience with, in education, the process of designing the test first and then creating instruction from that is similar in approach and worked very well in the contexts for which it was suited.  I can see how this could be similar as it is applied to application and software development. 

3.  Three types of automated testing are:
        a.  integration testing - testing components and how they integrate and function together
        b.  functional testing - testing for output and testing for returned behavior 
        c.  end to end testing - API / Database testing and how they interact