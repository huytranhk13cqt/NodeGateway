// let { xoaToken, xoaAnh } = require('./1');
// let nameDoorbell = 'Chuông cửa';
// let nameUser = 'vananh';
// xoaToken(nameDoorbell);
// xoaAnh(nameDoorbell);
// var t3 = [1, 2, 3];
// var str = 't3';
// str = str.replace(/^"|"$/g, '');
// console.log(str);

// for (let i = 0; i < array.length; i++) {
// 	if (array[i] = obj)
// }

// console.log(Object.keys(obj));

// --------------------  -------------------- //

var t2 = [1, 2, 3, 54, 5, 6, 4];
var t3 = [2, 7, 4, 1, 213];
var t4 = [123, 5, 6, 1, 213];
var ob = {
	t2: t2,
	t3: t3,
	t4: t4,
};

var arraykey = Object.keys(ob);
var str = 't2';

const trave = () => {
	const huy = Object.keys(ob).reduce((object, key) => {
		if (key == str) {
			object[key] = ob[key];
		}
		return object;
	}, {});
	// console.log(Object.values(huy)[0]);
	return Object.values(huy)[0];
};

if (arraykey.includes(str)) {
	console.log(trave());
}
