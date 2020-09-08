require('dotenv').config();

var express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
var app = express();
var port = process.env.PORT || 3000;

mongoose.connect(process.env.MONGO_URI, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

const sendAPI = require('./routes/send.route');

app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));
app.use('/', sendAPI);
app.set('view engine', 'ejs');
app.set('views', './views');
app.get('/', function (req, res) {
	res.render('index');
});

app.listen(port, () => {
	console.log(`Example app listening at http://localhost:${port}`);
});
