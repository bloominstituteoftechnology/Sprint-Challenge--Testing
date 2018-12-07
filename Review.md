# Please answer the following questions

1.  In Jest, what are the differences between `describe()` and `it()` globals, and what are good uses for them?

-`describe()` groups tests together (however you want them grouped) and allows for the setup of conditions that apply to a block of tests, while `it()` creates a specific test.

2.  What is the point of `Test Driven Development`? What do you think about this approach?

-TDD makes sure that there is a clear understanding of what the application is supposed to do (down to the pieces/units) from the start. (as opposed to building the app first and then testing it after and seeing what it does, the testing drives how to code the app in the first place) 
-It also lets us change things in the app and get immediate feedback if we have broken something.
-I like TDD. It speeds up a lot of things (like setting up an API) that would typically require manual tests, and I enjoy having to lay out clear expectations before I begin.

3.  Mention three types of automated tests.

Unit tests: testing functions;
Snapshot tests: creating a record of what the thing looks like and checking to see if it has changed;
Integration tests: checking that two or more units work well together. 