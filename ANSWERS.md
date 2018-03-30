<!-- Answers to the Short Answer Essay Questions go here -->

1. In Mocha, what are the differences between `before`, `after`, `beforeEach`, and `afterEach`? When do they run? What are they used for?

`before` is called before the entire set of describe funtions, and can be used to connect a database, or run a function before the al of the describe tests

`after` is called after all the describes are done

`beforeEach` happens before each single test, and can be usedto create data to test your environment

`afterEach` happens after each test has completed, and can use it to remove the data that was created, so it doesnt persist through all the tests and skew your data

2. What is the point of Test Driven Development? What do you personally think about this approach?

- It is the process of developing tests for your code before actaually creating your code. I can definitely see the benefit from it on larger scale projets, but think it would be tedious on smaller projects

3. What is a `spy` in `sinon`? How do we use it to effectively test a `callback`?

- A spy is a function that can be used to test how functions handle callback functions. A way we used it was to find out the amount of times a function called its callback function and tested that to make sure it was the correct amount
