// // xóa token tự động với user được chỉ định
// let xoaToken = (nameUser) => {
// 	console.log(1, nameUser);
// };

// // xóa tất cả các ảnh của chuông cửa được chỉ định
// let xoaAnh = (nameDoorbell) => {
// 	console.log(2, nameDoorbell);
// };

// module.exports = { xoaAnh, xoaToken };

// var huy1970 = new Date(1970, 1, 1, 0, 0, 0);

// console.log(huy1970.getTime());
// var huy = new Date(2022, 03, 05, 14, 26, 00, 00);
// var huynow = Date.now();
// var huy2 = new Date(huynow);

// var kq = huy.getTime() - huy2.getTime();

// setTimeout(() => {
// 	console.log('huy');
// }, kq);
// console.log(kq);
// console.log(huy);
// console.log(huy3);

// --------------------  -------------------- //
/*|========================================================================================| 
	| hourInput 	 	: giờ android gửi lên 																									 |
	| minuteInput  	: phút android gửi lên 																									 |
	| milisInput 	 	: giây android gửi lên 																									 |
	| arrayInput 	 	: các thứ android gửi lên 																							 |
	| serverDate 		: ngày giờ hiện tại của máy tính 																				 |
	| nowYear 	 		: năm hiện tại của máy tính 																						 |
	| nowMonth 	 		: tháng hiện tại của máy tính 																					 |
	| 																	 																									 	 |
	| dayName			  : tìm ra thứ của 1 day bất kỳ 																   				 |
	| numberDayOfMonth	: tìm ra số ngày của 1 tháng và 1 năm bất kỳ 									   		 |
	| 																	 																									   |
	| soNgay				: số ngày của 1 tháng và 1 năm bất kỳ 									           			 |
	|	arrayDate			: mảng chứa các ngày của 1 tháng									           			 			 |
	| arrayDay			: mảng chứa các thứ của 1 tháng chưa cộng 1									           	 |
	| 																	 																									   |
	| t2[]...			: mảng chứa các ngày ứng với thứ 2/3/4/5/6/7/cn 									         |
	| arrayMilis  : mảng chứa số milis của 1 ngày giờ bất kỳ 									       			   |
	|========================================================================================|*/

// array days in week from android
var arrayInput = ['t3', 't5', 'cn'];
var hourInput = 7;
var minuteInput = 20;
var milisInput = 00;

// current times on desktop
var serverDate = new Date();
var nowYear = serverDate.getFullYear(); // 2022
var nowMonth = serverDate.getMonth() + 1; // 4

var arrayDate = [];
var arrayDay = [];

var t2 = [];
var t3 = [];
var t4 = [];
var t5 = [];
var t6 = [];
var t7 = [];
var cn = [];

var arrayMilis = [];

var obj = {
	t2: t2,
	t3: t3,
	t4: t4,
	t5: t5,
	t6: t6,
	t7: t7,
	cn: cn,
};

// FUNCTION TÌM THỨ CỦA 1 NGÀY BẤT KỲ
const dayName = (currentDay) => {
	var dayName = '';
	switch (currentDay) {
		case 0:
			dayName = 'cn';
			break;
		case 1:
			dayName = 't2';
			break;
		case 2:
			dayName = 't3';
			break;
		case 3:
			dayName = 't4';
			break;
		case 4:
			dayName = 't5';
			break;
		case 5:
			dayName = 't6';
			break;
		case 6:
			dayName = 't7';
	}
	return dayName;
};

// FUNCTION TÌM SỐ NGÀY CÓ TRONG 1 THÁNG BẤT KỲ TRONG 1 NĂM BẤT KỲ
const numberDayOfMonth = (month, year) => {
	return new Date(year, month, 0).getDate();
};

// SỐ NGÀY CỦA THÁNG HIỆN TẠI
let currentNumberDay = numberDayOfMonth(nowMonth, nowYear); // tháng 4 có 30 ngày

// TÌM RA CÁC MẢNG (NGÀY TRONG THÁNG / THỨ CỦA NGÀY ĐÓ / TỪNG MẢNG THỨ LÀ NGÀY NÀO)
for (let index = 1; index <= currentNumberDay; index++) {
	// nowDate = kiểu Date ứng với từng ngày của tháng hiện tại
	let nowDate = new Date(nowYear, nowMonth - 1, index, 00, 00, 00);

	arrayDate.push(nowDate.getDate()); // mảng chứa các ngày trong tháng hiện tại
	arrayDay.push(dayName(nowDate.getDay())); // mảng chứa các thứ trong tháng hiện tại

	let kq = arrayDay[index - 1];

	if (kq == 't2') {
		t2.push(arrayDate[index - 1]);
	}
	if (kq == 't3') {
		t3.push(arrayDate[index - 1]);
	}
	if (kq == 't4') {
		t4.push(arrayDate[index - 1]);
	}
	if (kq == 't5') {
		t5.push(arrayDate[index - 1]);
	}
	if (kq == 't6') {
		t6.push(arrayDate[index - 1]);
	}
	if (kq == 't7') {
		t7.push(arrayDate[index - 1]);
	}
	if (kq == 'cn') {
		cn.push(arrayDate[index - 1]);
	}
}

const trave = (obj, str) => {
	const huy = Object.keys(obj).reduce((object, key) => {
		if (key == str) {
			object[key] = obj[key];
		}
		return object;
	}, {});
	return Object.values(huy)[0];
};

const runTimer = (
	valueRef,
	obj,
	nowYear,
	nowMonth,
	hourInput,
	minuteInput,
	milisInput,
	serverDate
) => {
	let valueRefArray = Object.keys(obj);
	if (valueRefArray.includes(valueRef)) {
		let valueRefArrayTrue = trave(obj, valueRef);
		for (let i = 0; i < valueRefArrayTrue.length; i++) {
			let androidDate = new Date(
				nowYear,
				nowMonth - 1,
				valueRefArrayTrue[i],
				hourInput,
				minuteInput,
				milisInput
			);

			setTimeout(() => {
				console.log('Đã chạy xong timer');
			}, androidDate.getTime() - serverDate.getTime());
		}
	}
};

console.log('THÁNG', nowMonth, 'NĂM');

for (let index = 0; index < arrayInput.length; index++) {
	console.log(arrayInput[index]);
	runTimer(
		arrayInput[index],
		obj,
		nowYear,
		nowMonth,
		hourInput,
		minuteInput,
		milisInput,
		serverDate
	);
}

// ------------------------------------------------------------- LOG KẾT QUẢ ------------------------------------------------------------- //
console.log('THÁNG', nowMonth, 'NĂM');
// console.table({ Ngày: arrayDate, Thứ: arrayDay });
// console.log('NHỮNG NGÀY THỨ 2 TRONG THÁNG LÀ: ', t2);
// console.log('NHỮNG NGÀY THỨ 3 TRONG THÁNG LÀ: ', t3);
// console.log('NHỮNG NGÀY THỨ 4 TRONG THÁNG LÀ: ', t4);
// console.log('NHỮNG NGÀY THỨ 5 TRONG THÁNG LÀ: ', t5);
// console.log('NHỮNG NGÀY THỨ 6 TRONG THÁNG LÀ: ', t6);
// console.log('NHỮNG NGÀY THỨ 7 TRONG THÁNG LÀ: ', t7);
// console.log('NHỮNG NGÀY THỨ CN TRONG THÁNG LÀ: ', cn);

// if (arrayInput[index] == 't3') {
// 	for (var i = 0; i < t3.length; i++) {
// 		var androidDate = new Date(nowYear, nowMonth - 1, t3[i], hourInput, milisInput, milisInput);

// 		setTimeout(() => {
// 			console.log('Đã chạy xong timer');
// 		}, androidDate.getTime() - serverDate.getTime());
// 	}
// }
