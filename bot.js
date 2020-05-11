const fs = require("fs");
const login = require("facebook-chat-api");
var request = require('request');

var answeredThreads = {};
var botStatusThreads = {};

// blockGroupChat = function (threadID) {
//     var blockGroupIds = ["id gourup chat", "id gourup chat"];
//     if (blockGroupIds.find(x => x == threadID)) {
//         console.error("block GroupId: " + threadID);
//         return true;
//     }
//     return false;
// }

// blockUserChat = function (threadID) {
//     var blockUserIds = ["id user", "id user"];
//     if (blockUserIds.find(x => x == threadID)) {
//         console.error("block ID: " + threadID);
//         return true;
//     }
//     return false;
// }

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
    var yourId = api.getCurrentUserID(); //lấy Id người login hiện tại


    api.listenMqtt(function callback(err, message) {
        //block icon: fix bug khi nhận đc icon
        if (message.body == '') {
            api.sendMessage("🙆‍♀️", message.threadID);
            return;
        }

        //block all group : Chỗ này block all nhóm chát, k thíc thì comment lại
        // if (message.isGroup) return console.log("block all group");
        //Simsimi
        var str = "";
        str = str + message.body;
        str = str.toLowerCase();

        if (str.indexOf("ăn gì") != -1) {
            api.markAsRead(message.threadID);
            answeredThreads[message.threadID] = true;
            api.sendMessage("ăn cám, meo meo", message.threadID);
            return;
        } else if (str.indexOf("cac") != -1 || str.indexOf("cc") != -1 || str.indexOf("clm") != -1) {
            api.markAsRead(message.threadID);
            answeredThreads[message.threadID] = true;
            api.sendMessage("cc", message.threadID);
            return;
            /*         }else if (str.indexOf("mì")!=-1) {
            			api.markAsRead(message.threadID);
            			answeredThreads[message.threadID] = true;
                        api.sendMessage("lại ăn mì （´ヘ｀）", message.threadID);
            			return; */
        } else if (message.body == "1") {
            api.markAsRead(message.threadID);
            answeredThreads[message.threadID] = true;
            api.sendMessage("🙆‍♀️🙆‍♀️", message.threadID);
            return;
        } else if (message.body == "😔" || message.body == "😞") {
            api.markAsRead(message.threadID);
            answeredThreads[message.threadID] = true;
            api.sendMessage("😞😞😞", message.threadID);
            return;
        } else if (str.indexOf("phúc") != -1) {
            api.markAsRead(message.threadID);
            answeredThreads[message.threadID] = true;
            //api.setMessageReaction(":heart_eyes:",message.threadID);
            api.sendMessage("Phúc vạn tuế", message.threadID);
            return;
        } else if (message.body == "@Phúc Trọng Dương") {
            api.markAsRead(message.threadID);
            answeredThreads[message.threadID] = true;
            api.sendMessage("Nhắc anh tao làm gì ? UwU", message.threadID);
            return;
        } else if (message.body == "@Khá Bá Bánh") {
            api.markAsRead(message.threadID);
            answeredThreads[message.threadID] = true;
            api.sendMessage("Nhắc kao có chuyện gì?", message.threadID);
            return;
        } else if (str.indexOf("khoa") != -1) {
            api.markAsRead(message.threadID);
            answeredThreads[message.threadID] = true;
            api.sendMessage("Khoa ngu", message.threadID);
            return;
        } else if (str.indexOf("hiếu") != -1 || str.indexOf("heiu") != -1) {
            api.markAsRead(message.threadID);
            answeredThreads[message.threadID] = true;
            api.sendMessage("Khoa ngu", message.threadID);
            return;
        } else if (str.indexOf("ditme") != -1 || str.indexOf("dit me") != -1 || str.indexOf("ditmemay") != -1 || str.indexOf("dmm") != -1 || str.indexOf("cmm") != -1) {
            api.markAsRead(message.threadID);
            answeredThreads[message.threadID] = true;
            api.sendMessage("chửi con cac à ?", message.threadID);
            return;
        } else if (str.indexOf("đơm") != -1 || str.indexOf("đấm") != -1 || str.indexOf("10 thằng") != -1 || str.indexOf("xúc") != -1) {
            api.markAsRead(message.threadID);
            answeredThreads[message.threadID] = true;
            api.sendMessage("10 thằng như m", message.threadID);
            return;
        } else if (str.indexOf("yuumi") != -1) {
            api.markAsRead(message.threadID);
            answeredThreads[message.threadID] = true;
            api.sendMessage("Ba má cho tiền ăn học, k lo học suốt ngày chơi game :((", message.threadID);
            return;
        } else if (str.indexOf("khó chịu") != -1) {
            api.markAsRead(message.threadID);
            answeredThreads[message.threadID] = true;
            api.sendMessage("Có câu nói hoài, tưởng ai cũng sợ ?", message.threadID);
            return;
        } else if (str.indexOf("bp") != -1) {
            api.markAsRead(message.threadID);
            answeredThreads[message.threadID] = true;
            api.sendMessage("dak lak ?", message.threadID);
            return;
        } else if (str.indexOf("đánh") != -1) {
            api.markAsRead(message.threadID);
            answeredThreads[message.threadID] = true;
            api.sendMessage("đánh ?", message.threadID);
            return;
        } else if (str.indexOf("đá") != -1) {
            api.markAsRead(message.threadID);
            answeredThreads[message.threadID] = true;
            api.sendMessage("đá vô mồm m giờ", message.threadID);
            return;
        }else if (str.indexOf("câm") != -1) {
            api.markAsRead(message.threadID);
            answeredThreads[message.threadID] = true;
            api.sendMessage("câm luôn :(", message.threadID);
            return;
        } else if (str.indexOf("wibu") != -1 || str.indexOf("wjbu") != -1) {
            api.markAsRead(message.threadID);
            answeredThreads[message.threadID] = true;
            api.sendMessage("Thức thứ nhất, hơi thở wjbu ✪ ω ✪", message.threadID);
            return;
        } else if (str.indexOf("chửi") != -1) {
            api.markAsRead(message.threadID);
            answeredThreads[message.threadID] = true;
            api.sendMessage("chửi ăn cac à ?", message.threadID);
            return;
        } else if (str.indexOf("quạo quọ") != -1) {
            api.markAsRead(message.threadID);
            answeredThreads[message.threadID] = true;
            api.sendMessage("ae vui vẻ có quạo quọ", message.threadID);
            return;
        } else if (str.indexOf("im") != -1) {
            api.markAsRead(message.threadID);
            answeredThreads[message.threadID] = true;
            api.sendMessage("đeo' im thì sao ?", message.threadID);
            return;
        } else if (str.indexOf("game") != -1 || str.indexOf("Game") != -1) {
            api.markAsRead(message.threadID);
            answeredThreads[message.threadID] = true;
            api.sendMessage("ai thèm chơi game với ông đâu mà", message.threadID);
            return;
        } else if (str.indexOf("chơi") != -1 ) {
            api.markAsRead(message.threadID);
            answeredThreads[message.threadID] = true;
            api.sendMessage("chơi cc", message.threadID);
            return;
        } else if (str.indexOf("tôi gánh") != -1) {
            api.markAsRead(message.threadID);
            answeredThreads[message.threadID] = true;
            api.sendMessage("gánk cc", message.threadID);
            return;
        } else if (message.body == "🐱") {
            api.markAsRead(message.threadID);
            answeredThreads[message.threadID] = true;
            api.sendMessage("ở đây chỉ nên có 1 con mèo ⋋_⋌", message.threadID);
            return;
        } else if (str.indexOf("mèo") != -1 || str.indexOf("bánh") != -1) {
            api.markAsRead(message.threadID);
            answeredThreads[message.threadID] = true;
            api.sendMessage("Meooo meooo \n (●ˇ∀ˇ●)", message.threadID);
            return;
        }

        api.markAsRead(message.threadID);

        if (!answeredThreads.hasOwnProperty(message.threadID)) {

            //Chức năng này dành cho người muốn bỏ qua ID nào đó
            // Tìm id ở đây https://findmyfbid.in/
            // Thêm 1 người vào chỉ cần thêm dấu ,"ID người"
            // Group cũng thế

            //if(blockGroupChat(message.threadID)){
            //	return;
            //};
            // if (blockUserChat(message.threadID)) {
            //     return;
            // };

            answeredThreads[message.threadID] = true;
            api.sendMessage("💢💢💢", message.threadID);
        }
    });

});