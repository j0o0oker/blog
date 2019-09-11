window.onload = function() {
	let oRegstBtn = document.getElementById('regist');
	let oUsername = document.getElementById('username');
	let oPassword = document.getElementById('password');
	let oFile = document.getElementById('file');
	let oTips = document.getElementById('tips');
	oRegstBtn.onclick = function() {
		$.ajax({
			url: '/regist',
			data: {
				username: oUsername.value,
				password: oPassword.value
			},
			type: 'post',
			success: function (data) {
				console.log(data);
				window.location.replace('http://localhost:8081/login');
			},
			error: function (err) {
				oTips.innerHTML = err.responseText;
			}
		});
	}
};