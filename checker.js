
const fetch = require('node-fetch')

function check(url, invocationParameters,  expectedResultData, expectedResultStatus) {

    const checkResult = { // this is the object you need to set and return
        urlChecked: url,
        resultData: null,
        resultStatus: null,
        statusTestPassed: null,
        resultDataAsExpected: null
    }

var par = '?';

    for (var i = 0; i < Object.keys(invocationParameters).length; i++) {
        if (i > 0) {
            par = par.concat('&');
        }

        var key = Object.keys(invocationParameters)[i];
        var value = invocationParameters[key];
        par = par.concat(key + '=' + value);
    }

    url = url.concat(par);

    return fetch(url).then((res) => {
        return res.json().then((data) => {
            checkResult.resultData = data;
            checkResult.resultStatus = res.status;
            checkResult.statusTestPassed = compareResults(expectedResultStatus, checkResult.resultStatus);
            checkResult.resultDataAsExpected = compareResults(expectedResultData, checkResult.resultData);
            
            return checkResult;
        });
    });

}


// funzione che confronta due oggetti semplici e verifica se actual contiene tutti gli attributi di expected, e se per
// questi ha gli stessi valori
function compareResults(expected, actual) {
    if (!expected) return true //always ok if there are no expectations
    if (!actual) return false
    for (let e of Object.keys(expected)) {
        if (actual[e]===undefined || expected[e]!=actual[e]  ) return false
    }
    return true
}

module.exports = check
