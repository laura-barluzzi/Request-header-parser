var express = require('express');
var app = express();

function getLanguage(acceptLanguage) {
    var list = acceptLanguage.split(",");
    return list[0];
}

function getSoftware(userAgent) {
    var regExp = /\(([^)]+)\)/;
    var matches = regExp.exec(userAgent);
    return matches[1];
}

function createResult(ip, language, software) {
    return {"ipaddress": ip,
            "language": language,
            "software": software};
}

app.get('/', function (req, res) {
    var ipaddress = req.headers["x-forwarded-for"];
    var language = getLanguage(req.headers["accept-language"]);
    var software = getSoftware(req.headers["user-agent"]);
    var result = createResult(ipaddress, language, software); 
    res.send(JSON.stringify(result));
});

app.listen(8080, function () {
    console.log('Example app listening on port 8080!');
});