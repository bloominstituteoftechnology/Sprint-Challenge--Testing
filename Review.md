# Please answer the following questions

1.  In Jest, what are the differences between `describe()` and `it()` globals, and what are good uses for them?

"Describe" brakes your tests code into different sections. You pass in two parameters one is a string that will be used to describe what your tests are about, the second is a callback function that executes all the tests related to your describe code block. Once inside "describes" callback function you then can execute an "it" function. An "it" function takes two parameters, the first is a string describing exactly what is being tested and the second is a callback function that runs that specific test. It can be switched out with test as well because they mean the exact same thing when using jest. 

2.  What is the point of `Test Driven Development`? What do you think about this approach?

Test driven development is a concept in which tests themselves drive what code you write for your project. First you must write a test. You must then make your test fails so that you know your test is working. Then you write code to make your test work. This builds confidence in your code knowing it has been tested, helps reduce bugs, and improves time efficacy with scaling. I suppose it could have its drawbacks such as it takes longer to write a test for each thing and also technically does not guarantee 100% that it will prevent bugs. However, it does force the programmer to think about how he or she writes code which can lead to a much leaner and easy to work with code base.  

3.  What are `mocks`? What are a good use cases for them?

When unit testing we can take objects and replace them with mock objects that simulate the behavior of the real objects. We use this when real objects are impractical to add to our unit test such as when they have dependencies. A unit test is ment to test one specific area of code. However, if you have dependencies than you are doing integration testing which isn't unit testing. 

4.  Mention three types of automated tests.

Unit testing, integration testing, web API testing.
