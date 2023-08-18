<?php

require_once '../connect.php';

$query = "SELECT `c`.`title`, `c`.`text`, `u`.`name` FROM `calendar2_todos` c ".
"JOIN `to_do_list_users` u ON `c`.`user_id` = `u`.`id` WHERE `c`.`id` =  ".$_POST['task_id'];

$queryPrep = $conn->prepare($query);
$queryPrep->execute();

$errInfo = $queryPrep->errorInfo();
if($errInfo[0] !== PDO::ERR_NONE){
    echo $errInfo[2];
    exit();
}
$res = $queryPrep->fetchAll();

echo json_encode($res);