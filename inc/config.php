<?php
    $hostname = getenv('HOSTNAME');
    $username = getenv('USERNAME');
    $password = getenv('PASSWORD');
    $database = getenv('DATABASE');

    $conn = mysqli_connect($hostname, $username, $password, $database);

    if (!$conn) {
        
        die("Connection failed: " . mysqli_connect_error());
        return "500";
    }else{
        
        return 200;
    }
?>