1.  In Mocha, what are the differences between `before` `after` `beforeEach` `afterEach`? When do they run? What are they used for?

My understanding is that `before` runs before everything is executed and vice versa with `after`.

`beforeEach` and `afterEach` happen in between the `before` and `after` statements. After a `describe` is used `beforeEach` runs. After the `describe` block completes `afterEach` runs.

1.  What is the point of Test Driven Development? What do you personally think about this approach?

Test Driven Development or TDD helps define the specifications of the project prior to writing any functional code. It allows the developer to lay the ground work of the design and the requirements of said design. Personally, I have enjoyed these sprints. Although, from an efficiency perspective it is an enormous amount of extra work. It has it's pros and it's cons. For large scale projects with large teams of developers it is a necessity. As it protects code written between developers and allows each member of a team to understand what a feature is accomplishing.

1.  What is a `spy` in `sinon`? How do we use it to effectively test a `callback`?

A `spy` is simply a function that keeps track of things like arguements, return value, `this` and errors for all of it's calls. There are anonymous functions and wrapped methods. There are multiple ways to test a `callback` with `spy` a few of them are -> `spy.callCount`, `spy.calledOnce`(Twice/Thrice), `spy.firstCall`, and `spy.lastCall`
