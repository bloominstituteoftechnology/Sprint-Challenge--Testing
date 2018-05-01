<!-- Answers to the Short Answer Essay Questions go here -->

1.  In Mocha, what are the differences between `before`, `after`, `beforeEach`, and `afterEach`? When do they run? What are they used for?

* To my knowledge, `before` and `after` are ran _before_ and _after_ **ALL** the tests, respectively. `beforeEach` and `afterEach` follow similar logic, where they run _before_ and _after_ each **INNER** `describe` statement.

2.  What is the point of Test Driven Development? What do you personally think about this approach?

* Test Driven Developement relies on the repetition of a very short development cycle - tl;dr it sets strict guidelines for additions/improvements to software. If the improvements pass the test, they are pushed forwards.

* Personal opinion on this, I like it, but I find it hard to realize in terms of web design. I can see it's uses, for the addition of new pages, the testing of components before you actually launch, making sure data that is passed from the front-end is handled correctly in the back-end, etc. Servers/Databases having tests I feel is almost necessity, as it almost removes the need for having Postman entirely. Rather than sending mock data to the server and testing it based off a real scenario, I can simply run a test and have it check all the possible outcomes and adjust accordingly. I find that fasincating and incredibly useful.

3.  What is a `spy` in `sinon`? How do we use it to effectively test a `callback`?

* A spy is a function that records arguments and returns the value - basically a less-intrusive `console.log`.

* Effectively testing a callback, that I'm unsure of. I'd like to spend more time google searching for it, but for now I'm going to skip and come back to it!
