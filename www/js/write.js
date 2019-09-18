window.onload = function () {
	let oBtn = document.getElementById('publish');
	let oTitInp = document.getElementById('title-input');
	let oContInp = document.getElementById('content-input');
	let oTips = document.getElementById('tips');
	
	oBtn.onclick = function () {
		let a = new Date;
		// let t = new Date(1568789178015);
		// let time = t.getFullYear() +'-'+ (t.getMonth()+1)+'-'+ t.getDay()+' '+ t.getHours()+':'+  t.getMinutes();
		// console.log(time);
		$.ajax({
			url: '/write',
			data: {
				title: oTitInp.value,
				content: oContInp.value,
				time: a.getTime()
			},
			type: 'post',
			success: function (data) {
				oTips.innerHTML = data;
				oTips.style.display = "block";
				setTimeout(function() {
					console.log(111);
					oTips.style.display = "none";
				},1500);
			},
			error: function (err) {
				oTips.innerHTML = err.responseText;
				oTips.style.display = "block";
				setTimeout(function() {
					oTips.style.display = "none";
				},1500);
			}
		});
	};
};