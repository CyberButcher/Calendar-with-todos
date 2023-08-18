<?php

require_once '../connect.php';

$query = "SELECT calendar2_todos.*
FROM calendar2_todos
JOIN calendar2_groups ON calendar2_todos.group_id = calendar2_groups.id
WHERE calendar2_groups.token = '".$_POST['group_token']."' AND calendar2_todos.date = ". '\''.$_POST['date_time'][0].'\'';
$queryPrep = $conn->prepare($query);
$queryPrep->execute();

$errInfo = $queryPrep->errorInfo();
if($errInfo[0] !== PDO::ERR_NONE){
    echo $errInfo[2];
    exit();
}
$res = $queryPrep->fetchAll();

if (empty($res)){
    echo 'no todos';
} else {
    echo json_encode($res);
}