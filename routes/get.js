const express = require("express");
const app = express();
const router = express.Router();

var Twit = require("twit");

var config = require('../config');
const { prototype } = require("twit");
var T = new Twit(config);

router.route('/').get((req,res) => {
    //  s earch twitter for all tweets containing the word 'banana' since July 11, 2011
    // for more query params visit this:
    // https://developer.twitter.com/en/docs/twitter-api/v1/tweets/search/api-reference/get-search-tweets
    var params= { 
        //querying the tweets which you need 
        //like in this case any tweet containing `@NASA` will be recieved.

        // TODO: try to take q from user/JSON
        q: '@Gaming',
        //how many tweet you want to find.
        count: 1
    };
    
    T.get('search/tweets',params, getData); 

    function getData (err, data, response) {
        //taking the response from API and using only the statuses data.
        var tweets = data.statuses;
        var user;
        var text;
    
        for(var i = 0 ; i < tweets.length ; i++){
            //only taking the user data out of statutes.
            user = tweets[i].user;
            text = tweets[i].text;
        }
        // taking the details out of user object that is needed.
        var users = {
            id: user.id,
            "name": user.name,
            "profile_descrption": user.descrption,
            "followers_count": user.followers_count,
            "friends_count": user.friends_count,
            "created_at": user.created_at,
            "retweet_count":user.retweet_count,
            "statuses_count":user.statuses_count,
            "tweeted_text_description": text
        };
        if(users.descrption === undefined){
            users.descrption = "";
        }
        if(users.retweet_count === undefined){
            users.retweet_count = 0;
        }
        res.json(users);
    }
});

module.exports = router;