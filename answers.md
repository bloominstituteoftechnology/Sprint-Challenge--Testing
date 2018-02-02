# In Mocha, what are the differences between: before, after, beforeEach, and afterEach?
With its default “BDD”-style interface, Mocha provides the hooks before(), after(), beforeEach(), and afterEach(). These should be used to set up preconditions and clean up after your tests.

# When do they run? 
Tests can appear before, after, or interspersed with your hooks. Hooks will run in the order they are defined, as appropriate; all before() hooks run (once), then any beforeEach() hooks, tests, any afterEach() hooks, and finally after() hooks (once).
# What are they used for?
Any hook can be invoked with an optional description, making it easier to pinpoint errors in your tests. If a hook is given a named function, that name will be used if no description is supplied.
# What is the point of Test Driven Development? 
Test-driven development (TDD) is a software development process that relies on the repetition of a very short development cycle: Requirements are turned into very specific test cases, then the software is improved to pass the new tests, only. 
TDD encourages simple designs and inspires confidence.

# What do you personally think about the TDD approach?
Personally, I see the importance of writing tests.. in fact I kind of wish this was touched on a long time ago, perhaps I wouldn't of been SO OVERWHELMED with reading tests in the past if I knew how to write them or the purpose of them from the start. 
# What is a spy in sinon? 
they watch your functions and report back on how they are called.
# How do we use spy in sinon to effectively test a callback?
I first setup that I want to spy on something. Then I call my subject under test (src code). Then I verify with the spy what was actually called and stop spying.