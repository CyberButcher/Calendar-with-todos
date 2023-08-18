<?php
session_start();
require_once("../connect.php");
require_once("auth_check.php");

if(!empty($_POST['login'])&&!empty($_POST['pass'])){
    $data = array(
        trim($_POST['login']),
        $_POST['pass']
    );
}
if(empty($_POST['login'])||empty($_POST['pass'])){
    echo 'Заполните все поля! '; exit();
}

$query = "SELECT * FROM `to_do_list_users` WHERE `login` = :login2";
$queryPrep = $conn->prepare($query);
$queryPrep->execute(['login2'=>$data[0]]);
$errInfo = $queryPrep->errorInfo();

if($errInfo[0] !== PDO::ERR_NONE){
    echo $errInfo[2];
    exit();
}

$res = $queryPrep->fetch();

if(empty($res) || !password_verify($_POST['pass'], $res['pass'])){
    echo 'Неправильный логин или пароль!';
    exit();
}

$_SESSION['user'] = [
    'id' => $res['id'],
    'name' => $res['name'],
    'login' => $res['login']
];

//session_check($conn, $res['id']);

//echo 'success auth';
echo json_encode($_SESSION['user']);
//header('Location: profile.php');