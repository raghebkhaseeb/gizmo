<?php
include './wp-load.php';

// print_r(is_user_logged_in());

$action = NULL;

if(array_key_exists('action', $_GET)){
  $action = $_GET['action'];  
}

if($action == NULL){
    die(0);
}



function loadDevices(){
		global $wpdb;		
		return $wpdb->get_results("SELECT * from gp_brands");
 }
 
 function loadCarriers(){
     global $wpdb;
     return $wpdb->get_results("SELECT * from gp_carrier");
 }
 
 $result = NULL;
 if($action == 'load_brands'){
     $result = loadDevices();
 }else if($action == 'load_carriers'){
     $result = loadCarriers();
 }
 
 if($result == NULL){
     die(0);
 }
 

 header('Content-Type: application/json');
 echo json_encode($result);
?>