const { Room, Switch } = require('../model/model');

const switchCtr = {
	// [POST]
	addSwitch: async (req, res) => {
		try {
			const newSwitch = new Switch(req.body);
			const savedSwitch = await newSwitch.save();

			if (req.body.room) {
				const room = await Room.findById(req.body.room);
				if (room != null) {
					await room.updateOne({ $push: { switches: savedSwitch._id } });
				} else {
					savedSwitch.room = '';
					await savedSwitch.save();
				}
			}

			res.status(200).json(savedSwitch);
		} catch (error) {
			res.status(500).json(error);
		}
	},

	// [GET]
	getSwitch: async (req, res) => {
		try {
			const switches = await Switch.findById(req.params.id);

			res.status(200).json(switches);
		} catch (error) {
			res.status(500).json(error);
		}
	},

	// [GET]
	getallSwitch: async (req, res) => {
		try {
			const switches = await Switch.find();
			res.status(200).json(switches);
		} catch (error) {
			res.status(500).json(error);
		}
	},

	// [PUT]
	updateSwitch: async (req, res) => {
		try {
			// tìm switch
			const switches = await Switch.findById(req.params.id);

			// nếu trong body CÓ điền room thì
			if (req.body.room) {
				// tìm room (body) trong database
				const room = await Room.findById(req.body.room);

				// nếu room (body) không tồn tại
				if (room == null) {
					return res.status(404).json('ROOM NOT FOUND');
				}
				// nếu room (body) có tồn tại trong database
				else {
					// nếu room (db) của switch KHÁC với room (body)
					if (switches.room != req.body.room) {
						// xóa switch trong cái room đang chứa nó
						await Room.updateMany(
							{ switches: switches._id },
							{ $pull: { switches: switches._id } }
						);

						// push switch với id này vào cái room (body) vừa tìm được
						await room.updateOne({ $push: { switches: switches._id } });

						// update thông tin room (databae) mới của switch
						switches.room = req.body.room;
						await switches.save();

						console.log('CHANGE ROOM SUCCESSFULLY');

						// sau khi đổi room thì phải update theo body bình thường (chứa những lệnh control)
						await switches.updateOne({
							$set: req.body,
						});

						// tìm lại switch vừa update để coi sự thay đổi
						const switches2 = await Switch.findById(req.params.id);

						return res.status(200).json(switches2.status);
					} else {
						// nếu room (db) của switch GIỐNG với room (body)
						// update theo body bình thường (chứa những lệnh control)
						await switches.updateOne({
							$set: req.body,
						});

						// tìm lại switch vừa update để coi sự thay đổi
						const switches2 = await Switch.findById(req.params.id);

						return res.status(200).json(switches2.status);
					}
				}
			}
			// nếu trong body KHÔNG CÓ điền room
			else {
				// update theo body bình thường (chứa những lệnh control)
				// await switches.updateOne({
				// 	$set: req.body,
				// });

				// tìm lại switch vừa update để coi sự thay đổi
				// const switches2 = await Switch.findById(req.params.id);

				// nếu có timer thì hết timer mới trả về kết quả
				if (req.body.timer) {
					setTimeout(async () => {
						console.log('Có timer');
						req.body.timer = 0;
						await switches.updateOne({
							$set: req.body,
						});
						const switches2 = await Switch.findById(req.params.id);

						res.status(200).json(switches2.status);
					}, req.body.timer);
				} else {
					console.log('Không có timer');
					await switches.updateOne({
						$set: req.body,
					});
					const switches2 = await Switch.findById(req.params.id);

					res.status(200).json(switches2.status);
				}
			}
		} catch (error) {
			res.status(500).json(error);
		}
	},

	// [DELETE]
	deleteSwitch: async (req, res) => {
		try {
			await Room.updateMany({ switches: req.params.id }, { $pull: { switches: req.params.id } });

			await Switch.findByIdAndDelete(req.params.id);

			res.status(200).json('Delete successfully !');
		} catch (error) {
			res.status(500).json(error);
		}
	},
};

module.exports = switchCtr;
// sao ? sao update thanfh cong ma data base k doi
// coi đúng object ko
