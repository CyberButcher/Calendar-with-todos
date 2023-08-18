<?php
session_start();
require_once '../connect.php';

if (isset($_SESSION['user'])) {
    if($_SESSION['user']['role'] == 1 || $_SESSION['user']['role'] == 2){
        $query = "DELETE FROM `calendar2_todos` WHERE `id` = ".$_POST['task_id'];
        $queryPrep = $conn->prepare($query);
        $queryPrep->execute();
    } else {
        echo 'Недостаточный уровень доступа!';
    }
} else {
    echo 'Войдите в аккаунт!';
}