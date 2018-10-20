const express = require('express')
const bodyParser = require('body-parser')
const fs = require('fs')
const app = express()
app.use(bodyParser.json());

function writeJSONFile(path, data, callback){
  fs.writeFile(path,data, utf8, (err) => {
    if (err) throw err
  })
}

function readJSONFile(filename, callback) {
  fs.readFile(filename, function (err, data) {
    if(err) {
      callback(err);
      return;
    }
    try {
      callback(null, JSON.parse(data));
    } catch(exception) {
      callback(exception);
    }
  });
}

// allows Cross Origin Requests to obtain JSON data
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// allows requesting of ./data/alumni.json file
app.get('/api/datad', (req,res, next) => {
  readJSONFile('./data/data_2007_corrected.json', function (err, json) {
    if(err) { throw err; }
    res.send(json)
  });
});
app.listen(3000, () => console.log('Server running on port 3000'))
