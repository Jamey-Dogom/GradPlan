<?php

	require('list.php');

	$checked_item = $_POST['checked_item'];
	$action = $_POST['action'];
	$major = $_POST['chosen_major'];
	$count = 0;

	$return_array = array();
	$value_array = array();

	switch($major){
		case "computerScience":
			$major = $computerScience;
			break;
		case "marketing":
			$major = $marketing;
			break;
	}
	if($action == "create"){
		if($checked_item == "First"){
			foreach($major as $key => $value) {
				$keysub = substr($key, 0,4);
	 			if($keysub == "None"){
	 			 	$value_array[$count] = $value;
	 				$count += 1;	
	 			}
			}
		}
		else{
			reset($return_array);
			reset($value_array);
			foreach($major as $key => $value){
				$keysub = substr($key, 0,8);
				if($checked_item == $keysub){
					$value_array[$count] = $value;
					$count += 1;
				}
			}
		}
	}
	else if($action == "delete"){
		reset($return_array);
		reset($value_array);
		$i = 0;
		foreach($major as $key => $value){
			$keysub = substr($key, 0,8);
			if($checked_item == $keysub){
				$value_array[$count] = $value;
				$count += 1;
			}
			if($value_array[$i] == $keysub){
				$value_array[$count] = $value;
				$count += 1;	
			}
		}
	}

	$return_array['values'] = $value_array;
	$return_array['total'] = $major;
	echo json_encode($return_array);

?>