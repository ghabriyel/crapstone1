<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Make a Reservation</title>
    <link rel="stylesheet" href="template.css">
    <link rel="stylesheet" href="booking.css">
    <link rel="stylesheet" href="sidebar(css).css">
</head>
<body>
    <div id="layoutWrapper">
        <aside id="sidebar">
            <nav>
                <div class="logo">
                    <img src="logo.png" alt="Logo">
                </div>
                <ul class="headerLinks">
                    <li><button id="sidebarToggle"><span id="arrowIcon">«</span></button></li>
                    <li><a href="#"><span>Home</span></a></li>
                    <li><a href="schedule.html"><span>Mass Schedule</span></a></li>
                    <li><a href="events.html"><span>Events</span></a></li>
                    <li><a href="announcements.html"><span>Announcements</span></a></li>
                    <li><a href="booking.html"><span>Booking</span></a></li>
                    <li><a href="reports.html"><span>Reports</span></a></li>
                    <li><a href="billing.html"><span>Merchandise</span></a></li>
                    <li><a href="userManagement.html"><span>User Management</span></a></li>
                    <li><a href="reservation.html"><span>Reservation</span></a></li>
                    <li><a href="logout.php"><span>Sign out</span></a></li>
                </ul>
            </nav>
        </aside>

        <main>
            <div class="welcome-section">
                <h1>Make a Reservation</h1>
            </div>

            <div class="booking-container">
                <div class="reservation-form">
                    <h2>Make a Reservation</h2>
                    <form id="form" action="booking_submit.php" method="POST">
                        <div class="form-group">
                            <label for="purpose">Purpose:</label>
                            <select id="purpose" name="purpose" required>
                                <option value="Wedding">Wedding</option>
                                <option value="Baptism">Baptism</option>
                                <option value="Funeral">Funeral</option>
                                <option value="Mass">Mass</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label for="date">Date:</label>
                            <input type="date" id="date" name="date" required>
                        </div>
                        <div class="form-group">
                            <label for="time_slot">Time Slot:</label>
                            <select id="time_slot" name="time_slot" required>
                                <option value="9:00-10:00">9:00-10:00</option>
                                <option value="10:00-11:00">10:00-11:00</option>
                                <option value="11:00-12:00">11:00-12:00</option>
                                <option value="12:00-1:00">12:00-1:00</option>
                                <option value="1:00-2:00">1:00-2:00</option>
                                <option value="2:00-3:00">2:00-3:00</option>
                                <option value="3:00-4:00">3:00-4:00</option>
                                <option value="4:00-5:00">4:00-5:00</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label for="email">Email:</label>
                            <input type="email" id="email" name="email" required>
                        </div>
                        <div class="form-group">
                            <label for="contact">Contact Number:</label>
                            <input type="text" id="contact" name="contact" required>
                        </div>
                        <div class="form-group">
                            <label for="name">Name:</label>
                            <input type="text" id="name" class="SanitizeInputField" name="name" required>
                        </div>
                        <button type="submit" class="formButton">Submit</button>
                    </form>
                </div>

                <div class="calendar-section">
                    <div class="calendar-header">
                        <div class="calendar-controls">
                            <button id="prevMonth">«</button>
                            <button id="nextMonth">»</button>
                        </div>
                        <h2 id="monthTitle"><?php echo date('F Y'); ?></h2>
                    </div>

                    <div class="calendar" id="calendar">
                        <div id="monthTitle"></div>
                    </div>

                    <div class="calendar-legend">
                        <div class="legend-item">
                            <div class="legend-color booked"></div>
                            <span>Booked/Reserved</span>
                        </div>
                        <div class="legend-item">
                            <div class="legend-color current"></div>
                            <span>Current Date</span>
                        </div>
                        <div class="legend-item">
                            <div class="legend-color pending"></div>
                            <span>Pending Date</span>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    </div>

    <script src="sidebar_function.js"></script>
    <script src="calendar_filler.js"></script>
    <script src="booking.js"></script>
    <script src="(js)text_sanitizer.js"></script>
    <script src="(js)general_number_sanitizer.js"></script>
    <script src="(js)booking_number_sanitizer.js"></script>
</body>
</html>
