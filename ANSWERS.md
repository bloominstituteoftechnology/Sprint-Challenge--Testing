<!-- Answers to the Short Answer Essay Questions go here -->

1. In Mocha, what are the differences between `before`, `after`, `beforeEach`, and `afterEach`? When do they run? What are they used for?

* These four methods are all are hooks that the Mocha framework provides. 'before' runs before the execution of every describe block, and 'after' runs after each block. 'beforeEach' and 'afterEach' run before and after each test within their scope. The 'beforeEach' will run after the before that sits above it, and the 'afterEach' before the 'after' that sits after it. They are used to set up conditions for a test, and provide for "cleaning up" after a test or tests. The interesting note is that in sublevels of a describe block, the parent 'beforeEach' and 'afterEach' will run before any 'beforeEach' and 'afterEach' directly in the sublevel, as their execution is necessary for the tests to be in the conditions intended, as each action of ancestors has a bearing on sublevels.

2. What is the point of Test Driven Development? What do you personally think about this approach?

* Test Driven Development is intended to facilitate short cycle in development that keeps the process focused on the sole goal of passing the tests which were written before the code. In some circumstances, I personally see the value of this implementation, as it allows for a theoretically streamlined and repetitious aspect of the development cycle. However, on medium and smaller levels, in terms of the scope of a project, I feel that this approach is better to be left out, and if testing is to occur, it should be after the production of the code, as TDD can lead to a very arduous process.

3. What is a `spy` in `sinon`? How do we use it to effectively test a `callback`?

* A spy in sinon is an object that serves as a wrapper for existing methods. It is useful bc it records it's interaction with other parts of the software. We use it to test callbacks by creating a spy to place in the callback during testing, and by creating/using the spy as an anonymous function (if the behavior of the callback itself isn't being examined), we can see information about each call.