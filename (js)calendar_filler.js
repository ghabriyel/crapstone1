const monthTitle = document.getElementById('monthTitle');
const calendar = document.getElementById('calendar');

const today = new Date();
const currentDay = today.getDate();
const currentMonth = today.getMonth();
const currentYear = today.getFullYear();

const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
const firstDay = new Date(currentYear, currentMonth, 1).getDay();

const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];
monthTitle.textContent = `${monthNames[currentMonth]} ${currentYear}`;

for (let i = 0; i < firstDay; i++) {
  const emptyCell = document.createElement('div');
  calendar.appendChild(emptyCell);
}

for (let day = 1; day <= daysInMonth; day++) {
  const dayElement = document.createElement('div');
  dayElement.className = 'day';
  if (day === currentDay) {
    dayElement.classList.add('today');
  }
  dayElement.textContent = day;
  calendar.appendChild(dayElement);
}
