document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('form');
    const purposeSelect = document.getElementById('purpose');
    const dateInput = document.getElementById('date');
    const emailInput = document.getElementById('email');
    const contactInput = document.getElementById('contact');
    const calendar = document.querySelector('.calendar-grid');

    // Set minimum date to today
    const today = new Date();
    dateInput.min = today.toISOString().split('T')[0];

    // Handle form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get sanitized values
        const purpose = textSanitizer(purposeSelect.value);
        const date = textSanitizer(dateInput.value);
        const email = textSanitizer(emailInput.value);
        const contact = generalNumberSanitizer(contactInput.value);

        // Validate form
        if (!validateForm(purpose, date, email, contact)) {
            return;
        }

        // Show success message
        showNotification('Reservation submitted successfully!', 'success');
        form.reset();
    });

    // Calendar interaction
    if (calendar) {
        const days = calendar.querySelectorAll('div');
        days.forEach(day => {
            day.addEventListener('click', function() {
                if (!this.classList.contains('booked')) {
                    // Remove selected class from all days
                    days.forEach(d => d.classList.remove('selected'));
                    // Add selected class to clicked day
                    this.classList.add('selected');
                    // Update date input
                    const selectedDate = new Date(today.getFullYear(), today.getMonth(), parseInt(this.textContent));
                    dateInput.value = selectedDate.toISOString().split('T')[0];
                }
            });
        });
    }

    // Purpose select change handler
    purposeSelect.addEventListener('change', function() {
        updateCalendarAvailability(this.value);
    });

    // Form validation
    function validateForm(purpose, date, email, contact) {
        let isValid = true;
        
        if (!purpose) {
            showNotification('Please select a purpose', 'error');
            isValid = false;
        }

        if (!date) {
            showNotification('Please select a date', 'error');
            isValid = false;
        }

        if (!validateEmail(email)) {
            showNotification('Please enter a valid email', 'error');
            isValid = false;
        }

        if (!validateContact(contact)) {
            showNotification('Please enter a valid contact number', 'error');
            isValid = false;
        }

        return isValid;
    }

    // Email validation
    function validateEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    // Contact validation
    function validateContact(contact) {
        return /^\d{11}$/.test(contact);
    }

    // Show notification
    function showNotification(message, type) {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        // Remove notification after 3 seconds
        setTimeout(() => {
            notification.remove();
        }, 3000);
    }

    // Update calendar based on purpose
    function updateCalendarAvailability(purpose) {
        if (!calendar) return;

        // Simulate booked dates for different purposes
        const bookedDates = {
            baptism: [3, 10, 17],
            wedding: [5, 12, 19],
            confirmation: [7, 14, 21]
        };

        const days = calendar.querySelectorAll('div');
        days.forEach(day => {
            const dayNum = parseInt(day.textContent);
            day.classList.remove('booked');
            if (bookedDates[purpose] && bookedDates[purpose].includes(dayNum)) {
                day.classList.add('booked');
            }
        });
    }
});
