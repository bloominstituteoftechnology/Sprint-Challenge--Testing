1. In Mocha, what are the differences between `before` `after` `beforeEach` `afterEach`? When do they run? What are they used for?
`beforeEach` `afterEach` execute before every it statement
`before` `after` keep alive for whole testing suite
1. What is a `spy` in `sinon`? How do we use it to effectively test a `callback`?
Spy acts as a dummy callback and gets inserted in the tested cb function. It keeps track of the counts the tested callback is called and with what parameters it is called. It logs the data in console so we can track the anomalies
1. What is the point of Test Driven Development? What do you personally think about this approach?
TDD
* When tests are written before you write production code.
* You keep raefactoring your production code with increased number of cases
I love it on server side. Testing different types of errors on server side becomes messy. Using testing makes the process much more painful.