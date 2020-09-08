const fs = require('fs');
const Data = require('./models/data.model');

async function getData() {
	var { general } = await Data.findOne({}, 'general -_id');
	fs.writeFile('data.json', JSON.stringify(general), (err) => {
		if (err) throw err;
		console.log('write file ok');
	});
}

module.exports = {
	getData: getData,
};
