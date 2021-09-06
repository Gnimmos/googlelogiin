const express = require('express');
const path = require('path');
const fs = require('fs');

const router = express.Router();


router.get('/', async(req, res) => {
  // res.setHeader('Access-Control-Allow-Origin', 'http://wolvestalk.commedia.wiki');


async function readmail() {

 const file = fs.readFile(path.join(__dirname, './wolf10.json'),
    (err, result) => {
      if (err){
        console.log(err);
           throw err;
      }else{
        res.send(result.toString());
          console.log(result.toString());

      }
    });
  }
readmail();
})

module.exports = router;
