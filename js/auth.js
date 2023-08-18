$(document).ready(function() {

    function isJSON(str) {
        try {
          JSON.parse(str);
          return true;
        } catch (e) {
          return false;
        }
    }

    function headerDataCheck(username){
        $.ajax({
            type: 'GET',
            url: './header.php',
            success: function() {
                $('header .username').text(username);
            },
            error: function(xhr, status, error) {
            console.log(xhr.responseText);
            }
        });

        $.ajax({
            type: 'GET',
            url: './auth/profile.php',
            success: function(data) {
            if (data == 'inAcc') {
                $('.header_profile').show();
                $('.header_auth').hide();
            } else {
                $('.header_auth').show();
                $('.header_profile').hide();
            }
            },
            error: function(xhr, status, error) {
            console.log(xhr.responseText);
            }
        });
    }
    headerDataCheck();

    $('#login-button').click(function(event) {
        event.preventDefault(); 
        var form = $('#login-form');
        var formData = form.serialize(); 
        $.ajax({
            type: 'POST',
            url: './auth/login_in.php', 
            data: formData,
            success: function(response) {  
                if(isJSON(response)){
                    response = JSON.parse(response); 
                     
                    if('login' in response && 'name' in response && 'id' in response){ console.log(response['name'], response['login']);
                        headerDataCheck(response['name']); 
                        profile(response['name'], response['login']);
                        document.querySelector('.login_form').classList.remove('show');
                        document.querySelector('.login_form_overlay').classList.remove('show');
                        document.querySelector('.no_forms_text_auth').style.display = 'flex';
                        document.querySelector('.no_forms_text_noauth').style.display = 'none';
                    } 
                } else {
                    $('#auth_res').html(response);
                }
            },
            error: function(xhr, status, error) {
                console.log(xhr.responseText);
            }
        });
    });
    
    $('#reg-button').click(function(event) {
        event.preventDefault(); 
        var form = $('#reg-form');
        var formData = form.serialize(); 
        $.ajax({
            type: 'POST',
            url: './auth/reg.php', 
            data: formData,
            success: function(response) {
                if(response === 'Пользователь успешно зарегистрирован!'){
                    document.querySelector('.reg_form').classList.remove('show');
                    document.querySelector('.reg_form_success').classList.add('show');
                    form[0].reset();
                    $('#auth_res_reg').html(' ');
                } else {
                    $('#auth_res_reg').html(response);
                }
            },
            error: function(xhr, status, error) {
                console.log(xhr.responseText);
            }
        });
    });

    $('#exitbtn').click(function(event) {
        $.ajax({
            type: 'GET',
            url: './auth/logout.php',
            success: function() {
                headerDataCheck();
                document.querySelector('.forms').style.display = 'none';
                document.querySelector('.main_group_title').style.display = 'none';
                document.querySelector('.no_forms_text_auth').style.display = 'none';
                document.querySelector('.no_forms_text_noauth').style.display = 'flex';
            },
            error: function(xhr, status, error) {
            console.log(xhr.responseText);
            }
        });
    });
});
