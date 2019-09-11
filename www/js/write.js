window.onload = function () {
	let oBtn = document.getElementById('publish');
	let oTitInp = document.getElementById('title-input');
	let oContInp = document.getElementById('content-input');
	let oTips = document.getElementById('tips');
	
	oBtn.onclick = function () {
		$.ajax({
			url: '/write',
			data: {
				title: oTitInp.value,
				content: oContInp.value
			},
			type: 'post',
			success: function (data) {
				oTips.innerHTML = data;
				oTips.style.display = "block";
				
			},
			error: function (err) {
				oTips.innerHTML = err.responseText;
				oTips.style.display = "block";
			}
		});
	};
};