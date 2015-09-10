$(document).ready(function(){
	$("#login_page").show();
	$("#main_page").hide();

	$("#login").on("click",function(){
		$("#login_page").hide();
		$("#main_page").show();
	});
});