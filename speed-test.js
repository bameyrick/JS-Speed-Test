
function speedTest(file, overide, callback) {
    if (document.cookie.indexOf("connectionspeed") == -1 || overide) {
        checkSpeed(file, function (s) {
            callback(s)
        });
    } else {

        callback(getCookie("connectionspeed"));
    } 
}

function checkSpeed(file, callback){
	var st, et;
	var dl = new XMLHttpRequest();

	
	st = (new Date()).getTime();

	dl.onload = function(e){
		et = (new Date()).getTime();
		var d = (et - st) / 1000;
		s = ((e.loaded / d) / 131072).toFixed(2);
		setCookie(s);
		callback(s)
	} 
	
	/* add the link to your file */
	dl.open("GET", file + "?"  + st, true);
	dl.send();	
}

function setCookie(s){
	var expiry = new Date();
	var expires = expiry.getTime();
	
	if(s <= .75){
		/* expires in 2 mins */
		expires += 120000
	}else if(s > .75 && s <= 1){
		/* expires in 30 secs */
	    expires += 30000
	}else if(s > 1 && s <= 1.5){
		/* expires in 10 secs */
		expires += 10000
	}else if(s > 1.5 && s <= 10){
		/* expires in 5 secs */
		expires += 5000
	}else if(s > 10){
		/* expires in 1 sec */
		expires += 1000
	}
	
	expiry.setTime(expires);
	document.cookie = "connectionspeed="+s+";expires=" + expiry.toGMTString();
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