window.addEventListener("load",init,false);

var taken_array = [];
var current = [];
var j = 0;
var m = 0;

function init(){
	$("#login_page").show();
	$("#bar").hide();
	$("#main_page").hide();
	$("#class_page").hide();
	$("#graph_page").hide();

	$("#login").on("click",function(){
		$("#login_page").hide();
		$("#main_page").show();
		$("#bar").fadeIn(2000);
 
 		$("#second").addClass("active");
 		$("#third").addClass("next");

		$( "#logo" ).animate({
			width: "651px",
		  	height: "145px",
		  	marginLeft: "0in",
		  	marginTop: "0in",
		  }, 500, function() {
		});

		listMajors();
	});
}

function listMajors(){
	$("#arrows").hide();
	$(".ui").empty();
	for(var i=0; i<majors.length;i++){
		var x = majors[i];
		var c;
		c += '<div class=\'ui_box\' id='+x+'>';
		c += '<div class=\'ui_box__top highlight\'>';
		c += '<h3>'+x+'</h3>';
		c += '</div>';
		c += '</div>';	
	}
	$(".ui").append(c);
	$(".ui_box").on("click",function(){

		$("#second").removeClass("active");
		$("#second").addClass("previous visited");
		$("#third").removeClass("next");
		$("#third").addClass("active");
		$("#fourth").addClass("next");

		$(".ui").empty();
		$("#arrows").show();
		switch(this.id){
			case "Computer":
				create(computerScience);
				break;
			case "Marketing":
				create(marketing);
				break;
			case "Psychology":
				create(psychology);
				break;
			case "Accounting":
				create(accounting);
				break;
			case "Mechanical":
				create(mechanical_engineering);
				break;
			case "Biology":
				create(biology);
				break;
			case "Chemistry":
				create(chemistry);
				break;
			case "Physics":
				create(physics);
				break;
		}
	});
}

function create(array){
	for(var k in array){
		var c;
		c += '<div class=\'ui_box\'>';
		c += '<div class=\'ui_box__top\' id='+k+'>';
		c += '<h3>'+k.substring(0,4) + " " + k.substring(5,9)+'</h3>';
		c += '</div>';
		c += '</div>';	
	}
	$(".ui").append(c);
	$(".ui_box__top").on("click",function(){
		$(this).css("background-color","green");
		var id = this.id
		taken_array[j] = id;
		j++;
		changeColor(array,id);
	});

	$("#left").click(function(){
		clearArray();
		listMajors();
		$("#second").removeClass("previous visited");
		$("#second").addClass("active");
		$("#third").removeClass("active");
		$("#third").addClass("next");
		$("#fourth").removeClass("next");

	});

	$("#right").click(function(){
		$("#main_page").hide();
		$("#graph_page").show();

		$("#third").removeClass("active");
		$("#third").addClass("previous visited");
		$("#fourth").addClass("previous visited");
		$("#fifth").addClass("active");
		
		tableCreate();
	});

}

function changeColor(array,id){
	for(var k in array){
		if(id == k){
			for(var i=0; i<array[k].length;i++){
				$("#"+array[k][i]).css("background-color","green");
				if(checkArray(array[k][i])){
					taken_array[j] = array[k][i];
					j++; 
				}
				changeColor(array,array[k][i]);
			}
		}		
	}
}

function checkArray(checkedItem){
	for(var i=0; i<taken_array.length;i++){
		if(checkedItem == taken_array[i] || checkedItem == ""){
			return false;
		}
	}
	return true;
}

function clearArray(){
	for(var i=0; i<taken_array.length; i++){
		taken_array.pop();
	}
}

function tableCreate(){

}

