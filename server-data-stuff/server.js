const express = require('express')
const bodyParser = require('body-parser')
const fs = require('fs')
const app = express()


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

app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));
// allows Cross Origin Requests to obtain JSON data
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get("/", (req,res) => {
  res.sendfile(__dirname + '/public/index.html');
})

app.listen(3000, () => console.log('Server running on port 3000'))
