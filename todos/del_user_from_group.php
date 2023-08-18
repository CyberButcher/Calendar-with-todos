<?php 
session_start();
require_once '../connect.php';

if($_SESSION['user']['role'] == 1){
    $query = "DELETE FROM calendar2_user_groups
    WHERE user_id = (SELECT id FROM to_do_list_users WHERE login = :login)
    AND group_id = (SELECT id FROM calendar2_groups WHERE token = :token);";
    $queryPrep = $conn->prepare($query);
    $queryPrep->execute(['login'=>$_POST['user_login'], 'token' => $_POST['group_token']]);

    echo 'Пользователь удалён!';
} else {
    echo 'Недостаточный уровень доступа!';
}