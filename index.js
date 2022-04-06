// ----------------------------------------------- [START LIBRARY] ----------------------------------------------- //
const express = require('express');
const app = express();

const mqtt = require('mqtt');

const mongoose = require('mongoose');

let bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const morgan = require('morgan');
// ----------------------------------------------- [ENDED LIBRARY] ----------------------------------------------- //

// ----------------------------------------------- [START APP.USE] ----------------------------------------------- //
app.use(
	bodyParser.json({
		limit: '50mb',
	})
);
app.use(cookieParser()); // create cookie and attach cookie
app.use(express.json());
app.use(cors()); // fix cors origin error
app.use(morgan('common'));
dotenv.config();

// DATABASE
mongoose.connect(process.env.MONGODB_CLOUD_URL, () => {
	console.log('Successfully --> Database');
});
// ----------------------------------------------- [ENDED APP.USE] ----------------------------------------------- //

// ----------------------------------------------- [START ROUTES] ------------------------------------------------ //
const houseRouter = require('./router/houseRouter');
const roomRouter = require('./router/roomRouter');

const switchRouter = require('./router/switchRouter');
const inductionRouter = require('./router/inductionRouter');
const airconRouter = require('./router/airconRouter');
const doorbellRouter = require('./router/doorbellRouter');

const deviceRouter = require('./router/deviceRouter');

const authRouter = require('./router/authRouter');
const userRouter = require('./router/userRouter');

app.use('/', houseRouter);
app.use('/', roomRouter);

app.use('/', switchRouter);
app.use('/', inductionRouter);
app.use('/', airconRouter);
app.use('/', doorbellRouter);

app.use('/', deviceRouter);

app.use('/auth', authRouter);
app.use('/', userRouter);
// ----------------------------------------------- [ENDED ROUTES] ------------------------------------------------ //

app.listen(process.env.EXPRESS_PORT, () => {
	console.log(`Server on http://localhost:${process.env.EXPRESS_PORT}`);
});

// // AUTO DELETE
// const { xoaAnh, xoaToken } = require('./controller/autoDelete');
// let nameDoorbell = 'Chuông cửa';
// let nameUser = 'v';

// // setInterval(() => {
// // 	xoaToken(nameUser);
// // }, 120000);

// // setInterval(() => {
// // 	xoaAnh(nameDoorbell);
// // }, 5000);

// AUTO ADD
const gatewayCtr = require('./controller/autoAdd');

let array = [
	{
		_id: 'o1',
		name: 'Ổ cắm phòng ngủ',
		typeDevice: 'Socket',
		status: {
			button1: true,
			button2: false,
			both: false,
		},
	},
	{
		_id: 'o2',
		name: 'Ổ cắm phòng khách',
		typeDevice: 'Socket',
		status: {
			button1: false,
			button2: false,
			both: false,
		},
	},
	{
		_id: 's1',
		name: 'Công tắc phòng khách',
		typeDevice: 'Switch',
		status: {
			button1: false,
			button2: false,
			both: false,
		},
	},
	{
		_id: 's2',
		name: 'Công tắc phòng ngủ',
		typeDevice: 'Switch',
		status: {
			button1: true,
			button2: true,
			both: true,
		},
	},
	{
		_id: 'b1',
		name: 'Bàn ăn',
		typeDevice: 'Induction',
		status: {
			power: false,
			powerLevel: 3,
			cooking: false,
			stirfry: false,
			keepWarm: false,
			timer: 0,
		},
	},
	{
		_id: 'd1',
		name: 'Điều hòa phòng ngủ',
		typeDevice: 'Aircon',
		status: {
			on: false,
			brand: 'Toshiba',
			mode: 'fan',
			fanSpeed: 3,
			temp: 32,
			humid: 80,
			swing: false,
		},
	},
	{
		_id: 'd2',
		name: 'Điều hòa phòng khách',
		typeDevice: 'Aircon',
		status: {
			on: true,
			brand: 'Samsung',
			mode: 'crazy',
			fanSpeed: 5,
			temp: 29,
			humid: 90,
			swing: true,
		},
	},
	{
		_id: 'c1',
		name: 'Chuông cửa',
		typeDevice: 'Doorbell',
		status: {
			numberPicture: 2,
			picture: [
				{
					code: 'trenthegioinaychicotranduchuydeptrainhatmathoihuylabestla10diemhihi',
					create: new Date(2022, 03, 12),
				},
				{
					code: 'TRANDUCHUYVANCULAOK',
					create: new Date(2022, 07, 08),
				},
			],
		},
	},
];

//gatewayCtr(array);
