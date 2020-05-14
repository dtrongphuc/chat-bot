require('dotenv').config();

const fs = require("fs");
const login = require("facebook-chat-api");
const mongoose = require('mongoose');
var request = require('request');
var Data = require('./models/data.model');

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

var answeredThreads = {};
var botStatusThreads = {};
var result = [];

async function getData() {
    var data = await Data.find();
    result = await data[0].general;
};

getData();

function findAndResponse (keyword) {
    var resText;
    if(!keyword) {
        return;
    }

    result.forEach(function(elem) {
        let key = Object.keys(elem)[0];
        if(keyword.includes(key)) {
            resText = elem[key];
        }       
    });
    return resText;
};


login({
    appState: JSON.parse(fs.readFileSync('appstate.json', 'utf8'))
 }, (err, api) => {

    api.setOptions({
        selfListen: false,
        logLevel: "silent",
        updatePresence: false,
        userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/76.0.3809.132 Safari/537.36" //get cái này xem trong file login.js
    });

   if (err) return console.error(err);
    api.listenMqtt(function callback(err, message){
        var response = findAndResponse(message.body);
        api.markAsRead(message.threadID);
        if(response) {
            answeredThreads[message.threadID] = true;
            api.sendMessage(response, message.threadID);
        }
        return;
    });
});