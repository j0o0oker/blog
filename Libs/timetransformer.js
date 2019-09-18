module.exports = function (t) {
	let time = new Date(parseInt(t));
	let transTime = time.getFullYear() +'-'+ (time.getMonth()+1)+'-'+ time.getDay()+' '+ toDoub(time.getHours())+':'+  toDoub(time.getMinutes());
	return transTime;
};

function toDoub (num) {
	if (num < 10) {
		return '0' + num;
	}else {
		return num;
	}
};
