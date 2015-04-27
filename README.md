JS Speed Test
=============

A rudimentary method of testing a user's rough connection speed using javascript. The returned value is in Kbps, however it's not very accurate, it's more of a rough idea, as it does not consider network latency.

This is a very basic tool as it's very light (minified 2Kb). SpeedTest also features caching, where results are cached for a certain length of time. On slow connections the value is cached for longer, on faster connections the value is cached for less time. This means that tests aren't run often when a user has a poor connection (i.e. 2G), saving bandwidth, but if a user has a good connection (e.g. 4G or Fiber), the tests are run more often, incase the user shifts connection from say Wifi to 2G, giving you an up to date value sooner, meaning your website or app can adapt its content earlier.

##[Demo](http://bameyrick.github.io/JS-Speed-Test/)
You can use network conditioning in Chrome Dev Tools to try different speeds and see what values are returned.

---
##Usage

##### Getting and Setting Options
At the moment there is only two options, they are "maxTime" and "baseUrl". MaxTime will force SpeedTest to finish testing and return its best value after a certain length of time (in milliseconds). SpeedTest may finish the whole test before this time but this is a sure fire way that you get a value returned within a specified timeframe. Default maxTime is 2000.
BaseURL is a reference to where the test images are located.

###### Getting Options
```javascript
SpeedTest.Options();
```
###### Setting Options
```javascript
SpeedTest.Options({
    maxTime: 3000,
    baseUrl : "/img/speed-test/"
});
```

#####Callback
You can specify your own function to be called upon completion of the speed test.


### Example Call

SpeedTest.CheckSpeed(callback, override);

The override boolean is optional, but if set to true it forces SpeedTest to run a new test, rather than returning a cached value (if the cached value has not yet expired).

```javascript

SpeedTest.CheckSpeed(function(s){
    alert("Your speed is: " + s + "Kbps");
})

```
