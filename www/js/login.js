window.onload = function() {
	let oLoginBtn = document.getElementById('login');
	let oUsername = document.getElementById('username');
	let oPassword = document.getElementById('password');
	
	
	oLoginBtn.onclick = function() {
		$.ajax({
			url: '/me?id='+oUsername.value,
			data: {
				username: oUsername.value,
				password: oPassword.value
			},
			type: 'get',
			success: function (data) {
				// let json = eval(data);
				// console.log("http://localhost:8081/index?id="+data);
				window.location.replace("http://localhost:8081/me?id="+oUsername.value);
			},
			error: function (err) {
				console.log(err)
			}
		});
	}
};