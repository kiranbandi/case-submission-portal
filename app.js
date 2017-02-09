var express = require('express');
var bodyParser = require('body-parser');
// File I/O is provided by simple wrappers around standard 
// POSIX functions by this fs package 
var fs = require("fs");

var app = express();

//body parser used to extract params sent from client side
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

//For hosting our static html assets at the root path
app.use('/', express.static(__dirname + '/source'));


//This API returns the entire list of all case records
app.get('/getCaseList', function(req, res) {
    fs.readFile(__dirname + "/" + "data.json", 'utf8', function(err, data) {
        if(err) {
         console.log(err);
         res.status(500).send('');
        }
        else {
          res.end(data);  
        } 
    });
});

//This API modifies the case list json based on the flag and caseData params
app.post('/updateCaseList', function(req, res) {
    fs.readFile(__dirname + "/" + "data.json", 'utf8', function(err, data) {
        
    if(err) {
         console.log(err);
         res.status(500).send('');
    }
    
    else {
        
        var tempData = JSON.parse(data);
        // add new case to case list
        if (req.body.flag == 1) {
            tempData.push(req.body.caseData);
        }
        // edit existing case in case list
        else if (req.body.flag == 2)
        {
            tempData[req.body.index] = req.body.caseData;
        }
        // delete case from case list
        else if (req.body.flag == 3) {
            tempData.splice(req.body.index, 1);
        }
        else {
            console.log("Void Request");
        }

        fs.writeFile(__dirname + "/" + "data.json", JSON.stringify(tempData), 'utf8', function(err) {
            if (err) console.log(err);
        });
        res.end(JSON.stringify(tempData));
    }

    });
})

var server = app.listen(8080, function() {
    var host = server.address().address
    var port = server.address().port
    console.log("Case Submission Portal Live at http://%s:%s", host, port)
})
