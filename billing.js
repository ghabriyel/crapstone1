document.addEventListener('DOMContentLoaded', function() {
    // Search functionality
    const searchInput = document.querySelector('.search-input');
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const searchTerm = textSanitizer(this.value.toLowerCase());
            filterBillingRows(searchTerm);
        });
    }

    // Filter buttons
    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const filterType = this.textContent.toLowerCase();
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            filterBillingRows(filterType);
        });
    });

    // Print receipt button handlers
    const printBtns = document.querySelectorAll('.btn-receipt');
    printBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const row = this.closest('tr');
            const data = {
                type: row.cells[0].textContent,
                parishioner: row.cells[1].textContent,
                email: row.cells[2].textContent,
                items: row.cells[3].textContent,
                date: row.cells[5].textContent
            };
            printReceipt(data);
        });
    });

    // Remove button handlers
    const removeBtns = document.querySelectorAll('.btn-remove');
    removeBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const row = this.closest('tr');
            if (confirm('Are you sure you want to remove this record?')) {
                row.style.animation = 'fadeOut 0.5s';
                setTimeout(() => {
                    row.remove();
                    showNotification('Record removed successfully', 'success');
                }, 500);
            }
        });
    });

    // Filter billing table rows
    function filterBillingRows(filterTerm) {
        const rows = document.querySelectorAll('.billing-table tbody tr');
        
        rows.forEach(row => {
            const text = row.textContent.toLowerCase();
            const type = row.cells[0].textContent.toLowerCase();
            const status = row.cells[7].textContent.toLowerCase();
            
            let show = true;
            
            if (filterTerm === 'pending dates') {
                show = status.includes('pending');
            } else if (filterTerm === 'pending merch') {
                show = type === 'merch' && status.includes('pending');
            } else {
                show = text.includes(filterTerm);
            }
            
            row.style.display = show ? '' : 'none';
        });
    }

    // Print receipt
    function printReceipt(data) {
        const receiptWindow = window.open('', '_blank');
        receiptWindow.document.write(`
            <html>
                <head>
                    <title>Receipt</title>
                    <style>
                        body { font-family: Arial, sans-serif; padding: 20px; }
                        .receipt { max-width: 400px; margin: 0 auto; }
                        .header { text-align: center; margin-bottom: 20px; }
                        .detail { margin: 10px 0; }
                        .footer { margin-top: 20px; text-align: center; }
                    </style>
                </head>
                <body>
                    <div class="receipt">
                        <div class="header">
                            <h2>Parish Receipt</h2>
                            <p>${new Date().toLocaleDateString()}</p>
                        </div>
                        <div class="detail">
                            <p><strong>Type:</strong> ${data.type}</p>
                            <p><strong>Parishioner:</strong> ${data.parishioner}</p>
                            <p><strong>Email:</strong> ${data.email}</p>
                            <p><strong>Items/Sacrament:</strong> ${data.items}</p>
                            <p><strong>Date Reserved:</strong> ${data.date}</p>
                        </div>
                        <div class="footer">
                            <p>Thank you for your patronage</p>
                        </div>
                    </div>
                </body>
            </html>
        `);
        receiptWindow.document.close();
        setTimeout(() => {
            receiptWindow.print();
        }, 500);
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
});
