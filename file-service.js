const express = require("express");
const cors = require("cors");
const Path = require("path");
const fs = require("fs");
const formidable = require('formidable');

const HOST = "localhost";
const PORT = "7200";

const server = express();

server.use(cors());
server.use(express.static('uploads'));


server.post('/uploadFile', (req, res, next) => {
  const form = formidable({ multiples: true });
  const uploadedDate = new Date().getTime().toString() + '_';

  form.parse(req, (err, fields, files) => {
    if (err) {
      next(err);
      return;
    }

    var oldPath = files.selectedfile.filepath;
    var savePath = Path.join(__dirname, `uploads/${uploadedDate + files.selectedfile.originalFilename}`)         
    var rawData = fs.readFileSync(oldPath)
  
    fs.writeFile(savePath, rawData, function(err){
        if(err) console.log(err)
        return res.status(200).send({path: `${uploadedDate + files.selectedfile.originalFilename}`});
    })
  });
});

server.listen(PORT, (err) => {
  if (err) {
    console.log("There was a problem with the server: ", err);
  } else {
    console.log("App Server says hi from ", "http://" + HOST + ":" + PORT);
  }
});
