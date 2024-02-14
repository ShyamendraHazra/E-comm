<?php

    $config_Status = require "config.php";
    
    
    $qry = "SELECT * FROM demo";
    
    $qry_res = mysqli_query($conn, $qry);
    
    
    $response = array();

    while($row = mysqli_fetch_assoc($qry_res)) {
        array_push($response,$row);
    }
    
    header("Content-Type: application/json");

    $response_JSON = json_encode($response);

    http_response_code($config_Status);
    print_r($response_JSON);