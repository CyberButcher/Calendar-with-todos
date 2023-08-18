
function getDaysInMonth(month, year) {
    return new Date(year, month + 1, 0).getDate();
}
  
function getFirstDayOfMonth(month, year) {
    return new Date(year, month, 0).getDay();
}
    
function renderCalendar(month, year) {
    daysContainer.innerHTML = "";

    monthTitle.textContent = monthNames[month] + " " + year;

    const daysInMonth = getDaysInMonth(month, year);
    const firstDayOfMonth = getFirstDayOfMonth(month, year);

    $.ajax({
        type: 'GET',
        url: './todos/get_all_tasks.php',
        data: {
            group_name: document.querySelector('.main_group_title h1').textContent,
            group_token: document.querySelector('.main_group_title .main_group_token').textContent
        },
        dataType: 'json',
        success: function(response) { 
            for (let i = 0; i < firstDayOfMonth; i++) {
                const day = document.createElement("div");
                day.classList.add("not_day");
                daysContainer.appendChild(day);
            }

            for (let i = 1; i <= daysInMonth; i++) {
                const day = document.createElement("div");
                day.classList.add("day");
                if (i === currentDayReal && month === currentMonthReal && year === currentYearReal) {
                    day.classList.add("today");
                }
                day.textContent = i;

                $.each(response, function(key, task) {
                    let year0 = task.date.split('-')[0];
                    let month0;
                    if (task.date.indexOf("-0") !== -1) {
                        month0 = parseInt(task.date.split('-')[1], 10);
                    } else {
                        month0 = task.date.split('-')[1];
                    }
                    let day0 = task.date.split('-')[2];//console.log('year: '+year0+' month: '+month0+' day: '+day0);
                    if (year0 == year && month0 == (month + 1) && day0 == i){
                        day.classList.add("tasked");
                        //return;
                    }
                });
                //renderTasksOnCal(month+1,year,i,day);
                daysContainer.appendChild(day);
            }
            selectDay();
            //loadTodos();
        },
        error: function(xhr, status, error) {
            console.log(xhr.responseText);
        }
    });
}

let selectedDay; 
function selectDay() {
    const days = document.querySelectorAll(".day");
    //document.querySelectorAll('.day').forEach(day => day.classList.remove('selected'));

    if(selectedDay){
        setTimeout(() => {
        const div = [...document.querySelectorAll('.day')].find(day => day.textContent === selectedDay);
        if (div){
            div.classList.add("selected");
        }
        //selectedDay = null;
        },100);
    }

    days.forEach(day => {
        day.addEventListener("click", () => {
            days.forEach(day => {
                day.classList.remove("selected");
            });          
            day.classList.add("selected");
            selectedDay = day.textContent;
            //selectDay();
            loadTodos();
        });
    });
    // $('.day').on("click", function(event) {
    //     loadTodos();
    // });
}