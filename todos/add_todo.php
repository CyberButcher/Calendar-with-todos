<?php
session_start();
require_once '../connect.php';

if (isset($_SESSION['user'])) {
    if($_SESSION['user']['role'] == 1 || $_SESSION['user']['role'] == 2){
        $query = "INSERT INTO calendar2_todos (title, user_id, `date`, `time`, group_id)
        VALUES (:title, :user_id, :date, :time, (SELECT id FROM calendar2_groups WHERE `token` = :group_token));";
        $queryPrep = $conn->prepare($query);
        $queryPrep->execute(['title'=>'', 'user_id'=>$_POST['user_id'], 'date'=> $_POST['date_time'][0], 'time'=> $_POST['date_time'][1], 'group_token'=> $_POST['group_token']]);
    } else {
        echo 'Недостаточный уровень доступа!';
    }
} else {
    echo 'Войдите в аккаунт!';
}