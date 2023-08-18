<?php 
session_start();
require_once '../connect.php';

$query = "SELECT id FROM to_do_list_users WHERE `login` = :login"; 
$queryPrep = $conn->prepare($query);
$queryPrep->execute(['login'=>$_POST['user_login']]);
$res = $queryPrep->fetchAll();

if($_SESSION['user']['role'] == 1){
    if(!empty($res)){
        $query = "INSERT INTO calendar2_user_groups (user_id, group_id, role_id)
        SELECT to_do_list_users.id, calendar2_groups.id, :role_id
        FROM to_do_list_users, calendar2_groups
        WHERE to_do_list_users.login = :login
        AND calendar2_groups.token = :token
        AND NOT EXISTS (
            SELECT 1
            FROM calendar2_user_groups
            WHERE user_id = to_do_list_users.id
            AND group_id = calendar2_groups.id
        )
        LIMIT 1";
        $queryPrep = $conn->prepare($query);
        $queryPrep->execute(['login'=>$_POST['user_login'], 'role_id'=>3, 'token' => $_POST['group_token']]);

        echo 'Пользователь добавлен к группе!';
    } else {
        echo 'Пользователь не найден!';
    }
} else {
    echo 'Недостаточный уровень доступа!';
}