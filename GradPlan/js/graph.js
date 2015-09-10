window.addEventListener("load", init, false);

var checkbox_container;
var dropdown;
var create = true;
var dropdown_value;
var checked_array = [];
var major_obj;
var count = 0;
var temp_array = [];
var values_array = [];
var keys_array = [];
var body, tbl, tbdy;

function init(){
	dropdown = document.getElementById("dropdown");
	dropdown.addEventListener("change",changeHandler);
	checkbox_container = document.getElementById('checkbox');
	$("#submit").hide();
	document.getElementById("submit").addEventListener("click", submitClicked, false);
}

function submitClicked(){
	$("#submit").hide();
	for (var p in major_obj) {
		for(var i=0; i<checked_array.length; i++){
			if( major_obj.hasOwnProperty(p) ) {
				if(checked_array[i] == major_obj[p]){
					delete major_obj[p];
					delete p;
				}
	    	} 	
		}
	} 

	var k = 0;
	for(var p in major_obj){
		if(major_obj.hasOwnProperty(p)){
			values_array[k] = major_obj[p];
			keys_array[k] = p;
			k++;
		}
	}

	for(var i=0; i<keys_array.length; i++){
		keys_array[i] = keys_array[i].substr(0,8);
	}

	tableCreate();

	var l=0;
	for(var i=0; i<values_array.length;i++){
		if(values_array.indexOf(keys_array[i]) <= -1){
			temp_array[l] = values_array[i];
			l++;	
		}
	}

	for(var i=0; i<4; i++){
		console.log(temp_array);
		temp();
		createColumn();	
	}
}

function temp(){
	var l=0;
	for(var i=0; i<values_array.length;i++){
		if(keys_array.indexOf(temp_array[i]) <= -1){
			temp_array[l] = values_array[i];
			l++;	
			if(l == 4){
				break;
			}
		}
	}	
}

function tableCreate() {
    body = document.getElementsByTagName('body')[0];
    tbl = document.createElement('table');
    tbl.setAttribute('border', '1');
    tbdy = document.createElement('tbody');
}

function createColumn(){
    for (var i = 0; i < 1; i++) {
        var tr = document.createElement('tr');
        for (var j = 0; j < 4; j++) {
            var td = document.createElement('td');
            tr.appendChild(td);
            td.innerHTML = temp_array[j];
        }
        tbdy.appendChild(tr);
    }
    tbl.appendChild(tbdy);
    body.appendChild(tbl);
}

function changeHandler(){
	dropdown_value = dropdown.options[dropdown.selectedIndex].value;
	document.getElementById("checkbox").innerHTML = "";
	$("#submit").hide();
	if(dropdown_value != "select"){
		callPHP("create", dropdown_value, "First");
	}
}

function callPHP(action, major, checked){
	$.ajax({
		type : 'POST',
		url: 'php/major.php',
		data: {
			checked_item : checked,
			action: action,
			chosen_major: major,
		},
		success: function(response){
			var data = $.parseJSON(response);
			major_obj = data.total;
			if(create)
				createElements(data);
			else
				deleteElements(data);
		},
		error: function(jqXHR, textStatus, errorThrown) {
	        console.log(textStatus, errorThrown);
	    }
	});	
}

function createElements(data){
	for(var i=0; i<data.values.length;  i++){
		var checkbox = document.createElement("input");
		checkbox.type = 'checkbox';
		checkbox.name = data.values[i];
		checkbox.value = data.values[i];
		checkbox.id = data.values[i];
	
		checkbox.onclick = function(){
			if(document.getElementById(this.id).checked){
				checked_array[count] = this.value;
				count++;
				callPHP("create", dropdown_value, this.name);
			}
			else{
				create = false;
				callPHP("delete", dropdown_value, this.name);
			}
		}

		var label = document.createElement('label')
		label.id = checkbox.id + " label";
		label.htmlFor = data.values[i];
		label.appendChild(document.createTextNode(data.values[i]));
		checkbox_container.appendChild(checkbox);
		checkbox_container.appendChild(label);
		var br = document.createElement("br");
		br.id = checkbox.id + " break";
		checkbox_container.appendChild(br);
		$("#submit").show();
	}	
}

function deleteElements(data){
	for(var i=0; i<data.values.length; i++){
		if(document.getElementById(data.values[i])){
			document.getElementById(data.values[i]).remove();
			document.getElementById(data.values[i] + " label").remove();
			document.getElementById(data.values[i] + " break").remove();	
		}
	}
	create = true;
}


