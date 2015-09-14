window.addEventListener("load",init,false);

function init(){
	$("#login_page").show();
	$("#main_page").hide();
	$("#class_page").hide();
	$("#graph_page").hide();

	$("#login").on("click",function(){
		$("#login_page").hide();
		$("#main_page").show();
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
		$(".ui").empty();
		$("#arrows").show();
		switch(this.id){
			case "Computer":
				create(computerScience);
				break;
			case "Marketing":
				create(marketing);
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
		for(var k in array){
			if(this.id == k){
				for(var i=0; i<array[k].length;i++){
					$("#"+array[k][i]).css("background-color","green");
				}
			}		
		}
	});

	$("#left").click(function(){
		listMajors();
	});

	$("#right").click(function(){
		$("#main_page").hide();
		$("#graph_page").show();
	});

}



