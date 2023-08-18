<?php
session_start();
require_once '../connect.php';
require_once 'auth_check.php';

//session_logout($conn, $_SESSION['user']['id']);
if(isset($_SESSION['user'])){
    unset($_SESSION['user']);
}
//header('Location: index.php');