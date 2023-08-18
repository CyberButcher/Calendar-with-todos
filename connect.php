<?php 

$user = "";
$pass = "";
$host = "";
$db_name = "";

try {
    $conn = new PDO("mysql:host=$host;charset=utf8mb4;dbname=$db_name", $user, $pass);
    $conn->exec("SET time_zone='+05:00';");

} catch (PDOException $e) {
    print "Error!: " . $e->getMessage() . "<br/>";
    die();
}