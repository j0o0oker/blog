$(document).ready(function() {
	let index = 0;
	let timer = null;
	timer = setInterval(function() {
		$('.banner-item').css("opacity", "0");
		$('.banner-item').eq(index%6).animate({opacity:'1'}, 1000);
		index++;
	},2500);
	$('.banner-item').mouseenter(function () {
		console.log(1);
		clearInterval(timer);
	});
	$('.banner-item').mouseleave(function () {
		console.log(1);
		timer = setInterval(function() {
			$('.banner-item').css("opacity", "0");
			$('.banner-item').eq(index%6).animate({opacity:'1'}, 1000);
			index++;
		},2500);
	});
	
});