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

// Remove comma formatting logic
function addCommaFormatting() {
    const fields = ['sellingPrice', 'tradeAllowance', 'cashDown'];
    fields.forEach(fieldId => {
        const field = document.getElementById(fieldId);
        field.addEventListener('input', (e) => {
            const value = e.target.value.replace(/,/g, ''); // Remove existing commas
            if (!isNaN(value) && value !== '') {
                const formattedValue = formatNumberWithCommas(value);
                e.target.value = formattedValue;
                e.target.setSelectionRange(formattedValue.length, formattedValue.length); // Move cursor to end
            } else {
                e.target.value = value.replace(/[^0-9]/g, ''); // Remove non-numeric characters
            }
        });
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
            }
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

async function calculateTotal() {
    const sellingPrice = parseFloat(document.getElementById('sellingPrice').value.replace(/,/g, '')) || 0;
    const zipcode = document.getElementById('zipcode').value;
    const tradeAllowance = parseFloat(document.getElementById('tradeAllowance').value.replace(/,/g, '')) || 0;
    const cashDown = parseFloat(document.getElementById('cashDown').value.replace(/,/g, '')) || 0;
    const loanTerm = document.getElementById('loanTerm').value;
    const interestRate = parseFloat(document.getElementById('interestRate').value) || 0;

    if (!isValidZipcode(zipcode)) {
        alert('Please enter a valid 5-digit zipcode');
        return;
    }

    try {
        const fees = await getFeesFromZipcode(zipcode);
        const { docFee, titleFee, registrationFee, taxRate, state } = fees;

        const salesTax = (sellingPrice - tradeAllowance) * (taxRate / 100);
        const totalBeforeTrade = sellingPrice + docFee + salesTax + titleFee + registrationFee;
        const total = totalBeforeTrade - tradeAllowance;
        const increase = totalBeforeTrade - sellingPrice;
        const increasePercentage = (increase / sellingPrice) * 100;

        const currentDate = new Date().toLocaleDateString();
        const resultHTML = `
            <div class="print-content">
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
                    <span class="result-label">Doc Fee</span>
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
                    The total out-the-door price of ${formatCurrency(totalBeforeTrade)} (not including your Trade Allowance) is ${formatCurrency(increase)} more than the selling price of ${formatCurrency(sellingPrice)}, representing a ${increasePercentage.toFixed(2)}% increase. With your trade allowance, the total out-the-door is ${formatCurrency(total)}.
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
            <button onclick="window.print()" class="print-button no-print">Print</button>
        `;

        document.getElementById('result').innerHTML = resultHTML;
    } catch (error) {
        alert(error.message);
    }
}

function calculateMonthlyPayment(principal, annualRate, months) {
    const monthlyRate = (annualRate / 100) / 12;
    if (monthlyRate === 0) return principal / months;
    
    return (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) / 
           (Math.pow(1 + monthlyRate, months) - 1);
}