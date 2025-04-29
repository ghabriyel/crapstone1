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
    emptyCell.classList.add('empty');
    calendar.appendChild(emptyCell);
}

for (let day = 1; day <= daysInMonth; day++) {
    const dayElement = document.createElement('div');
    dayElement.className = 'day';
    dayElement.textContent = day;

    const dayString = String(day).padStart(2, '0');
    const monthString = String(currentMonth + 1).padStart(2, '0');
    const fullDate = `${currentYear}-${monthString}-${dayString}`;
    dayElement.setAttribute('data-date', fullDate);

    if (day === currentDay) {
        dayElement.classList.add('today');
    }

    calendar.appendChild(dayElement);
}

async function fetchBookings() {
    try {
        const response = await fetch("fetch_bookings.php");
        const bookings = await response.json();
        highlightPendingDate(bookings);
        console.log("All bookings:", bookings);
    } catch (error) {
        console.error("Error fetching bookings:", error);
    }
}

function highlightPendingDate(bookings) {
    bookings.forEach(booking => {
        if (
            booking.status === "pending" &&
            booking.date &&
            /^\d{4}-\d{2}-\d{2}$/.test(booking.date) // validate YYYY-MM-DD format
        ) {
            const cell = document.querySelector(`.day[data-date="${booking.date}"]`);
            if (cell) {
                cell.classList.add("pending");
            }
        }
    });
}

fetchBookings();
setInterval(fetchBookings, 5000);