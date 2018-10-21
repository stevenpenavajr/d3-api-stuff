const express = require('express')
const bodyParser = require('body-parser')
const fs = require('fs')
const app = express()
const path = require('path')
app.use(express.static(path.join(__dirname + 'public')));

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
// allows Cross Origin Requests to obtain JSON data
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use("/api/js", express.static(path.join(__dirname,'public/js/')))
//Store all HTML files in view folder.
// app.use(express.static(path.join(__dirname + '/js')));
app.get('/api/c1', (req,res) => {
  res.sendFile('./public/index.html', { root: __dirname })
});
app.get('/api/c2', (req,res) => {
  res.sendFile('./public/index2.html', { root: __dirname });
});

app.listen(3000, () => console.log('Server running on port 3000'))
