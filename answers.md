1. In Mocha, what are the differences between before after beforeEach afterEach? When do they run? What are they used for?

*Answer* before, after, beforeEach, and afterEach are _hooks_ - which are functions that are designed to set up preconditions and assist in pinpointing errors in tests. 

_*before*_ is run one time before all tests within a `describe`  
_*after*_  is run one time after all the tests in a `describe`.  
_*beforeEach*_ is run multiple times, before each test in a `describe`.  
*_afterEach_* is run multiple times, after each test in a `describe`.

2. What is the point of Test Driven Development? What do you personally think about this approach?

*Answer*
The point of _test-driven development (TDD)_* is to create software by first designing and creating a failing unit test. The development team then writes code to satisfy the test and create a passing environment. The code is then refactored and improved without changing its behavior. Alternate development methods include acceptance-test-driven development (ATDD) and behavior-driven-development (BDD).

I personally prefer TDD to alternatives because it tends to create a useful MVP faster, as problems are discovered and mitigated earlier in the development process -  tests are conducted from the very beginning of the design cycle. Ultimately, time and money spent in debugging at later stages is minimized.

3. What is a spy in sinon? How do we use it to effectively test a callback?

*Answer*
sinon uses something referred to as *test doubles* to stabilize functions that have side effects and to make tests easier to write. There are three types of test doubles - *spies*, *stubs*, and *mocks*. Spcifically, *_spies_* are used to get information about function calls. If a developer wishes to varify that something has or hasn't happened in the code (for example, how many times a function was called, or what arguments were passed to the function), a spy is a good choice.
