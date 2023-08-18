<?php

require_once '../connect.php';

$query = "SELECT calendar2_todos.*
FROM calendar2_todos
JOIN calendar2_groups ON calendar2_todos.group_id = calendar2_groups.id
WHERE calendar2_groups.token = '".$_GET['group_token']."'";
$queryPrep = $conn->prepare($query);
$queryPrep->execute();

$errInfo = $queryPrep->errorInfo();
if($errInfo[0] !== PDO::ERR_NONE){
    echo $errInfo[2];
    exit();
}
$res = $queryPrep->fetchAll();

echo json_encode($res);