<?php session_start();?>
<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8">
    <title>Календарь</title>
    <link rel="stylesheet" href="style.css">
    <link rel="stylesheet" href="header_styles.css">
    <link rel="stylesheet" href="todos.css">
    <link rel="stylesheet" href="task.css">
    <link rel="stylesheet" href="profile_form.css">
    <link rel="stylesheet" href="https://code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css">
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script src="https://code.jquery.com/ui/1.12.1/jquery-ui.min.js"></script>
    <!-- <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.2.0/jquery.min.js"></script> -->
</head>

<body>
    <?php require_once 'header.php'; ?>
    <?php require_once 'view/login_form.php'; ?>
    <?php require_once 'view/reg_form.php'; ?>
    <?php require_once 'view/profile_form.php'; ?>
    <?php require_once 'view/selected_calendar_form.php'; ?>
    <div class="main_group_title" style="display: none;">
        <h1>Название</h1> <div class="main_group_token" style="display: none;"></div>
    </div>

    <div class="no_forms_text_noauth">
        Войдите в аккаунт для начала работы! &#128523;
    </div>
    <div class="no_forms_text_auth" style="display: none;">
        Выберите календарь для начала работы! &#128513;
    </div>
    <div class="forms" style="display: none;">
        <div class="calendar">
            <div class="change_month">
                <div class="prev">&#10094;</div>
                    <div class="month">
                        <h1></h1>
                    </div>
                <div class="next">&#10095;</div>
            </div>
            
            <div class="weekdays">
                <div>Пн</div>
                <div>Вт</div>
                <div>Ср</div>
                <div>Чт</div>
                <div>Пт</div>
                <div>Сб</div>
                <div>Вс</div>
            </div>
            <div class="days">
            </div>
        </div>
        <div class="button-move right">
            <button class="button">
                <span class="arrow"></span>
            </button>
        </div>
        <?php require_once 'view/todos_form.php'; ?>
        <?php require_once 'view/task_form.php'; ?>
    </div>
    <!-- <div id="page-content">test</div> -->
    <div class="login_form_overlay"></div>
    <script src="js/todos.js"></script>
    <script src="js/forms.js"></script><script src="js/funcs.js"></script>
    <script src="js/profile.js"></script>
    <script src="js/auth.js"></script>
    
    <script src="js/script.js"></script>
    
</body>

</html>