
const express = require('express'),
    bodyParser = require('body-parser');

const check = require('./checker.js');

const app = express();
app.use(bodyParser.json());


app.set('port', (process.env.PORT || 7000));

// a useless function that returns a fixed object. you can use it, if you want, for testing purposes
app.get('/count',function (req, res) {
    res.json({count: 5})
})


app.post('/check', (req, res) => {
    var url = req.body.url;
    var invocationParameters = req.body.invocationParameters;
    var expectedResultData = req.body.expectedResultData;
    var expectedResultStatus = req.body.expectedResultStatus;

    var resp = {};

    check(url, invocationParameters, expectedResultData, expectedResultStatus).then((response) => {
        console.log('response: ');
        console.log(resp);

        res.send(resp);
        res.end();
    });
});

app.listen(app.get('port'), function() {
    console.log('Run on port', app.get('port'));
});
