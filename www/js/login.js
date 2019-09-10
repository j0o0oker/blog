window.onload = function() {
	let oLoginBtn = document.getElementById('login');
	let oUsername = document.getElementById('username');
	let oPassword = document.getElementById('password');
	let oTips = document.getElementById('tips');
	console.log(1);
	oLoginBtn.onclick = function() {
		$.ajax({
			url: '/login',
			data: {
				username: oUsername.value,
				password: oPassword.value
			},
			type: 'post',
			success: function (data) {
				console.log(data);
				window.location.replace('http://localhost:8081/me');
			},
			error: function (err) {
				oTips.innerHTML = err.responseText;
			}
		});
	}
};