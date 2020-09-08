const Data = require('../models/data.model');

module.exports.sendData = async function (req, res) {
	try {
		const { key, response } = req.body;
		let { general } = await Data.findOne({}, 'general -_id');
		const newObj = {};
		newObj[key] = [response];
		let check = false;
		let newArr = general.map((item) => {
			if (Object.keys(item)[0] === key) {
				item[key].push(response);
				check = true;
			}
			return item;
		});

		if (check) {
			await Data.findOneAndUpdate(
				{},
				{
					general: newArr,
				},
				{ useFindAndModify: false }
			);
		} else {
			await Data.findOneAndUpdate(
				{},
				{
					$push: {
						general: {
							$each: [newObj],
						},
					},
				},
				{ useFindAndModify: false }
			);
		}

		//await db.getData();
		res.status(200).json({ success: true });
	} catch (err) {
		res.status(500).json();
	}
};
