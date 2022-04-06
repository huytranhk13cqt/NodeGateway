const { House, Room, Aircon, Induction, Doorbell, Switch } = require('../model/model');

/*|======================================================================================| 
	| gatewayCtr : để ta khởi tạo các thiết bị ban đầu (các node) đang kết nối với gateway |
	|======================================================================================|*/

let gatewayCtr = async (arrayDevice) => {
	// THÊM SWITCH - SOCKET
	let addSwitch = async (arrayDevice) => {
		const newSwitch = new Switch(arrayDevice[i]);
		const saveSwitch = await newSwitch.save();
		console.log('save switch thành công');
		if (newSwitch.host) {
			const host = await Room.findById(arrayDevice[i].host);
			await host.updateOne({ $push: { switches: saveSwitch._id } });
		}
	};

	// THÊM AIRCON
	let addAircon = async (arrayDevice) => {
		const newAircon = new Aircon(arrayDevice[i]);
		const savedAircon = await newAircon.save();
		console.log('save aircon thành công');
		if (newAircon.host) {
			const host = await Room.findById(arrayDevice[i].host);
			await host.updateOne({ $push: { aircons: savedAircon._id } });
		}
	};

	// THÊM INDUCTION
	let addInduction = async (arrayDevice) => {
		const newInduction = new Induction(arrayDevice[i]);
		const savedInduction = await newInduction.save();
		console.log('save induction thành công');
		if (newInduction.host) {
			const host = await Room.findById(arrayDevice[i].host);
			await host.updateOne({ $push: { inductions: savedInduction._id } });
		}
	};

	// THÊM DOORBELL
	let addDoorbell = async (arrayDevice) => {
		const newDoorbell = new Doorbell(arrayDevice[i]);
		const savedDoorbell = await newDoorbell.save();
		console.log('save doorbell thành công');
		if (newDoorbell.host) {
			const host = await Room.findById(arrayDevice[i].host);
			await host.updateOne({ $push: { doorbells: savedDoorbell._id } });
		}
	};

	for (var i = 0; i < arrayDevice.length; i++) {
		const typeD = arrayDevice[i].typeDevice;

		switch (typeD) {
			case 'Switch':
				addSwitch(arrayDevice);
				break;
			case 'Socket':
				addSwitch(arrayDevice);
				break;
			case 'Aircon':
				addAircon(arrayDevice);
				break;
			case 'Induction':
				addInduction(arrayDevice);
				break;
			case 'Doorbell':
				addDoorbell(arrayDevice);
				break;
			default:
				console.log('Không có thiết bị để khởi tạo');
				break;
		}
	}
};
module.exports = gatewayCtr;
