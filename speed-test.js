/*
 * JS Speed Test - 1.0.1
 * Ben Meyrick - http://bameyrick.co.uk
 * 
 * Licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 */

(function (SpeedTest) {

    var config = {
        maxTime: 2000
    },

    images = [
	    { name: "NJdf53v.png", size: 11773, timeout: 1400 },
	    { name: "LBb4FWs.png", size: 40836, timeout: 1200 },
	    { name: "EOfOOWU.png", size: 165544, timeout: 1300 },
	    { name: "WSFyzlx.png", size: 382946, timeout: 1500 },
	    { name: "EaDz5qx.jpg", size: 1236278, timeout: 1200 },
        { name: "bQnWhRY.jpg", size: 4511798, timeout: 1200 },
	    { name: "cFCdlwi.jpg", size: 9092136, timeout: 1200 }
	   
    ];

    var timer, limiter, dl;

    SpeedTest.Options = function (options) {
        
        if (options) {

            if (options.maxTime) {
                config.maxTime = options.maxTime;
            }
        }

        return config;
    };

    SpeedTest.CheckSpeed = function (callback, override) {

        if (document.cookie.indexOf("connectionspeed") == -1 || override) {
            checkSpeed(callback);
        } else {
            callback(parseInt(getCookie("connectionspeed")));
        }
    };

    function checkSpeed(callback) {
        var speeds = [],
           i = 0,
           done = false,
           speed;

        function runTest() {
            var image = images[i],
                st, et;

            dl = new XMLHttpRequest();

            st = (new Date()).getTime();

            dl.onload = function (e) {
                et = (new Date()).getTime();
                clearTimeout(timer);

                var d = (et - st) / 1000;

                speeds.push(e.loaded / d);
                i++;

                if (i < 7 && !done) {
                    runTest()
                } else {
                    clearTimeout(limiter);
                    calculate()
                }
            };

            dl.open("GET", "http://i.imgur.com/" + image.name + "?" + st, true);
            dl.send();

            timer = setTimeout(function () {
                dl.abort();
                done = true;
                clearTimeout(limiter);
                calculate()
            }, image.timeout);
        }

        runTest()

        var limiter = setTimeout(function () {
            done = true;
            dl.abort();
            clearTimeout(timer);
            calculate()
        }, config.maxTime);

        function calculate() {
            var sum = 0,
                l = speeds.length;

            for (var i = 0; i < l; i++) {
                sum += speeds[i];
            }

            var speed = Math.round((sum / l) / 125);
            if (callback) {
                callback(speed);
            }
            setCookie(speed);        
        }
    }

    function setCookie(speed) {
        var expiry = new Date();
        var expires = expiry.getTime();

        var speedText = "unknown";

        if (speed <= 250) {
            /* expires in 5 mins */
            expires += 360000
        } else if (speed > 250 && speed <= 450) {
            /* expires in 3 mins */
            expires += 180000
        } else if (speed > 450 && speed <= 750) {
            /* expires in 2 mins */
            expires += 120000
        } else if (speed > 750 && speed <= 1000) {
            /* expires in 1 min */
            expires += 60000
        } else if (speed > 1000 && speed <= 4000) {
            /* expires in 30 secs */
            expires += 30000
        } else if (speed > 4000 && speed <= 10000) {
            /* expires in 15 secs */
            expires += 15000
        } else if (speed > 10000) {
            /* expires in 5 secs */
            expires += 5000
        }

        expiry.setTime(expires);
        document.cookie = "connectionspeed=" + speed + ";expires=" + expiry.toGMTString() + "; path=/";
        
    }

    function getCookie(c_name) {
        if (document.cookie.length > 0) {
            var c_start = document.cookie.indexOf(c_name + "=");
            if (c_start != -1) {
                c_start = c_start + c_name.length + 1;
                var c_end = document.cookie.indexOf(";", c_start);
                if (c_end == -1) {
                    c_end = document.cookie.length;
                }
                return unescape(document.cookie.substring(c_start, c_end));
            }
        }
        return "";
    }

}(window.SpeedTest = window.SpeedTest || {}));