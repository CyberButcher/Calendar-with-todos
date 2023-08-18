<?php
session_start();
require_once '../connect.php';


if (isset($_SESSION['user'])) {
    $query = "UPDATE `calendar_todos` SET `title` = :title WHERE `id` = " . $_POST['task_id'];
    $queryPrep = $conn->prepare($query);
    $queryPrep->execute(['title'=> $_POST['title']]);
} else {
    echo 'Войдите в аккаунт!';
}