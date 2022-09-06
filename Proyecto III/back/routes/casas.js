var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    console.log("Estas dentro de /casas jeje");
});


  
module.exports = router;
