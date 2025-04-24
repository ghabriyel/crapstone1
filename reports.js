document.addEventListener('DOMContentLoaded', function() {
    // Generate Report Button Handler
    const generateBtn = document.querySelector('.generate-btn');
    const monthSelect = document.querySelector('.month-select');

    if (generateBtn && monthSelect) {
        generateBtn.addEventListener('click', function() {
            const selectedMonth = monthSelect.value;
            showNotification(`Generating report for ${selectedMonth}...`, 'info');
            
            // Simulate loading
            setTimeout(() => {
                showNotification('Report generated successfully!', 'success');
                updateReportData(selectedMonth);
            }, 1000);
        });
    }

    // Search functionality
    const searchInput = document.querySelector('.search-input');
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const searchTerm = textSanitizer(this.value.toLowerCase());
            filterTableRows(searchTerm);
        });
    }

    // Filter buttons
    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const filterType = this.textContent.toLowerCase();
            filterTableRows(filterType);
            
            // Toggle active state
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // Table row filtering
    function filterTableRows(searchTerm) {
        const rows = document.querySelectorAll('.report-table tbody tr');
        
        rows.forEach(row => {
            const text = row.textContent.toLowerCase();
            row.style.display = text.includes(searchTerm) ? '' : 'none';
        });
    }

    // Update report data
    function updateReportData(month) {
        const tables = document.querySelectorAll('.report-table');
        tables.forEach(table => {
            const rows = table.querySelectorAll('tbody tr');
            rows.forEach(row => {
                // Simulate data update
                const cells = row.querySelectorAll('td');
                cells.forEach(cell => {
                    if (cell.textContent.match(/^\d+$/)) {
                        const newValue = Math.floor(Math.random() * 100);
                        cell.textContent = newValue;
                    }
                });
            });
        });
    }

    // Show notification
    function showNotification(message, type) {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.remove();
        }, 3000);
    }

    // View Report button handlers
    const viewReportBtns = document.querySelectorAll('.view-report-btn');
    viewReportBtns.forEach(btn => {
        btn.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
        });
        
        btn.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
});
