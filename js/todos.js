
var lastTaskId = 0;
var selectedTaskId;

function getLastTaskId(callback){
    let maxId = 0;

    $.ajax({
      type: 'GET',
      url: './todos/get_last_task_id.php',
      dataType: 'json',
      success: function(response) { //console.log('lastTasid: '+response);
        for(let i = 0; i < response.length; i++) {
          if(response[i].id > maxId) {
              maxId = response[i].id;
          }
        }
        callback(maxId);
      },
      error: function(xhr, status, error) {
          console.log(xhr.responseText);
      }
    });  
}

function getDateForAdd(){
  let now = new Date();
  let hours = now.getHours();
  let minutes = now.getMinutes();
  let seconds = now.getSeconds();
  let time = hours+':'+minutes+':'+seconds;
  let date;

  let dayValue = $(".day.selected").text();
  let monthValue = monthNames.findIndex(elem => elem === $(".month h1").text().split(" ")[0]); 
  let yearValue = $(".month h1").text().split(" ")[1];
  
  if (dayValue != ''){
    if (String(monthValue).length == 1){
      date = yearValue+'-0'+(Number(monthValue)+1)+'-'+dayValue; //console.log(dateObject);
    } else if (String(monthValue).length == 2){
      date = yearValue+'-'+(Number(monthValue)+1)+'-'+dayValue;
    }
    return arr = [date, time];
  } else {
    return 'День не выбран!';
  }
}

function loadTodos(){

  let date = getDateForAdd(); console.log('loadtodos');

  $.ajax({
      type: 'POST',
      url: './todos/todos_load.php',
      data: {date_time:date, group_name: document.querySelector('.main_group_title h1').textContent, group_token: document.querySelector('.main_group_title .main_group_token').textContent, user_id: document.querySelector('.userID').textContent},
      dataType: 'text',
      success: function(response) { //console.log(response);
        if (response === 'no todos'){
          if (Array.isArray(date)){
            $("#todos_form #head h1").empty();
            $("#todos_form #head h1").append("Задачи: "+ date[0]);
          }
          $("#tasks").empty();
          $("#tasks").append("<li id='notodo'>"+"Здесь пока ничего нет!"+"</li>");
        } else {
          if (Array.isArray(date)){
            $("#todos_form #head h1").empty();
            $("#todos_form #head h1").append("Задачи: "+ date[0]);
          } console.log(response);
          response = JSON.parse(response);
          $("#tasks").empty();
          $.each(response, function(key, task) {
              $("#tasks").append("<div class = 'taskContainer' id='taskContainer'>"+"<li>" + "<input type='text' class='task' id='task"+ task.id +"' value ='"+ task.title +"'placeholder='Название...' title=''>" + "</li>"+"<button class = 'deleteTask' id='deleteTask'></button></div>");
          });
          delTodo();
        }
      },
      error: function(xhr, status, error) {
          console.log(xhr.responseText);
      }
  });
}

function saveTodo(){
  var oldValue;
  $('#tasks').on("focus", 'li input', function(event) {
    oldValue = $(this).val();
  });

  $('#tasks').on("change", 'li input', function(event) {
    if (event.type === "change" || event.key === "Enter") {
    
      var inputElement = $(this);
      var inputValue = $(this).val();
      var taskId = $(this).attr("id").split("task")[1];
    
      $.ajax({
        url: "./todos/update_todo.php",
        type: "POST",
        data: {
          title: inputValue,
          task_id: taskId
        },
        success: function(response) {
          if (response == 'Войдите в аккаунт!'){ console.log(response);
            inputElement.val(oldValue);
            $("<div title='Внимание'>" + 'Для редактирования войдите в аккаунт.' + "</div>").dialog({
              modal: true,
              buttons: {
                Ok: function() {
                  $(this).dialog("close");
                }
              },
              close: function(event, ui) {
                $(this).remove();
              }
            });
          } else {
            console.log(inputElement.attr("id") + ' is updated');
          }
        },
        error: function(xhr, status, error) {
          console.error(xhr.responseText);
        }
      });
    }
  }); 
}

function delTodo(){
  console.log('delLoaded');

  const deleteButtons = document.querySelectorAll('.deleteTask');
  let container;
  let li;
  let task_id;

  $('.deleteTask').on("click",function(event) {
    deleteButtons.forEach(button => {
      container = event.target.closest('.taskContainer');
      li = container.querySelector('li input');
      task_id = li.id.split("task")[1];
    });

    $.ajax({
      url: "./todos/del_todo.php",
      type: "POST",
      data: {
        task_id: task_id
      },
      success: function(response) {
        if (response == 'Войдите в аккаунт!' || response == 'Недостаточный уровень доступа!'){ console.log(response);
          $("<div title='Внимание'>" + response + "</div>").dialog({
            modal: true,
            buttons: {
              Ok: function() {
                $(this).dialog("close");
              }
            },
            close: function(event, ui) {
              $(this).remove();
            }
          });
        } else {
          container.remove();
          loadTodos();
          renderCalendar(currentMonth, currentYear);
        }
      },
      error: function(xhr, status, error) {
        console.error(xhr.responseText);
      }
    });
  });
}

function loadTask(){

  $('#tasks').on("click", 'li', function(event) {
    selectedTaskId = $(this).find('input').attr("id").split("task")[1]; //console.log(taskId);

    $.ajax({
      url: "./todos/get_data_for_task.php",
      type: "POST",
      data: {
        task_id: selectedTaskId
      },
      success: function(response) {//console.log(response);
        response = JSON.parse(response);
        $("#task_form #head h1").empty();
        $("#task_form #head h1").append("Пользователь: "+ response[0].name);
        $('#title_task').val(response[0].title);
        $('#task_text').val(response[0].text);

        document.querySelector('.login_form_overlay').classList.add('show');
        document.getElementById('task_form').style.cssText = 'visibility: visible; opacity: 1; transition: opacity 0.4s linear, visibility 0.4s linear;';
      },
      error: function(xhr, status, error) {
        console.error(xhr.responseText);
      }
    });


  });

}


$(document).ready(function() {
    loadTodos();
    saveTodo();
    //delTodo();
    loadTask();
    $('.day').on("click", function(event) {
      loadTodos();
    });
});

$("#add-button").click(function() {

    if (getDateForAdd() == 'День не выбран!'){
      $("<div title='Внимание'>" + 'Выберите день для добавления.' + "</div>").dialog({
        modal: true,
        buttons: {
          Ok: function() {
            $(this).dialog("close");
          }
        },
        close: function(event, ui) {
          $(this).remove();
        }
      });
    } else {
      $.get('./todos/get_userid.php', function(data){
        var user_id = data; 
        $.ajax({
          url: "./todos/add_todo.php",
          type: "POST",
          data: {
            group_name: document.querySelector('.main_group_title h1').textContent,
            group_token: document.querySelector('.main_group_title .main_group_token').textContent,
            user_id: user_id,
            date_time: getDateForAdd()
          },
          success: function(response) {
            if (response == 'Войдите в аккаунт!' || response == 'Недостаточный уровень доступа!'){ console.log(response);
              $("<div title='Внимание'>" + response + "</div>").dialog({
                modal: true,
                buttons: {
                  Ok: function() {
                    $(this).dialog("close");
                  }
                },
                close: function(event, ui) {
                  $(this).remove();
                }
              });
            } else {
              getLastTaskId(function(lastTaskId){
                if ($('#notodo').length) { $("#tasks").empty(); }
                $("#tasks").append("<div class = 'taskContainer' id='taskContainer'>"+"<li>" + "<input type='text' class='task' id='task"+ (lastTaskId) +"' placeholder='Название...' title=''>" + "</li>"+"<button class = 'deleteTask' id='deleteTask'></button></div>");
                $("#new-task").val("");
                console.log('Added new todo');
                loadTodos();
                renderCalendar(currentMonth, currentYear);
                //delTodo();
              });             
            }
          },
          error: function(xhr, status, error) {
            console.error(xhr.responseText);
          }
        });
      });
    }
});

$("#savebtn").click(function() {

  if (document.querySelector("#task_form #head h1").innerText != 'Пользователь:'){
    $.ajax({
      url: "./todos/save_task.php",
      type: "POST",
      data: {
        task_id: selectedTaskId,
        title: $('#title_task').val(),
        text: $('#task_text').val()
      },
      success: function(response) {
        if (response == 'Войдите в аккаунт!' || response == 'Недостаточный уровень доступа!'){ console.log(response);
          $("<div title='Внимание'>" + response + "</div>").dialog({
            modal: true,
            buttons: {
              Ok: function() {
                $(this).dialog("close");
              }
            },
            close: function(event, ui) {
              $(this).remove();
            }
          });
        } else {
          document.getElementById('task_form').style.cssText = 'visibility: hidden; opacity: 0; transition: opacity 0.4s linear, visibility 0.4s linear;';
          document.querySelector('.login_form_overlay').classList.remove('show');
          loadTodos();
          console.log(response);
        }
      },
      error: function(xhr, status, error) {
        console.error(xhr.responseText);
      }
    });
  }

});

$("#cancelbtn").click(function() {
  document.getElementById('task_form').style.cssText = 'visibility: hidden; opacity: 0; transition: opacity 0.4s linear, visibility 0.4s linear;';
  document.querySelector('.login_form_overlay').classList.remove('show');
});