1.  In mocha before, after, beforeEach, and afterEach are hooks that are ran at different times during the tests. Before is ran before even the first it/describe is ran, and after is ran after all of them have been ran. beforeEach and afterEach work the same way, but are different in the sense that they ran before and after each it/describe respectively.

The point of using before and after is to allow you to connect to a database for testing, and then closing it after each complete test suite. Again before is ran before the first it/describe is ran, and after is ran after the last one has been ran. beforeEach and afterEach on the other hand are great for mocking mock data. You could create an object, or an array and fill it with data before each it/describe, and then use afterEach to "clear" it out, as to have a clean slate to work with on the next it/describe. This allows you to control what data you are testing for and to write good tests.

2.  Test Drive Development exists so that you can write code with less bugs. By thinking about what you need to test for, you can write tests pertaining to that, then write code that pass the tests. Once the test is passing then you can move on and either a) write more tests b) add onto your code to make sure it is still passing, and then c) (which will probably happen always) refactor your code, while confirming that it is still passing tests.

Honestly I find this process monotonous and time consuming, but I think the reasoning behind it. It's probably my least favorite thing to do thus far, but it does get you into thinking about what type of code you need to write, and helps to make sure you are getting the poper data that you want your code to return.

3.  A spy is a function that records arguments, return values, any errors, and other data such as the amount of times ran.

In order to effectively use a spy you first assign it to a variable, then you pass it as an arguement along with your data to the function you are testing. You can then test the spy for any data that you expect, number of times called, or if you get an error. By testing the spy against the expected results, you can write a good test.
