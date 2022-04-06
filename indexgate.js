const eventsModule = require('events');
const config = require('./config').config;
const SerialPort = require('serialport').SerialPort;
const port = new SerialPort({ path: config.serial.port, baudRate: config.serial.baud });
const slip = require('slip');
const decoder = new slip.Decoder({});

var payloadForSend = {};
var nodeIdForSend = 123;
var topicForSend = 'huy/deptrai';

var onlineNodes = [];

// FUNCTION LỌC PHẦN TỬ
Array.prototype.diff = function (a) {
	return this.filter(function (i) {
		return a.indexOf(i) < 0;
	});
};

// FUNCTION SERVER GHI DATA XUỐNG CHO GATEWAY -> GATEWAY GỬI CHO CÁC NODE
var sendDataToGateway = async (topic, nodeId, payload) => {
	let dataTopic = topic;
	let dataNodeId = nodeId;
	let dataPayload = payload;

	// GÁN GIÁ TRỊ CHO DATAPAYLOAD
	try {
		dataPayload = JSON.parse(payload);
	} catch (e) {
		dataPayload = payload;
	}

	// GÁN GIÁ TRỊ CHO DATA
	let data = {
		topic: dataTopic,
		nodeId: dataNodeId,
		payload: dataPayload,
	};

	let strData = JSON.stringify(data);
	let dataSend = new Uint8Array(strData.length);

	for (let i = 0, j = strData.length; i < j; ++i) {
		dataSend[i] = strData.charCodeAt(i);
	}

	let packet = slip.encode(dataSend);

	await port.write(packet);
	console.log('Huy Đã Ghi Thành Công');
	port.drain();
};

// ĐỌC DATA TỪ GATEWAY VỀ SERVER THÔNG QUA SERIAL
port.on('data', (dataCatch) => {
	data = decoder.decode(dataCatch);

	if (data) {
		var dataObject = String.fromCharCode.apply(null, data);
		var dataParse = JSON.parse(dataObject);
		var va;
		var va1 = [];

		try {
			if ('nodes' in dataParse) {
				va1 = dataParse.nodes;
				console.log(va1);
			} else {
				va = JSON.parse(dataParse.topic);
				console.log(va);
			}
		} catch (error) {}

		var dataParseSlice = dataParse.slice(29);
		var obj = JSON.parse(dataParseSlice);
		var nodes = obj['nodes'];
		if (nodes) {
			// 	// we've got status info with list of online nodes
			var offline = onlineNodes.diff(nodes);
			console.log(offline);
			var newOnline = nodes.diff(offline).diff(onlineNodes); //only new online to publish
			console.log(83, newOnline);
			onlineNodes = nodes;
			console.log(85, onlineNodes);
		}
	}
});

setInterval(() => {
	sendDataToGateway(topicForSend, nodeIdForSend, payloadForSend);
}, 5000);
