<?php
session_start();
require_once '../connect.php';

if (isset($_SESSION['user'])) {
    $query = "SELECT calendar2_user_groups.group_id, calendar2_groups.name, calendar2_groups.token, calendar2_user_groups.role_id
    FROM calendar2_user_groups
    JOIN to_do_list_users ON to_do_list_users.id = calendar2_user_groups.user_id
    JOIN calendar2_groups ON calendar2_groups.id = calendar2_user_groups.group_id
    WHERE to_do_list_users.login = '".$_POST['user_login']."'";

    $queryPrep = $conn->prepare($query);
    $queryPrep->execute();

    $errInfo = $queryPrep->errorInfo();
    if($errInfo[0] !== PDO::ERR_NONE){
        echo $errInfo[2];
        exit();
    }
    $res = $queryPrep->fetchAll();

    if (empty($res)){
        echo 'no groups';
    } else {
        echo json_encode($res);
    }
} else {
    echo 'Войдите в аккаунт!';
}