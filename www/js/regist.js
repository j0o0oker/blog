// window.onload = function() {
// 	let oRegstBtn = document.getElementById('regist');
// 	let oUsername = document.getElementById('username');
// 	let oPassword = document.getElementById('password');
// 	let oFile = document.getElementById('file').files[0];
// 	let oTips = document.getElementById('tips');
// 	let myData = new FormData();
// 	myData.append("username", oUsername.value);
// 	myData.append("password", oPassword.value);
// 	myData.append("avatorsrc", oFile);
// 	 
// 	oRegstBtn.onclick = function() {
// 		console.log(oPassword.value);
// 		console.log(myData.get('oPassword'));
// 		console.log(myData.get('oUsername'));
// 		$.ajax({
// 			url: '/regist',
// 			data: myData,
// 			type: 'post',
// 			cache: false,
// 			processData: false,
// 			contentType: false, 
// 			success: function (data) {
// 				console.log(data);
// 				// window.location.replace('http://localhost:8081/login');
// 			},
// 			error: function (err) {
// 				oTips.innerHTML = err.responseText;
// 			}
// 		});
// 	}
// };