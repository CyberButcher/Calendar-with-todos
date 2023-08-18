<?php

require_once '../connect.php';

$query = "SELECT `id` FROM `calendar2_todos`";
$queryPrep = $conn->prepare($query);
$queryPrep->execute();

$errInfo = $queryPrep->errorInfo();
if($errInfo[0] !== PDO::ERR_NONE){
    echo $errInfo[2];
    exit();
}
$res = $queryPrep->fetchAll();

echo json_encode($res);