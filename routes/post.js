const express = require("express");
var Twit = require("twit");
var config = require('../config');
const router = require("./get");

const app = express();
var T = new Twit(config);

router.route('/').post((req,res) => {
    // TODO:
    // take input from json or user 
    // not statically like this.
    var status = "hello from node js";

    T.post('statuses/update',{status}, post_status);
    
    function post_status(err, data, response) {
        if(err)
            res.json(err);
        else
            res.json(data);
    };

});

module.exports = router;
  