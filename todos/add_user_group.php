<?php

require_once '../connect.php';

$query = "INSERT INTO calendar2_groups (`name`, `token`) VALUES (:name, '".bin2hex(random_bytes(16))."');
SET @group_id = LAST_INSERT_ID();
INSERT INTO calendar2_user_groups (user_id, group_id, role_id)
VALUES (:user_id, @group_id, 1);";
$queryPrep = $conn->prepare($query);
$queryPrep->execute(['name'=>$_POST['group_name'], 'user_id'=>$_POST['user_id']]);

echo 'Группа создана!';