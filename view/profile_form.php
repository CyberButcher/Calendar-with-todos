<div class="profile_form_area">
    
    <div class="profile_form">
        <div class="top_closeBtn">
            <button style="cursor: pointer;">X</button>
        </div>
        <div class="form_content">
            <div class="profile_data_part">
                <h1>Профиль пользователя</h1>
                <div class="profile_data">
                    <label for="name_data">Имя: <?=$_SESSION['user']['name']?></label>
                    <label for="login_data">Почта: <?=$_SESSION['user']['login']?></label>
                </div>
            </div>
            <div class="calendars_data">
                <div class="first_part">
                    <h1>Календари пользователя: </h1>
                    <button class="addCalendarBtn">Добавить</button>
                </div>
                <div class="user_calendars">
                    <div class="user_calendar">

                    </div>
                </div>
            </div>
        </div>

    </div>
</div>