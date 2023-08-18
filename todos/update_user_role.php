<?php
session_start();
require_once '../connect.php';

if (isset($_SESSION['user'])) {
    if($_SESSION['user']['role'] == 1){
        $query = "UPDATE calendar2_user_groups
        SET role_id = :role_id
        WHERE user_id = (SELECT id FROM to_do_list_users WHERE `login` = :login)
        AND group_id = (SELECT id FROM calendar2_groups WHERE token = :token)"; 

        $queryPrep = $conn->prepare($query);
        $queryPrep->execute(['role_id' => $_POST['role_id'], 'login' => $_POST['user_login'], 'token' => $_POST['group_token']]);

        $errInfo = $queryPrep->errorInfo();
        if($errInfo[0] !== PDO::ERR_NONE){
            echo $errInfo[2];
            exit();
        }
        //$res = $queryPrep->fetchAll();

        echo 'Роль пользователя обновлена!';
    } else {
        echo 'Недостаточный уровень доступа!';
    }
    // if (empty($res)){
    //     echo 'no user';
    // } else {
    //     echo json_encode($res);
    // }
} else {
    echo 'Войдите в аккаунт!';
}