<?php
session_start();
require_once '../connect.php';

if (isset($_SESSION['user'])) {
    if($_SESSION['user']['role'] == 1 || $_SESSION['user']['role'] == 2){
        $query = "UPDATE `calendar2_todos` SET `title` = :title, `text` = :text WHERE `id` = ".$_POST['task_id'];
        $queryPrep = $conn->prepare($query);
        $queryPrep->execute(['title'=>$_POST['title'], 'text'=>$_POST['text']]);

        echo $queryPrep->rowCount();
    } else {
        echo 'Недостаточный уровень доступа!';
    }
} else {
    echo 'Войдите в аккаунт!';
}