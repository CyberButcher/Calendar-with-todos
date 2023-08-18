const monthNames = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"];

let currentDate = new Date();

let currentMonth = currentDate.getMonth();
let currentYear = currentDate.getFullYear();
let currentDay = currentDate.getDate();
let currentMonthReal = currentMonth;
let currentYearReal = currentYear;
let currentDayReal = currentDay;

const calendar = document.querySelector(".calendar");
const prevMonthBtn = document.querySelector(".prev");
const nextMonthBtn = document.querySelector(".next");
const monthTitle = document.querySelector(".month h1");
const daysContainer = document.querySelector(".days");
  
renderCalendar(currentMonth, currentYear);
  
prevMonthBtn.addEventListener("click", () => {
  currentYear = currentMonth === 0 ? currentYear - 1 : currentYear;
  currentMonth = currentMonth === 0 ? 11 : currentMonth - 1;
  renderCalendar(currentMonth, currentYear);
  selectDay();
  document.querySelectorAll('.day').forEach(day => day.classList.remove('selected'));
  $("#todos_form #head h1").empty();
  $("#todos_form #head h1").append("Задачи: Выберите дату");
  $("#tasks").empty();
  $("#tasks").append("<li id='notodo'>"+"Здесь пока ничего нет!"+"</li>");
});

nextMonthBtn.addEventListener("click", () => {
  currentYear = currentMonth === 11 ? currentYear + 1 : currentYear;
  currentMonth = currentMonth === 11 ? 0 : currentMonth + 1;
  renderCalendar(currentMonth, currentYear);
  selectDay();
  document.querySelectorAll('.day').forEach(day => day.classList.remove('selected'));
  $("#todos_form #head h1").empty();
  $("#todos_form #head h1").append("Задачи: Выберите дату");
  $("#tasks").empty();
  $("#tasks").append("<li id='notodo'>"+"Здесь пока ничего нет!"+"</li>");
});

// selectDay();
// document.querySelectorAll(".prev, .next").forEach(next => {
//     next.addEventListener("click", () => {
//         selectDay();
//         $('.day').on("click", function(event) {
//           loadTodos();
//         });
//     });
// });

