
const express = require('express'),
    bodyParser = require('body-parser');

const check = require('./checker.js');

const app = express();
app.use(bodyParser.json());


app.set('port', (process.env.PORT || 5000));

// a useless function that returns a fixed object. you can use it, if you want, for testing purposes
app.get('/count',function (req, res) {
    res.json({count: 5})
})


app.post('/check', (req, res) => {
    var url = req.body.url;
    var invocationParameters = req.body.invocationParameters;
    var expectedResultData = req.body.expectedResultData;
    var expectedResultStatus = req.body.expectedResultStatus;

    var response = {};

    check(url, invocationParameters, expectedResultData, expectedResultStatus).then((response) => {
        console.log('Response: ');
        console.log(response);

        res.send(response);
        res.end();
    });
});

app.listen(app.get('port'), function() {
    console.log('Node app is running on port', app.get('port'));
});
