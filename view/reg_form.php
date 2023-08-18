<div class="reg_form">
    <form id="reg-form" method="post">
        <h1>Регистрация</h1>
        <input type="text" name="name" placeholder="Имя" required>
        <input type="text" name="mail" placeholder="Почта" required>
        <input type="password" name="pass" placeholder="Пароль" required>
        <button type="submit" id="reg-button">Зарегистрироваться</button>
        <div id="auth_res_reg"></div>
    </form>
</div>
<div class="reg_form_success">
    <p>Пользователь успешно зарегистрирован!</p>
    <button class="close">Ок</button>
</div>