JS Speed Test
=============

A rudimentary method of testing a user's rough connection speed using javascript.
##[Demo](http://bameyrick.co.uk/demos/js-speed-test/index.html)
IMPORTANT! Do not use the script file from the demo folder, it has extra guff in there for the demo. Use the [speed-test.min.js](speed-test.min.js) file from the root.

---
##Usage

This is a very basic tool as it's very light (minified 790 bytes). Despite this the script has a few useful features:


#####Set your own download file 
Depending on your accuracy / speed requirements you can specify your own download file to test with.

##### Cache result in cookies
You can select whether you want to cache test results in a cookie. This is very useful for slow connections where tests take a long time. The script sets an appropriate expiration time depending on the detected speed (slow = long expiration, fast = short expiration). If the cookie exists the script will return the cached value, once the cookie expires it will test again.

#####Callback
You can specify your own function to be called upon completion of the speed test.



### Example

speedTest(file (string), cookies (boolean), callback (function))

```javascript

speedTest('/img/dl.jpg', true, function(speed){
    alert("Your connection speed is " + speed + "mbps");
});

```
