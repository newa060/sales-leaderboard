document.addEventListener('DOMContentLoaded', function() {
    // Form validation and enhancement
    const salesForm = document.getElementById('salesForm');
    
    if (salesForm) {
        salesForm.addEventListener('submit', function(e) {
            // Get form values
            const agentName = document.getElementById('agentName').value.trim();
            const amountSold = parseFloat(document.getElementById('amountSold').value);
            const numberOfSales = parseInt(document.getElementById('numberOfSales').value);

            // Validate agent name
            if (!agentName) {
                alert('Please enter agent name');
                e.preventDefault();
                return false;
            }

            // Validate amount sold
            if (isNaN(amountSold) || amountSold < 0) {
                alert('Please enter a valid amount (must be 0 or greater)');
                e.preventDefault();
                return false;
            }

            // Validate number of sales
            if (isNaN(numberOfSales) || numberOfSales < 1) {
                alert('Please enter a valid number of sales (must be 1 or greater)');
                e.preventDefault();
                return false;
            }

            // Show loading state
            const submitBtn = salesForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Adding...';
            submitBtn.disabled = true;

            // Form will submit normally
            return true;
        });

        // Auto-dismiss alerts after 5 seconds
        const alerts = document.querySelectorAll('.alert');
        alerts.forEach(alert => {
            setTimeout(() => {
                alert.style.transition = 'opacity 0.5s';
                alert.style.opacity = '0';
                setTimeout(() => alert.remove(), 500);
            }, 5000);
        });
    }

    // Add number formatting to inputs
    const amountInput = document.getElementById('amountSold');
    if (amountInput) {
        amountInput.addEventListener('blur', function() {
            if (this.value) {
                const value = parseFloat(this.value);
                if (!isNaN(value)) {
                    // Format to 2 decimal places
                    this.value = value.toFixed(2);
                }
            }
        });
    }

    // Prevent negative values
    const numberInputs = document.querySelectorAll('input[type="number"]');
    numberInputs.forEach(input => {
        input.addEventListener('input', function() {
            if (this.value < 0) {
                this.value = 0;
            }
        });
    });

    // Add smooth scroll behavior
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
});

// Console message for developers
console.log('%c🚀 Sales Leaderboard System', 'font-size: 20px; font-weight: bold; color: #667eea;');
console.log('%cAPI Endpoints:', 'font-size: 14px; font-weight: bold; color: #764ba2;');
console.log('GET  /api/leaderboard - Get leaderboard data');
console.log('GET  /api/sales - Get all sales records');
console.log('POST /api/sales - Add new sale');
console.log('DELETE /api/sales - Clear all sales');
console.log('\n%cBuilt for Nest Nepal Backend Internship', 'font-size: 12px; color: #718096;');