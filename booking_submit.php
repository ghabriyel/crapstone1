<?php
session_start();
require_once 'db.php'; // Database connection file

class Booking {
    private $conn;

    public function __construct($dbConnection) {
        $this->conn = $dbConnection;
    }

    public function addBooking($purpose, $date, $timeSlot, $email, $contact, $name) {
        // Validate contact number: must be exactly 11 digits
        if (!preg_match('/^\d{11}$/', $contact)) {
            return "Invalid contact number. It must be exactly 11 digits.";
        }

        // Additional checks (optional)
        if (empty($purpose) || empty($date) || empty($timeSlot) || empty($email) || empty($contact) || empty($name)) {
            return "All fields must be filled.";
        }

        // Validate that the booking date is not in the past
        $currentDate = new DateTime(); // Current date
        $bookingDate = new DateTime($date); // Booking date

        if ($bookingDate < $currentDate) {
            return "You cannot book a date in the past.";
        }

        // Check if the email has already booked for the same date and purpose
        $stmt = $this->conn->prepare("SELECT id FROM bookings WHERE date = ? AND purpose = ? AND email = ?");
        $stmt->bind_param("sss", $date, $purpose, $email);
        $stmt->execute();
        $stmt->store_result();

        if ($stmt->num_rows > 0) {
            $stmt->close();
            return "You have already booked for this date and purpose.";
        }
        $stmt->close();

        // Check if the date, time slot, and purpose are already fully booked
        $stmt = $this->conn->prepare("SELECT COUNT(*) AS booking_count FROM bookings WHERE date = ? AND time_slot = ? AND purpose = ?");
        $stmt->bind_param("sss", $date, $timeSlot, $purpose);
        $stmt->execute();
        $stmt->bind_result($bookingCount);
        $stmt->fetch();
        $stmt->close();

        // Allow up to 3 bookings for the same purpose, date, and time slot
        if ($bookingCount >= 3) {
            return "This time slot is fully booked for the selected purpose.";
        }

        // Insert the booking into the database
        $stmt = $this->conn->prepare("INSERT INTO bookings (purpose, date, time_slot, email, contact_number, name, status) VALUES (?, ?, ?, ?, ?, ?, 'pending')");
        if (!$stmt) {
            return "Error preparing statement: " . $this->conn->error;
        }

        $stmt->bind_param("ssssss", $purpose, $date, $timeSlot, $email, $contact, $name);

        if ($stmt->execute()) {
            $stmt->close();
            return "success";
        } else {
            $error = $stmt->error;
            $stmt->close();
            return "Error executing statement: " . $error;
        }
    }
}

// Check if form was submitted
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    // Collect form data (sanitize if necessary)
    $purpose = $_POST['purpose'] ?? '';
    $date = $_POST['date'] ?? '';
    $timeSlot = $_POST['time_slot'] ?? '';
    $email = $_POST['email'] ?? '';
    $contact = $_POST['contact'] ?? '';
    $name = $_POST['name'] ?? '';

    $booking = new Booking($conn);
    $result = $booking->addBooking($purpose, $date, $timeSlot, $email, $contact, $name);

    echo $result; // Return result to the client (will be handled in JS)
} else {
    echo "Invalid request method.";
}
?>