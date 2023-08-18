


function profile(username, login){

    if(username !== 'reset'){
    $.ajax({
        type: 'GET',
        url: './index.php',
        success: function() {//console.log(document.querySelector('.profile_data label[for="name_data"]'));
            document.querySelector('.profile_data label[for="name_data"]').textContent = 'Имя: ' + username;
            document.querySelector('.profile_data label[for="login_data"]').textContent = 'Почта: ' + login;
            loadUserCalendars();
        },
        error: function(xhr, status, error) {
        console.log(xhr.responseText);
        }
    });}

    const user_name = document.querySelector('.header_profile .username'); 
    const profile_form = document.querySelector('.profile_form_area');
    const profile_form_closeBtn = document.querySelector('.top_closeBtn button');
    const calendar_form = document.querySelector('.calendar_form_area');
    const addCalendarBtn = document.querySelector('.addCalendarBtn');
    const calendar_form_cancelBtn = document.querySelector('.calendar_form_cancelBtn'); 
    const calendar_form_saveBtn = document.querySelector('.calendar_form_saveBtn');

    if(username === 'reset'){ 
        loadUserCalendars();
        if(document.querySelector('.username').textContent == 'Guest'){
            document.querySelector('.no_forms_text_noauth').style.display = 'flex';
            document.querySelector('.no_forms_text_auth').style.display = 'none';
        } else {
            document.querySelector('.no_forms_text_noauth').style.display = 'none';
            document.querySelector('.no_forms_text_auth').style.display = 'flex';
        }
    }

    user_name.onclick = ()=>{
        profile_form.classList.add('show');
        document.querySelector('.login_form_overlay').classList.add('show');
    }

    profile_form_closeBtn.onclick = ()=>{
        profile_form.classList.remove('show');
        document.querySelector('.login_form_overlay').classList.remove('show');
    }

    document.querySelector('.add_user').onclick = ()=>{
        if(document.querySelector('input[name="userLogin"]').value.trim() != ''){
            addUserToCalendar();
            document.querySelector('input[name="userLogin"]').value = '';
        }
    }

    document.querySelector('.change_user_role').onclick = ()=>{
        document.querySelectorAll('.available_users_list li').forEach(function(li) {
            if(li.classList.contains('selected')){
                if(li.textContent.match(/-\s(.+)$/)[1] == 'Читатель'){
                    changeUserRole(li, 2);
                }
                if(li.textContent.match(/-\s(.+)$/)[1] == 'Редактор'){
                    changeUserRole(li, 3);
                }
            }
        });
        // if(document.querySelector('input[name="userLogin"]').value.trim() != ''){
        //     changeUserRole();
        // }
    }

    document.querySelector('.del_user').onclick = ()=>{
        document.querySelectorAll('.available_users_list li').forEach(function(li) {
            if(li.classList.contains('selected')){
                delUserFromCalendar(li);
            }
        });
    }

    addCalendarBtn.onclick = ()=>{
        document.querySelector('.calendar_form input[name="title"]').removeAttribute('readonly');
        calendar_form_saveBtn.classList.remove('notNew');
        document.querySelector('.calendar_form input[name="title"]').value = '';
        calendar_form.classList.add('show');
    }

    calendar_form_cancelBtn.onclick = ()=>{
        calendar_form.classList.remove('show');
    }

    calendar_form_saveBtn.onclick = ()=>{
        
        
        if(!calendar_form_saveBtn.classList.contains('notNew')){
            if(document.querySelector('input[name="title"]').value.trim() != ''){
                calendar_form.classList.remove('show');
                profile_form.classList.remove('show');
                document.querySelector('.login_form_overlay').classList.remove('show');
                addUserCalendar();
                loadUserCalendars();
                //openUserCalendar();
            }
        } else {
            calendar_form.classList.remove('show');
            profile_form.classList.remove('show');
            document.querySelector('.login_form_overlay').classList.remove('show');
            openUserCalendar();
        }
    }
}

function loadUserCalendars(){

    $.ajax({
        url: "./todos/get_user_groups.php",
        type: "POST",
        data: {
          user_login: document.querySelector('.profile_data label[for="login_data"]').textContent.replace('Почта: ', '')
        },
        dataType: 'text',
        success: function(response) {//console.log(response);
            if(response == 'no groups' || response == 'Войдите в аккаунт!'){
                console.log(response);
            } else {
                response = JSON.parse(response);
                console.log(response);

                $('.user_calendars').empty();

                $.each(response, function(key, group) {
                    let calendar = document.createElement('div');
                    calendar.classList.add('user_calendar');

                    let calendar_label = document.createElement('label');
                    calendar_label.textContent = group.name;
                    calendar_label.id = group.token;
                    if(group.role_id == 1){
                        calendar_label.style.color = 'rgb(238, 100, 36)';
                    }
                    calendar.appendChild(calendar_label);

                    $('.user_calendars').append(calendar);
                });

                let labels = document.querySelectorAll('.user_calendar label');
                labels.forEach(function(label) {
                    label.onclick = ()=>{
                        document.querySelector('.calendar_form input[name="title"]').value = label.textContent;
                        document.querySelector('.calendar_form .calendar_form_token').textContent = label.id;
                        document.querySelector('.calendar_form input[name="title"]').setAttribute('readonly', 'readonly');
                        document.querySelector('.calendar_form_saveBtn').classList.add('notNew');

                        $.ajax({
                            url: "./todos/get_user_role_in_group.php",
                            type: "POST",
                            data: {
                              user_login: document.querySelector('.profile_data label[for="login_data"]').textContent.replace('Почта: ', ''),
                              group_token: label.id
                            },
                            dataType: 'text',
                            success: function(response) {//console.log(response);
                                if(response == 'no groups' || response == 'Войдите в аккаунт!'){
                                    console.log(response);
                                } else {
                                    response = JSON.parse(response);
                                    console.log(response);
                                    
                                    loadUsersFromCalendar(label.id);
                                    document.querySelector('.calendar_form_area').classList.add('show');
                                }
                              
                            },
                            error: function(xhr, status, error) {
                              console.error(xhr.responseText);
                            }
                          });

                        
                    }
                });
            }
          
        },
        error: function(xhr, status, error) {
          console.error(xhr.responseText);
        }
      });
}

function addUserCalendar(){
    if(document.querySelector('.calendar_form input[name="title"]').value.trim() != ''){
        $.ajax({
            url: "./todos/add_user_group.php",
            type: "POST",
            data: {
                group_name: document.querySelector('.calendar_form input[name="title"]').value,
                user_id: document.querySelector('.userID').textContent
            },
            dataType: 'text',
            success: function(response) {//console.log(response);

                let calendar = document.createElement('div');
                calendar.classList.add('user_calendar');

                let calendar_label = document.createElement('label');
                calendar_label.textContent = document.querySelector('.calendar_form input[name="title"]').value;
                calendar.appendChild(calendar_label);

                $('.user_calendars').append(calendar);

                let labels = document.querySelectorAll('.user_calendar label');
                labels.forEach(function(label) {
                    label.onclick = ()=>{
                        document.querySelector('.calendar_form input[name="title"]').value = label.textContent; 
                        document.querySelector('.calendar_form_saveBtn').classList.add('notNew');
                        document.querySelector('.calendar_form_area').classList.add('show');
                    }
                });

                console.log(response);
            
            },
            error: function(xhr, status, error) {
            console.error(xhr.responseText);
            }
        });
    }
}

function openUserCalendar(){
    document.querySelector('.main_group_title h1').textContent = document.querySelector('.calendar_form input[name="title"]').value;
    document.querySelector('.main_group_title .main_group_token').textContent = document.querySelector('.calendar_form .calendar_form_token').textContent;
    document.querySelector('.no_forms_text_auth').style.display = 'none';
    document.querySelector('.main_group_title').style.display = 'flex';
    document.querySelector('.forms').style.display = 'flex';

    $.ajax({
        url: "./todos/get_user_role_in_group.php",
        type: "POST",
        data: {
          user_login: document.querySelector('.profile_data label[for="login_data"]').textContent.replace('Почта: ', ''),
          group_token: document.querySelector('.main_group_title .main_group_token').textContent
        },
        dataType: 'text',
        success: function(response) {//console.log(response);
            if(response == 'no groups' || response == 'Войдите в аккаунт!'){
                console.log(response);
            } else {
                response = JSON.parse(response);
                console.log(response);

                
            }
          
        },
        error: function(xhr, status, error) {
          console.error(xhr.responseText);
        }
      });

    renderCalendar(currentMonth, currentYear);
    loadTodos();
}

function addUserToCalendar(){
    //console.log(document.querySelector('input[name="userLogin"]').value, document.querySelector('.calendar_form_token').textContent);
    $.ajax({
        url: "./todos/add_user_to_group.php",
        type: "POST",
        data: {
          user_login: document.querySelector('input[name="userLogin"]').value,
          group_token: document.querySelector('.calendar_form_token').textContent
        },
        dataType: 'text',
        success: function(response) {//console.log(response);
            if(response == 'Пользователь не найден!' || response == 'Недостаточный уровень доступа!'){
                console.log(response);
            } else {
                //response = JSON.parse(response);
                console.log(response);
                loadUsersFromCalendar(document.querySelector('.calendar_form_token').textContent);
            }
          
        },
        error: function(xhr, status, error) {
          console.error(xhr.responseText);
        }
      });
}

function loadUsersFromCalendar(token){

    $.ajax({
        url: "./todos/get_users_from_group.php",
        type: "POST",
        data: {
          //user_login: document.querySelector('.profile_data label[for="login_data"]').textContent.replace('Почта: ', ''),
          group_token: token//document.querySelector('.main_group_title .main_group_token').textContent
        },
        dataType: 'text',
        success: function(response) {
            if(response == 'no users' || response == 'Войдите в аккаунт!'){
                console.log(response);
            } else {
                response = JSON.parse(response);
                console.log(response);

                document.querySelector('.available_users_list').textContent = '';
                $.each(response, function(key, user) {
                    let li = document.createElement('li');
                    if(user.role_id == 1){
                        li.textContent = user.name + ', ' + user.login + ' - Создатель'; 
                    }
                    if(user.role_id == 2){
                        li.textContent = user.name + ', ' + user.login + ' - Редактор';  
                    }
                    if(user.role_id == 3){
                        li.textContent = user.name + ', ' + user.login + ' - Читатель';  
                    }
                    document.querySelector('.available_users_list').append(li);
                });


                document.querySelectorAll('.available_users_list li').forEach(function(li) {
                    li.onclick = ()=>{
                        document.querySelectorAll('.available_users_list li').forEach(function(li) {
                            li.classList.remove('selected');
                        });
                        li.classList.add('selected');
                    }
                });
            }
        },
        error: function(xhr, status, error) {
          console.error(xhr.responseText);
        }
      });  
}

function changeUserRole(li, role){

    $.ajax({
        url: "./todos/update_user_role.php",
        type: "POST",
        data: {
          user_login: li.textContent.match(/[\w.-]+@[\w.-]+\.[\w.-]+/)[0],
          group_token: document.querySelector('.calendar_form_token').textContent,
          role_id: role
        },
        dataType: 'text',
        success: function(response) {
            if(response == 'Недостаточный уровень доступа!' || response == 'Войдите в аккаунт!'){
                console.log(response);
            } else {
                //response = JSON.parse(response);
                console.log(response);
                loadUsersFromCalendar(document.querySelector('.calendar_form_token').textContent);
                
            }
        },
        error: function(xhr, status, error) {
          console.error(xhr.responseText);
        }
      });  
}

function delUserFromCalendar(li){

    $.ajax({
        url: "./todos/del_user_from_group.php",
        type: "POST",
        data: {
          user_login: li.textContent.match(/[\w.-]+@[\w.-]+\.[\w.-]+/)[0],
          group_token: document.querySelector('.calendar_form_token').textContent
        },
        dataType: 'text',
        success: function(response) {
            if(response == 'Недостаточный уровень доступа!' || response == 'Войдите в аккаунт!'){
                console.log(response);
            } else {
                //response = JSON.parse(response);
                console.log(response);
                loadUsersFromCalendar(document.querySelector('.calendar_form_token').textContent);
                
            }
        },
        error: function(xhr, status, error) {
          console.error(xhr.responseText);
        }
      });  
}

profile('reset');