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
/*|======================================================================================| 
	| serverDate 	: ngày giờ hiện tại của máy tính 																				 |
	| nowYear 	 	: năm hiện tại của máy tính 																						 |
	| nowMonth 	 	: tháng hiện tại của máy tính 																					 |
	| strDate 	 	: thứ (String) android gửi lên 																				   |
	| nowHour 	 	: giờ android gửi lên 																									 |
	| nowMinute  	: phút android gửi lên 																									 |
	| nowHour 	 	: giây android gửi lên 																									 |
	| 																	 																									 |
	| timThu(day)						: tìm ra thứ của 1 day bất kỳ 																 |
	| timSoNgay(month,year)	: tìm ra số ngày của 1 tháng và 1 năm bất kỳ 									 |
	| 																	 																									 |
	| soNgay			: số ngày của 1 tháng và 1 năm bất kỳ 									           			 |
	|	mangDate		: mảng chứa các ngày của 1 tháng									           			 			 |
	| mangDay			: mảng chứa các thứ của 1 tháng chưa cộng 1									           	 |
	| mangThu			: mảng chứa các thứ của 1 tháng đã cộng 1 															 |
	| 																	 																									 |
	| t2[]...			: mảng chứa các ngày ứng với thứ 2/3/4/5/6/7/cn 									       |
	| mangChuaMili: mảng chứa số milis của 1 ngày giờ bất kỳ 									       			 |
	|======================================================================================|*/

var objThu = ['t2', 't3', 'cn'];

console.log(objThu.length);

var serverDate = new Date();
console.log(serverDate.getTime());
console.log('-------------------');
var Nowyear = serverDate.getFullYear();
var Nowmonth = serverDate.getMonth() + 1;
var strDate = 't3';
var Nowhour = 17;
var Nowminute = 55;
var Nowmilis = 00;

var mangDate = [];
var mangDay = [];
var mangThu = [];

var t2 = [];
var t3 = [];
var t4 = [];
var t5 = [];
var t6 = [];
var t7 = [];
var cn = [];

var mangChuaMili = [];

// FUNCTION TÌM THỨ CỦA 1 NGÀY BẤT KỲ
const timThu = (current_day) => {
	var day_name = '';
	switch (current_day) {
		case 0:
			day_name = 'cn';
			break;
		case 1:
			day_name = 't2';
			break;
		case 2:
			day_name = 't3';
			break;
		case 3:
			day_name = 't4';
			break;
		case 4:
			day_name = 't5';
			break;
		case 5:
			day_name = 't6';
			break;
		case 6:
			day_name = 't7';
	}
	return day_name;
};

// FUNCTION TÌM SỐ NGÀY TRONG THÁNG
function timSoNgay(month, year) {
	return new Date(year, month, 0).getDate();
}

// SỐ NGÀY TRONG THÁNG
var soNgay = timSoNgay(Nowmonth, Nowyear); // tháng 4 có 30 ngày

// PUSH VÀO MẢNG SỐ NGÀY TRONG THÁNG
for (var index = 1; index <= soNgay; index++) {
	var dateInput = new Date(Nowyear, Nowmonth - 1, index, 00, 00, 00);
	mangDate.push(dateInput.getDate());
	mangDay.push(dateInput.getDay());
}

// TÌM THỨ CỦA MỖI NGÀY TRONG THÁNG
for (var i = 0; i < mangDay.length; i++) {
	var kq = timThu(mangDay[i]);

	mangThu.push(kq);

	if (kq == 't2') {
		t2.push(mangDate[i]);
	}
	if (kq == 't3') {
		t3.push(mangDate[i]);
	}
	if (kq == 't4') {
		t4.push(mangDate[i]);
	}
	if (kq == 't5') {
		t5.push(mangDate[i]);
	}
	if (kq == 't6') {
		t6.push(mangDate[i]);
	}
	if (kq == 't7') {
		t7.push(mangDate[i]);
	}
	if (kq == 'cn') {
		cn.push(mangDate[i]);
	}
}

// OUTPUT
console.log('THÁNG', Nowmonth, 'NĂM', Nowyear);
// console.table({ Ngày: mangDate, Thứ: mangThu });
// console.log('NHỮNG NGÀY THỨ 2 TRONG THÁNG LÀ: ', t2);
// console.log('NHỮNG NGÀY THỨ 3 TRONG THÁNG LÀ: ', t3);
// console.log('NHỮNG NGÀY THỨ 4 TRONG THÁNG LÀ: ', t4);
// console.log('NHỮNG NGÀY THỨ 5 TRONG THÁNG LÀ: ', t5);
// console.log('NHỮNG NGÀY THỨ 6 TRONG THÁNG LÀ: ', t6);
// console.log('NHỮNG NGÀY THỨ 7 TRONG THÁNG LÀ: ', t7);
// console.log('NHỮNG NGÀY THỨ CN TRONG THÁNG LÀ: ', cn);

for (let index = 0; index < objThu.length; index++) {
	if (objThu[index] == 't3') {
		for (var i = 0; i < t3.length; i++) {
			var androidDate = new Date(Nowyear, Nowmonth - 1, t3[i], Nowhour, Nowminute, Nowmilis);
			mangChuaMili.push(androidDate.getTime());
		}

		for (var i = 0; i < mangChuaMili.length; i++) {
			setTimeout(() => {
				console.log('Đã chạy xong timer');
			}, mangChuaMili[i] - serverDate.getTime());
		}
	}
}
