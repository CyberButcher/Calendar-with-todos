<?php

function reg_check($conn, $name, $mail){
    $query = "SELECT `name`, `login` FROM `to_do_list_users` WHERE :name = `name` OR :login = `login`";
    $queryPrep = $conn->prepare($query);
    $queryPrep->execute(['name'=>$name, 'login'=>$mail]);

    $errInfo = $queryPrep->errorInfo();
    if($errInfo[0] !== PDO::ERR_NONE){
        echo $errInfo[2];
        exit();
    }

    $res = $queryPrep->fetch();

    if(!empty($res)){
        if($res[0] == $name){
            echo 'Данное имя уже существует!<br>';
        }
        if($res[1] == $mail){
            echo 'Данный email уже зарегистрирован!<br>';
        }
        die();
    }
}

function session_check($conn, $user_id){
    $query = "SELECT * FROM `to_do_list_sessions` WHERE user_id = $user_id";
    $queryPrep = $conn->prepare($query);
    $queryPrep->execute();

    $errInfo = $queryPrep->errorInfo();
    if($errInfo[0] !== PDO::ERR_NONE){
        echo $errInfo[2];
        exit();
    }

    $res = $queryPrep->fetch();
    if(!empty($res)){
        $query = "UPDATE `to_do_list_sessions` SET user_id = $user_id, `time` = '".date("Y-m-d H:i:s")."' WHERE user_id = $user_id";
        $queryPrep = $conn->prepare($query);
        $queryPrep->execute();

        $errInfo = $queryPrep->errorInfo();
        if($errInfo[0] !== PDO::ERR_NONE){
            echo $errInfo[2];
            exit();
        }
    } else {
        $query = "INSERT INTO `to_do_list_sessions`(`user_id`) VALUES ($user_id)";
        $queryPrep = $conn->prepare($query);
        $queryPrep->execute();

        $errInfo = $queryPrep->errorInfo();
        if($errInfo[0] !== PDO::ERR_NONE){
            echo $errInfo[2];
            exit();
        }
    }
}

function session_logout($conn, $user_id){
    $query = "SELECT * FROM `to_do_list_sessions` WHERE user_id = $user_id";
    $queryPrep = $conn->prepare($query);
    $queryPrep->execute();

    $errInfo = $queryPrep->errorInfo();
    if($errInfo[0] !== PDO::ERR_NONE){
        echo $errInfo[2];
        exit();
    }
    $res = $queryPrep->fetch();

    if(!empty($res)){
        $session_id = $res['id'];
        $query = "DELETE FROM `to_do_list_sessions` WHERE id =  $session_id";
        $queryPrep = $conn->prepare($query);
        $queryPrep->execute();

        $errInfo = $queryPrep->errorInfo();
        if($errInfo[0] !== PDO::ERR_NONE){
            echo $errInfo[2];
            exit();
        }
    }
}