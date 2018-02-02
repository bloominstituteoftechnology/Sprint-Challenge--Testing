### Sprint Challenge | Testing: Answers.md


##Q1
----
#####
1a. In Mocha, what are the differences between `before`, `after`, `beforeEach`, and `afterEach`? 

I feel like I answered this below

#####
1b. When do they run?

* `before` is run once before all the tests in a describe.
* `after` is run once after all the tests in a describe.
* `beforeEach` is run before _each_ test in a describe.
* `afterEach` is run after _each_ test.

#####
1c. What are they used for?

* `before` is used to take control from the original methods.
* This can be useful to separate code that is common to all of the tests in the describe statement.
* This can be used to clean up the side effects of the tests.
* `after` is used to give control back to the original methods.

##Q2
----
##### 
1a. What is the point of test driven development?

To write a failing test case first, followed by adding just enough code to their application to make the test pass, but no more than that. Then as soon as the test passes, you write a new failing test and repeat the cycle.

Two-fold advantage: 1.) By always writing a test first, the developer guarantees their code will always be completely covered by tests. 2.) The TDD style naturally forces developers to write their code in a testable fashion, which forces the hand to write in more beneficial short functions instead of one long one. 

##Q3
----
##### 
3a. What is the `spy` in `sinon`? 

I'm pretty sure it's a way of mocking the data so that we don't have to use the actual database, but I'll want to fix this on draft002.

#####
3b. How do we use it to effectively test a callback?

Awaiting draft002

##Close
----
###### changelog
* 02-Feb-2018 Question Answers draft # 001

----
###### I built this using:
* [clickity]
(http://markdownlivepreview.com)
