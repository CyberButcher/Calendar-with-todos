<?php
require_once("../connect.php");
require_once("auth_check.php");


$data = array(
    trim(str_replace('  ', ' ', $_POST['name'])),
    trim($_POST['mail']),
    $_POST['pass']
);

foreach ($data as $value) {
    if($value == '' || $value == ' ' || empty($value))
    {
        echo 'Введите данные';
        exit();
    }
}

if(strlen($data[0]) < 4)
{
    echo 'Минимум 4 символа в имени!';
    exit();
}

if (!filter_var($data[1], FILTER_VALIDATE_EMAIL)) {
    echo 'Некорректно введена почта!';
    exit();
}

reg_check($conn, $data[0], $data[1]);

$data[2] = password_hash($data[2], PASSWORD_BCRYPT);

$query = "INSERT INTO `to_do_list_users`(`name`, `login`, `pass`) VALUES (:name, :login, :pass)";
$queryPrep = $conn->prepare($query);
$queryPrep->execute(['name'=>$data[0], 'login'=>$data[1], 'pass'=>$data[2]]);

echo 'Пользователь успешно зарегистрирован!';
// foreach ($data as $value) {
//     print_r($value); echo "<br>";
// }
//echo '<br><a href = "index.php"><-Вход</a>';
