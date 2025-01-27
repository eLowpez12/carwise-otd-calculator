# CarWise Out-the-Door Calculator Documentation

## Overview
The Out-the-Door Calculator is a web-based tool designed to help your customers estimate the total cost of their vehicle purchase, including all taxes, fees, and potential monthly payments. This documentation provides details about the calculator's features, maintenance requirements, and technical specifications.

## Features & Benefits

### Core Features
1. **ZIP Code-Based Calculations**
   - Real-time tax rate lookup
   - State-specific fees automatically applied
   - Accurate local tax rates

2. **Trade-In Integration**
   - Automatic tax benefit calculations where applicable
   - State-specific trade-in rules (CA, HI, VA handled differently)
   - Clear display of trade-in impact on final price

3. **Financing Options**
   - Monthly payment calculations
   - Multiple loan term options (36-84 months)
   - Down payment consideration
   - Interest rate/APR integration

4. **User Experience**
   - Mobile-responsive design
   - Helpful tooltips for each field
   - Print-friendly results
   - Clean, professional interface

## Maintenance Requirements

### Regular Updates Needed
1. **State Fees** (in zipcode-data.js)
   - Document fees
   - Registration fees
   - Title fees
   - State-specific rules

2. **API Integration**
   - Monitor API usage
   - Renew API key when needed
   - Update encoded key in script.js if changed

### Recommended Schedule
- Review state fees quarterly
- Verify API functionality monthly
- Update browser compatibility as needed

## Technical Specifications

### Hosting Requirements
- Basic web hosting (no special server needed)
- HTTPS recommended for security
- No database required

### Browser Support
- All modern browsers supported
- Responsive design for mobile devices
- Print functionality tested across platforms

## User Instructions

### Basic Usage
1. Enter vehicle selling price
2. Input ZIP code
3. Click "Calculate" for basic result

### Advanced Features
1. Add trade-in value
2. Enter cash down amount
3. Select loan term
4. Input interest rate
5. Get detailed payment breakdown

### Results Include
- Total out-the-door price
- All applicable fees
- Tax calculations
- Monthly payment (if financing)
- Printable summary

## Support & Maintenance

### Updates Required For
- State fee changes
- Tax law changes
- API key renewals
- Browser compatibility

### Customization Options
- Color scheme adjustable
- Logo replaceable
- Text content editable
- Tooltip content modifiable

## Security Features
- Protected API key
- Input validation
- Error handling
- No data storage required

## Version Information
Current Version: 1.0
Last Updated: January 2024 