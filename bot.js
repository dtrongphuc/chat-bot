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

function findAndResponse (keyword) {
    var resText;
    if(!keyword) {
        return;
    }
    var keywordLower = keyword.toLowerCase();
    result.forEach(function(elem) {
        let generalKey = Object.keys(elem)[0];
        let keys = generalKey.split(", ");
        for (const key of keys) {
            if(keywordLower.includes(key)) {
                var resArr = elem[generalKey];
                let rng = Math.floor(Math.random() * resArr.length);
                resText = `${resArr[rng]}`;
            }       
        };
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
        userAgent: "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.163 Safari/537.36" //get cái này xem trong file login.js
    });

    if (err) return console.error(err);
    api.listenMqtt(function callback(err, message){
        getData();
        var response = findAndResponse(message.body);
        api.markAsRead(message.threadID);
        if(response) {
            answeredThreads[message.threadID] = true;
            if(response === 'emoji sad') {
                api.setMessageReaction('\uD83D\uDE22', message.messageID);
                return;
            }
            api.sendMessage(`${response}`, message.threadID);
        }
        return;
    });
});