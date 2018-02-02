1. In Mocha, what are the differences between `before` `after` `beforeEach` `afterEach`? When do they run? What are they used for?  
*all four methods are meant to sort of sandbox your testing environment during the time they are invoked.  before / after will deal with a single unit test while the latter two will encompass an entire codeblock*  
1. What is the point of Test Driven Development? What do you personally think about this approach?    
*TDD allows developers to make apps that have less bugs, and have solid functionality by flexing the app through various tests, the end result is much higher confidence from botht the developer as well as any potential users. I think this approach is necessary when creating an extensive app such as an operating system or something that may go into production. It is an essential step in producing a reliable product, which is what determines good from bad.*  
1. What is a `spy` in `sinon`? How do we use it to effectively test a `callback`?  
*a spy in sinon can be used as an anonymous function or to wrap methods that already exist in the system under test.*
