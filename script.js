// Utility function to format currency
function formatCurrency(amount) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).format(amount);
}

// Function to format numbers with commas
function formatNumberWithCommas(value) {
    return value.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// Add to the beginning of the file, after existing utility functions
function formatInputWithSymbol(input, isPercentage = false) {
    let value = input.value.replace(/[^0-9.]/g, '');
    if (value) {
        if (isPercentage) {
            // For percentage fields
            value = value + '%';
        } else {
            // For currency fields, first remove commas then format
            value = value.replace(/,/g, '');
            value = '$' + formatNumberWithCommas(value);
        }
        input.value = value;
    }
}

// Update the addCommaFormatting function
function addCommaFormatting() {
    const currencyFields = ['sellingPrice', 'tradeAllowance', 'cashDown'];
    currencyFields.forEach(fieldId => {
        const field = document.getElementById(fieldId);
        field.addEventListener('input', (e) => {
            let value = e.target.value.replace(/[$,]/g, '');
            if (!isNaN(value) && value !== '') {
                value = '$' + formatNumberWithCommas(value);
                e.target.value = value;
            }
        });
    });

    // Add formatting for interest rate
    const interestField = document.getElementById('interestRate');
    let previousValue = '';
    
    interestField.addEventListener('input', (e) => {
        const cursorPosition = e.target.selectionStart;
        let value = e.target.value.replace(/[^0-9.]/g, '');

        // Handle backspace when cursor is after %
        if (previousValue.length > value.length && cursorPosition === previousValue.length) {
            value = value.slice(0, -1);
        }

        if (!isNaN(value) && value !== '') {
            // Only allow one decimal point
            const parts = value.split('.');
            if (parts.length > 2) {
                value = parts[0] + '.' + parts.slice(1).join('');
            }
            // Limit to 2 decimal places
            if (parts.length === 2 && parts[1].length > 2) {
                value = parseFloat(value).toFixed(2);
            }

            const newValue = value + '%';
            e.target.value = newValue;
            
            // Set cursor position before the %
            const newPosition = cursorPosition < previousValue.length ? cursorPosition : newValue.length - 1;
            e.target.setSelectionRange(newPosition, newPosition);
            
            previousValue = newValue;
        } else {
            e.target.value = value;
            previousValue = value;
        }
    });

    // Handle keyboard navigation
    interestField.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft' && e.target.selectionStart === e.target.value.length) {
            e.target.setSelectionRange(e.target.value.length - 1, e.target.value.length - 1);
        }
    });
}

// Initialize formatting on DOMContentLoaded
document.addEventListener('DOMContentLoaded', function() {
    const advancedToggle = document.getElementById('advancedToggle');
    const advancedFields = document.getElementById('advancedFields');

    advancedToggle.addEventListener('click', function() {
        advancedFields.classList.toggle('hidden');
        const isHidden = advancedFields.classList.contains('hidden');
        advancedToggle.innerHTML = `Advanced Options ${isHidden ? '▼' : '▲'}`;
    });

    addCommaFormatting();

    // Setup tooltip functionality
    const helpIcons = document.querySelectorAll('.help-icon');
    let activeTooltip = null;

    helpIcons.forEach(icon => {
        icon.addEventListener('click', function(e) {
            e.stopPropagation();
            
            // Remove any existing tooltips
            if (activeTooltip) {
                activeTooltip.remove();
                if (activeTooltip.parentIcon === icon) {
                    activeTooltip = null;
                    return;
                }
            }

            // Create and position the tooltip
            const tooltip = document.createElement('div');
            tooltip.className = 'tooltip';
            tooltip.textContent = this.getAttribute('data-tooltip');
            tooltip.parentIcon = icon;
            
            // Append tooltip to the form-group container
            icon.closest('.form-group').appendChild(tooltip);
            
            // Show the tooltip
            setTimeout(() => tooltip.classList.add('show'), 0);
            activeTooltip = tooltip;
        });
    });

    // Close tooltip when clicking outside
    document.addEventListener('click', function() {
        if (activeTooltip) {
            activeTooltip.remove();
            activeTooltip = null;
        }
    });
});

// Get fees for a specific state from our stateFees data
function getFeesForState(state) {
    return stateFees[state] || null;
}

async function getFeesFromZipcode(zipcode) {
    // Get the state from zipcode
    const state = getStateFromZipcode(zipcode);
    if (!state) {
        throw new Error('Invalid zipcode');
    }

    // Get state-specific fees
    const fees = getFeesForState(state);
    if (!fees) {
        throw new Error('State fees not found');
    }

    // Get tax rates from API
    try {
        const response = await fetch(`https://api.api-ninjas.com/v1/salestax?zip_code=${zipcode}`, {
            headers: {
                'X-Api-Key': 'CNmx7CZwmDm4cnFsPDWkUw==7jAP1dX3Fht0Qukk'
            }
        });

        if (!response.ok) {
            throw new Error('Failed to fetch tax rates');
        }

        const taxData = await response.json();
        
        // Calculate total tax rate from API response (converting from decimal to percentage)
        const taxRate = parseFloat(taxData[0].total_rate) * 100;

        return {
            docFee: fees.docFee,
            titleFee: fees.titleFee,
            registrationFee: fees.registrationFee,
            taxRate: taxRate,
            state: state,
            taxBreakdown: {
                stateRate: parseFloat(taxData[0].state_rate) * 100,
                cityRate: parseFloat(taxData[0].city_rate) * 100,
                countyRate: parseFloat(taxData[0].county_rate) * 100,
                additionalRate: parseFloat(taxData[0].additional_rate) * 100
            },
            docFeeTaxable: fees.docFeeTaxable
        };
    } catch (error) {
        console.error('Tax API Error:', error);
        throw new Error('Failed to fetch tax rates. Please try again.');
    }
}

// Add zipcode validation function
function isValidZipcode(zipcode) {
    return /^\d{5}$/.test(zipcode);
}

// Add preloader functions
function showPreloader() {
    const preloader = document.getElementById('preloader');
    preloader.classList.add('show');
}

function hidePreloader() {
    const preloader = document.getElementById('preloader');
    preloader.classList.remove('show');
}

async function calculateTotal() {
    const resultDiv = document.getElementById('result');
    showPreloader();
    
    try {
        // Create a minimum delay of 1 second
        const minimumDelay = new Promise(resolve => setTimeout(resolve, 1000));
        
        // Get the values from inputs
        const sellingPrice = parseFloat(document.getElementById('sellingPrice').value.replace(/[$,]/g, '')) || 0;
        const zipcode = document.getElementById('zipcode').value;
        const tradeAllowance = parseFloat(document.getElementById('tradeAllowance').value.replace(/[$,]/g, '')) || 0;
        const cashDown = parseFloat(document.getElementById('cashDown').value.replace(/[$,]/g, '')) || 0;
        const loanTerm = document.getElementById('loanTerm').value;
        const interestRate = parseFloat(document.getElementById('interestRate').value.replace(/[%]/g, '')) || 0;

        // Validate inputs
        if (!sellingPrice || isNaN(sellingPrice)) {
            throw new Error('Please enter a valid selling price');
        }
        
        if (!isValidZipcode(zipcode)) {
            throw new Error('Please enter a valid 5-digit zipcode');
        }
        
        // Get fees based on zipcode
        const fees = await getFeesFromZipcode(zipcode);
        
        // Wait for both the fees calculation and minimum delay
        await Promise.all([minimumDelay, Promise.resolve(fees)]);
        
        const { docFee, titleFee, registrationFee, taxRate, state, docFeeTaxable } = fees;

        // Calculate taxable amount based on whether doc fees are taxable in the state
        const taxableAmount = sellingPrice - tradeAllowance + (docFeeTaxable ? docFee : 0);
        const salesTax = taxableAmount * (taxRate / 100);
        
        const totalBeforeTrade = sellingPrice + docFee + salesTax + titleFee + registrationFee;
        const total = totalBeforeTrade - tradeAllowance;
        const increase = totalBeforeTrade - sellingPrice;
        const increasePercentage = (increase / sellingPrice) * 100;

        const currentDate = new Date().toLocaleDateString();
        const resultHTML = `
            <div class="print-content">
                <img src="car-wise-calculator-logo.svg" alt="CarWise Calculator" class="results-logo">
                <h2>Purchase Details</h2>
                
                <div class="result-row">
                    <span class="result-label">Selling Price</span>
                    <span class="result-value">${formatCurrency(sellingPrice)}</span>
                </div>
                <div class="result-row">
                    <span class="result-label">Trade Allowance</span>
                    <span class="result-value">${formatCurrency(tradeAllowance)}</span>
                </div>
                <div class="result-row">
                    <span class="result-label">Doc Fee${docFeeTaxable ? ' (Taxable)' : ''}</span>
                    <span class="result-value">${formatCurrency(docFee)}</span>
                </div>
                <div class="result-row">
                    <span class="result-label">Title Fee</span>
                    <span class="result-value">${formatCurrency(titleFee)}</span>
                </div>
                <div class="result-row">
                    <span class="result-label">Registration Fee</span>
                    <span class="result-value">${formatCurrency(registrationFee)}</span>
                </div>
                <div class="result-row">
                    <span class="result-label">Sales Tax (${taxRate.toFixed(3)}%)</span>
                    <span class="result-value">${formatCurrency(salesTax)}</span>
                </div>

                <div class="total-section">
                    <div class="result-row">
                        <span class="result-label">Estimated Out-the-Door</span>
                        <span class="result-value total">${formatCurrency(total)}</span>
                    </div>
                </div>

                <p class="price-explanation">
                    The total out-the-door price of ${formatCurrency(totalBeforeTrade)} (not including your Trade Allowance) is <span class="highlight">${formatCurrency(increase)}</span> more than the selling price of ${formatCurrency(sellingPrice)}, representing a <span class="highlight">${increasePercentage.toFixed(2)}%</span> increase. With your trade allowance, the total out-the-door is ${formatCurrency(total)}.
                </p>

                ${loanTerm ? `
                    <h3>Payment Details</h3>
                    <div class="result-row">
                        <span class="result-label">Cash Down</span>
                        <span class="result-value">${formatCurrency(cashDown)}</span>
                    </div>
                    <div class="result-row">
                        <span class="result-label">Amount to Finance</span>
                        <span class="result-value">${formatCurrency(total - cashDown)}</span>
                    </div>
                    <div class="result-row">
                        <span class="result-label">Loan Term</span>
                        <span class="result-value">${loanTerm} months</span>
                    </div>
                    <div class="result-row">
                        <span class="result-label">Interest Rate/APR</span>
                        <span class="result-value">${interestRate}%</span>
                    </div>
                    ${interestRate ? `
                        <div class="total-section">
                            <div class="result-row">
                                <span class="result-label">Amount to Finance</span>
                                <span class="result-value">${formatCurrency(total - cashDown)}</span>
                            </div>
                            <div class="result-row">
                                <span class="result-label">Estimated Monthly Payment</span>
                                <span class="result-value total">${formatCurrency(calculateMonthlyPayment(total - cashDown, interestRate, loanTerm))}</span>
                            </div>
                        </div>
                    ` : ''}
                ` : ''}
                <p class="disclaimer">The total out-the-door price and monthly payment are estimates. Fees may vary at the dealership.</p>
            </div>
            <div class="button-container no-print">
                <button onclick="window.print()" class="print-button">Print</button>
                <button onclick="window.location.href='https://www.carwisela.com'" class="cta-button">Save Time & Money with CarWise</button>
            </div>
        `;

        resultDiv.innerHTML = resultHTML;
        resultDiv.classList.add('has-results');
    } catch (error) {
        resultDiv.innerHTML = `<p class="error">${error.message}</p>`;
        resultDiv.classList.add('has-results');
    } finally {
        hidePreloader();
    }
}

function calculateMonthlyPayment(principal, annualRate, months) {
    const monthlyRate = (annualRate / 100) / 12;
    if (monthlyRate === 0) return principal / months;
    
    return (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) / 
           (Math.pow(1 + monthlyRate, months) - 1);
}