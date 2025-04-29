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

// Empty cells for days before 1st of the month
for (let i = 0; i < firstDay; i++) {
    const emptyCell = document.createElement('div');
    emptyCell.classList.add('empty');
    calendar.appendChild(emptyCell);
}

// Actual day cells
for (let day = 1; day <= daysInMonth; day++) {
    const dayElement = document.createElement('div');
    dayElement.className = 'day';
    dayElement.textContent = day;

    if (day === currentDay) {
        dayElement.classList.add('today');
    }

    dayElement.addEventListener("click", () => {
        const dateInput = document.getElementById("date");
        const selectedDate = new Date(currentYear, currentMonth, day);
        dateInput.value = selectedDate.toISOString().split("T")[0];
        highlightSelectedDate(dayElement);
    });

    calendar.appendChild(dayElement);
}

function highlightSelectedDate(selectedCell) {
    document.querySelectorAll(".day").forEach(cell =>
        cell.classList.remove("selected")
    );
    selectedCell.classList.add("selected");
}
