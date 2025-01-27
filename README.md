# CarWise Out-the-Door Calculator

A modern, user-friendly calculator that helps car buyers estimate their total out-the-door price, including all taxes, fees, and monthly payments.

## Features

- Real-time tax rate lookup based on ZIP code
- State-specific fees and tax calculations
- Trade-in value consideration with state-specific tax implications
- Advanced options for financing calculations
- Responsive design for all devices
- Printable results
- Interactive tooltips for guidance

## Technical Details

### Core Technologies
- HTML5
- CSS3
- Vanilla JavaScript
- API Ninjas for tax rate data

### Key Components
- Dynamic tax calculations based on location
- State-specific fee database
- Trade-in tax benefit calculations (varies by state)
- Responsive layout with mobile optimization
- Print-friendly results page

### Security
- API key protection through encoding
- Input validation and sanitization
- Error handling for all API calls

## Usage

1. Enter the selling price of the vehicle
2. Input your ZIP code
3. (Optional) Add trade-in value, cash down, loan term, and interest rate
4. Click "Calculate Total" to see detailed breakdown
5. Print or save results as needed

## Maintenance

### API Integration
The calculator uses the API Ninjas service for tax rate data. The API key is encoded in the source code for basic protection.

### State Data Updates
State fees and regulations are stored in `zipcode-data.js`. Update this file when state fees or regulations change.

### Styling
The calculator uses a consistent color scheme:
- Primary Red: #E31837
- Text Gray: #444444
- Light Gray: #666666

## Browser Support
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Notes
- Document fees and registration fees are based on state averages
- Tax calculations account for state-specific trade-in rules
- CA, HI, and VA do not allow trade-in tax reduction 