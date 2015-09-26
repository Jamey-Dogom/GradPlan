window.addEventListener("load",init,false);

var taken_array = [];		// CLASSES TAKEN ARRAY
var j = 0;
var total_array = [];		// COMPLETE LIST OF CLASSES FOR SELECTED MAJOR
var l = 0;
var n = 0;
var major = '';				// SELECTED MAJOR
var next_first = 0;
var previous_first = 0;

function init(){
	document.getElementById("next").addEventListener("click",next,false);
	document.getElementById("previous").addEventListener("click",previous,false);
	$("#login_page").show();
	$("#logout").hide();
	$("#bar").hide();
	$("#work_page").hide();
	$("#main_page").hide();
	$("#submit_page").hide();
	$("#main_nav").hide();
	$("#next").hide();
	$("#previous").hide();
	$("#helper").hide();

	$("#login").on("click",function(){
		$("#login_page").hide();
		$("#main_page").show();
		$("#logout").show();
		$("#bar").fadeIn(2000);

 		$("#second").addClass("active");
 		$("#third").addClass("next");

		$( "#logo" ).animate({
			width: "0px",
		  	height: "0px",
		  	marginLeft: "0in",
		  	marginTop: "0in",
		  }, 500, function() {
		});

 		$("#main_nav").show();
		listMajors();
	});
}

// CREATES LIST OF MAJORS
function listMajors(){
	$("#arrows").hide();
	$(".ui").empty();
	var c = '';
	for(var i=0; i<majors.length;i++){
		var x = majors[i];
		c += '<div class=\'ui_box\' id='+x+'>';
		c += '<div class=\'ui_box__top highlight\'>';
		c += '<h3>'+x+'</h3>';
		c += '</div>';
		c += '</div>';
	}
	$(".ui").append(c);

	// MAJOR CLICK LISTENER
	$(".ui_box").on("click",function(){
		$("#second").removeClass("active");
		$("#second").addClass("previous visited");
		$("#third").removeClass("next");
		$("#third").addClass("active");
		$("#fourth").addClass("next");
		$(".ui").empty();
		$("#next").show();
		$("#previous").show();
		switch(this.id){
			case "Computer":
				major = computerScience;
				break;
			case "Marketing":
				major = marketing;
				break;
			case "Psychology":
				major = psychology;
				break;
			case "Accounting":
				major = accounting;
				break;
			case "Mechanical":
				major = mechanical_engineering;
				break;
			case "Biology":
				major = biology;
				break;
			case "Chemistry":
				major = chemistry;
				break;
			case "Physics":
				major = physics;
				break;
		}
		create(major);
	});
}


// CREATE LIST OF CLASSES DEPENDING ON MAJOR CHOSEN
function create(array){
	var c = '';
	for(var k in array){
		total_array[l] = k;
		l++;
		c += '<div class=\'ui_box\'>';
		c += '<div class=\'ui_box__top\' id='+k+'>';
		c += '<h3>'+k.substring(0,4) + " " + k.substring(5,9)+'</h3>';
		c += '</div>';
		c += '</div>';
	}
	$(".ui").append(c);
	$(".ui_box__top").on("click",function(){
		var rgb = $(this).css('backgroundColor');
		var color = rgb2hex(rgb);
		if(color == "#107fc9"){
			$(this).css("background-color","#007A3D");
			var id = this.id;
			taken_array[j] = id;
			j++;
			addItem(id,"#007A3D");
		}
		else if(color == "#007a3d"){
			$(this).css("background-color","#107FC9" );
			var id = this.id;
			var index = taken_array.indexOf(id);
			taken_array.splice(index,1);
			removeItem(id,"#107FC9");
		}

	});
}

// RGG TO HEX COLOR CONVERTER
function rgb2hex(rgb) {
    rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
    function hex(x) {
        return ("0" + parseInt(x).toString(16)).slice(-2);
    }
    return "#" + hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]);
}

$(document).ready(function(){
	$("#help").click(function(){
		$("#helper").fadeIn();
		var title = ("HELP").fontsize(7);
		var page2 = ("Page 2 : Select your current major").fontsize(5);
		var page3 = ("Page 3 : Select which classes you are taking in your current semester").fontsize(5);
		var page4 = ("Page 4 : Select the times during the week that you work").fontsize(5);
		var page5 = ("Page 5 : View the classes you can take in standard view, pdf form, or calendar view").fontsize(5);
		document.getElementById("help_text").innerHTML = title + "<br/>" + page2 +'<br/>' + page3 + "<br/>" + page4 + "<br/>" + page5;

		$("#close").click(function(){
			$("#helper").fadeOut();
		});

	});

	// GENERATE PDF
	$("#complete").click(function(){
		var doc = new jsPDF();
		var source = $('.ready').html();
		var specialElementHandlers = {
	            '#bypassme': function (element, renderer) {
	                return true;
	            }
	        };
	        doc.fromHTML(source, 0.5, 0.5, {
	            'width': 75,'elementHandlers': specialElementHandlers
	        });

		doc.save('GradPlan.pdf');

  	});
});

function next(){
	// FROM CLASSES PAGE TO WORK PAGE - 4
	if(next_first == 0){
		$("#main_page").hide();
		$("#work_page").show();
		$("#third").removeClass("active");
		$("#third").addClass("previous visited");
		$("#fourth").addClass("active");
		$("#fifth").addClass("next");
		next_first = 1;
		previous_first = 1;
	}
	// WORK PAGE TO SUBMIT PAGE
	else if(next_first == 1){
		$("#work_page").hide();
		$("#submit_page").show();
		$("#fourth").removeClass("active");
		$("#fourth").addClass("previous visited");
		$("#fifth").removeClass("next");
		$("#fifth").addClass("active");
		$("#next").hide();
		$("#previous").hide();
		tableCreate();
	}
}

function previous(){
	// FROM CLASSES PAGE TO MAJOR PAGE - 2
	if(previous_first == 0){
		clearArray();
		listMajors();
		$("#second").removeClass("previous visited");
		$("#second").addClass("active");
		$("#third").removeClass("active");
		$("#third").addClass("next");
		$("#fourth").removeClass("next");
		$("#next").hide();
		$("#previous").hide();
	}
	// FROM WORK PAGE TO CLASSES PAGE - 3
	else if(previous_first == 1){
		$("#work_page").hide();
		$("#main_page").show();
		$("#third").removeClass("previous visited");
		$("#third").addClass("active");
		$("#fifth").removeClass("next");
		$("#fourth").removeClass("active")
		$("#fourth").addClass("next");
		previous_first = 0;
		next_first = 0;
	}
}

// ADD ITEM TO CLASSES TAKEN ARRAY
function addItem(id,color){
	for(var k in major){
		if(id == k){
			for(var i=0; i<major[k].length;i++){
				$("#"+major[k][i]).css("background-color",color);
				if(checkArray(major[k][i])){
					taken_array[j] = major[k][i];
					j++;
				}
				addItem(major[k][i], color);
			}
		}
	}
}

// REMOVE ITEM FROM CLASSES TAKEN ARRAY
function removeItem(id,color){
	for(var k in major){
		for(var i=0; i<major[k].length;i++){
			if(id == major[k][i]){
				$("#"+k).css("background-color",color);
				for(var j=0; j<taken_array.length; j++){
					if(k == taken_array[j]){
						var index = taken_array.indexOf(k);
						taken_array.splice(index,1);
					}
				}
				removeItem(k,color);
			}
		}
	}
}

// CHECK IF CLICKED ITEM IS ALREADY IN CLASS TAKEN ARRAY
function checkArray(checkedItem){
	for(var i=0; i<taken_array.length;i++){
		if(checkedItem == taken_array[i] || checkedItem == ""){
			return false;
		}
	}
	return true;
}

// CLEAR BOTH ARRAYS
function clearArray(){
	taken_array.length = 0;
	total_array.length = 0;
}

// CREATE TABLE
function tableCreate(){
	var not_taken = total_array.filter(function(obj) { return taken_array.indexOf(obj) == -1; });
	var ready = getCurrent(not_taken);
	data = "";
	for(var i=0; i<ready.length; i++){
		var url = "www.csun.edu";
		for(var k in computerScience_links){
			if(ready[i] == k){
				url = computerScience_links[k];
			}
		}
		var day = "";
		var teacher = "";
		var building = "";
		var time = "";
		for(var k in computerScience_classes){
			if(ready[i] == k){
				day = computerScience_classes[k][0];
				teacher = computerScience_classes[k][1];
				building = computerScience_classes[k][2];
				time = computerScience_classes[k][3];
			}
		}
		data += "<ul>";
		data += "<li>"+ready[i].split("_").join(" ");+"</li>";
		data += '<li>'+day+'</li>';
		data += '<li>'+time+'</li>';
		data += '<li>'+teacher+'</li>';
		data += "<li>"+building+"</li>";
		data += '<li><a href='+url+' target="_blank" class="link_now">View Class</a></li>';
		data += "</ul>";
	}
	$(".ready").append(data);

	$("#calendar").on('click',function(){
		location.href="calendar.html";
	});
}

// RETURN CURRENT LIST OF CLASSES THAT STUDENT CAN TAKE
function getCurrent(not_taken){
	var ready_array = [];
	ready_array.length = 0;
	var r = 0;
	for(var k in major){
		for(var i=0; i<not_taken.length; i++){
			if(k == not_taken[i]){
				if(major[k].every(checkTaken)){
					ready_array[r] = k;
					r++;
				}
			}
		}
	}
	return ready_array;
}

function checkTaken(item){
	for(var j=0; j<taken_array.length; j++){
		if(item == taken_array[j] || item == ''){
			return true;
		}
	}
	return false;
}
