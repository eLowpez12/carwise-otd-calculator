const zipcodeRanges = {
    "AL": [{ start: "35004", end: "36925" }],
    "AK": [{ start: "99501", end: "99950" }],
    "AZ": [{ start: "85001", end: "86556" }],
    "AR": [{ start: "71601", end: "72959" }],
    "CA": [{ start: "90001", end: "96162" }],
    "CO": [{ start: "80001", end: "81658" }],
    "CT": [{ start: "06001", end: "06928" }],
    "DE": [{ start: "19701", end: "19980" }],
    "DC": [{ start: "20001", end: "20799" }],
    "FL": [{ start: "32004", end: "34997" }],
    "GA": [{ start: "30001", end: "31999" }, { start: "39901", end: "39901" }],
    "HI": [{ start: "96701", end: "96898" }],
    "ID": [{ start: "83201", end: "83876" }],
    "IL": [{ start: "60001", end: "62999" }],
    "IN": [{ start: "46001", end: "47997" }],
    "IA": [{ start: "50001", end: "52809" }],
    "KS": [{ start: "66002", end: "67954" }],
    "KY": [{ start: "40003", end: "42788" }],
    "LA": [{ start: "70001", end: "71497" }],
    "ME": [{ start: "03901", end: "04992" }],
    "MD": [{ start: "20331", end: "21930" }],
    "MA": [{ start: "01001", end: "05544" }],
    "MI": [{ start: "48001", end: "49971" }],
    "MN": [{ start: "55001", end: "56763" }],
    "MS": [{ start: "38601", end: "39776" }],
    "MO": [{ start: "63001", end: "65899" }],
    "MT": [{ start: "59001", end: "59937" }],
    "NE": [{ start: "68001", end: "69367" }],
    "NV": [{ start: "88901", end: "89883" }],
    "NH": [{ start: "03031", end: "03897" }],
    "NJ": [{ start: "07001", end: "08989" }],
    "NM": [{ start: "87001", end: "88439" }],
    "NY": [{ start: "00501", end: "14975" }],
    "NC": [{ start: "27006", end: "28909" }],
    "ND": [{ start: "58001", end: "58856" }],
    "OH": [{ start: "43001", end: "45999" }],
    "OK": [{ start: "73001", end: "74966" }],
    "OR": [{ start: "97001", end: "97920" }],
    "PA": [{ start: "15001", end: "19640" }],
    "RI": [{ start: "02801", end: "02940" }],
    "SC": [{ start: "29001", end: "29945" }],
    "SD": [{ start: "57001", end: "57799" }],
    "TN": [{ start: "37010", end: "38589" }],
    "TX": [{ start: "73301", end: "79999" }, { start: "88510", end: "88589" }],
    "UT": [{ start: "84001", end: "84784" }],
    "VT": [{ start: "05001", end: "05907" }],
    "VA": [{ start: "20040", end: "24658" }],
    "WA": [{ start: "98001", end: "99403" }],
    "WV": [{ start: "24701", end: "26886" }],
    "WI": [{ start: "53001", end: "54990" }],
    "WY": [{ start: "82001", end: "83128" }]
};

const stateFees = {
    "AK": {
        docFee: 299,
        titleFee: 15,
        registrationFee: 245,
        docFeeTaxable: false,
        tradeInTaxable: false
    },
    "AL": {
        docFee: 489,
        titleFee: 18,
        registrationFee: 393,
        docFeeTaxable: true,
        tradeInTaxable: false
    },
    "AR": {
        docFee: 129,
        titleFee: 10,
        registrationFee: 28,
        docFeeTaxable: true,
        tradeInTaxable: false
    },
    "AZ": {
        docFee: 499,
        titleFee: 4,
        registrationFee: 564,
        docFeeTaxable: false,
        tradeInTaxable: false
    },
    "CA": {
        docFee: 85,
        titleFee: 25,
        registrationFee: 524,
        docFeeTaxable: true,
        tradeInTaxable: true
    },
    "CO": {
        docFee: 699,
        titleFee: 26,
        registrationFee: 595,
        docFeeTaxable: true,
        tradeInTaxable: false
    },
    "CT": {
        docFee: 599,
        titleFee: 25,
        registrationFee: 180,
        docFeeTaxable: true,
        tradeInTaxable: false
    },
    "DE": {
        docFee: 475,
        titleFee: 35,
        registrationFee: 45,
        docFeeTaxable: false,
        tradeInTaxable: false
    },
    "FL": {
        docFee: 999,
        titleFee: 75,
        registrationFee: 297,
        docFeeTaxable: true,
        tradeInTaxable: false
    },
    "GA": {
        docFee: 599,
        titleFee: 18,
        registrationFee: 20,
        docFeeTaxable: false,
        tradeInTaxable: false
    },
    "HI": {
        docFee: 395,
        titleFee: 5,
        registrationFee: 78,
        docFeeTaxable: true,
        tradeInTaxable: true
    },
    "ID": {
        docFee: 399,
        titleFee: 14,
        registrationFee: 126,
        docFeeTaxable: true,
        tradeInTaxable: false
    },
    "IL": {
        docFee: 347,
        titleFee: 155,
        registrationFee: 151,
        docFeeTaxable: true,
        tradeInTaxable: false
    },
    "IN": {
        docFee: 199,
        titleFee: 15,
        registrationFee: 38,
        docFeeTaxable: true,
        tradeInTaxable: false
    },
    "KS": {
        docFee: 499,
        titleFee: 10,
        registrationFee: 80,
        docFeeTaxable: true,
        tradeInTaxable: false
    },
    "KY": {
        docFee: 450,
        titleFee: 6,
        registrationFee: 26,
        docFeeTaxable: true,
        tradeInTaxable: false
    },
    "LA": {
        docFee: 425,
        titleFee: 77,
        registrationFee: 64,
        docFeeTaxable: true,
        tradeInTaxable: false
    },
    "MA": {
        docFee: 459,
        titleFee: 75,
        registrationFee: 60,
        docFeeTaxable: true,
        tradeInTaxable: false
    },
    "MD": {
        docFee: 499,
        titleFee: 100,
        registrationFee: 187,
        docFeeTaxable: true,
        tradeInTaxable: false
    },
    "ME": {
        docFee: 499,
        titleFee: 33,
        registrationFee: 40,
        docFeeTaxable: true,
        tradeInTaxable: false
    },
    "MI": {
        docFee: 260,
        titleFee: 15,
        registrationFee: 128,
        docFeeTaxable: true,
        tradeInTaxable: false
    },
    "MN": {
        docFee: 125,
        titleFee: 8,
        registrationFee: 69,
        docFeeTaxable: false,
        tradeInTaxable: false
    },
    "MO": {
        docFee: 565,
        titleFee: 12,
        registrationFee: 57,
        docFeeTaxable: true,
        tradeInTaxable: false
    },
    "MS": {
        docFee: 425,
        titleFee: 8,
        registrationFee: 719,
        docFeeTaxable: true,
        tradeInTaxable: false
    },
    "MT": {
        docFee: 299,
        titleFee: 12,
        registrationFee: 237,
        docFeeTaxable: false,
        tradeInTaxable: false
    },
    "NC": {
        docFee: 699,
        titleFee: 56,
        registrationFee: 370,
        docFeeTaxable: true,
        tradeInTaxable: false
    },
    "ND": {
        docFee: 299,
        titleFee: 5,
        registrationFee: 123,
        docFeeTaxable: true,
        tradeInTaxable: false
    },
    "NE": {
        docFee: 299,
        titleFee: 10,
        registrationFee: 83,
        docFeeTaxable: true,
        tradeInTaxable: false
    },
    "NH": {
        docFee: 375,
        titleFee: 25,
        registrationFee: 51,
        docFeeTaxable: false,
        tradeInTaxable: false
    },
    "NJ": {
        docFee: 695,
        titleFee: 60,
        registrationFee: 271,
        docFeeTaxable: true,
        tradeInTaxable: false
    },
    "NM": {
        docFee: 339,
        titleFee: 3,
        registrationFee: 60,
        docFeeTaxable: true,
        tradeInTaxable: false
    },
    "NV": {
        docFee: 499,
        titleFee: 28,
        registrationFee: 49,
        docFeeTaxable: true,
        tradeInTaxable: false
    },
    "NY": {
        docFee: 175,
        titleFee: 50,
        registrationFee: 146,
        docFeeTaxable: true,
        tradeInTaxable: false
    },
    "OH": {
        docFee: 250,
        titleFee: 15,
        registrationFee: 31,
        docFeeTaxable: true,
        tradeInTaxable: false
    },
    "OK": {
        docFee: 289,
        titleFee: 11,
        registrationFee: 100,
        docFeeTaxable: true,
        tradeInTaxable: false
    },
    "OR": {
        docFee: 250,
        titleFee: 106,
        registrationFee: 169,
        docFeeTaxable: true,
        tradeInTaxable: false
    },
    "PA": {
        docFee: 449,
        titleFee: 58,
        registrationFee: 39,
        docFeeTaxable: false,
        tradeInTaxable: false
    },
    "RI": {
        docFee: 399,
        titleFee: 53,
        registrationFee: 58,
        docFeeTaxable: true,
        tradeInTaxable: false
    },
    "SC": {
        docFee: 400,
        titleFee: 15,
        registrationFee: 40,
        docFeeTaxable: true,
        tradeInTaxable: false
    },
    "SD": {
        docFee: 200,
        titleFee: 10,
        registrationFee: 122,
        docFeeTaxable: true,
        tradeInTaxable: false
    },
    "TN": {
        docFee: 599,
        titleFee: 14,
        registrationFee: 29,
        docFeeTaxable: true,
        tradeInTaxable: false
    },
    "TX": {
        docFee: 150,
        titleFee: 33,
        registrationFee: 74,
        docFeeTaxable: true,
        tradeInTaxable: false
    },
    "UT": {
        docFee: 299,
        titleFee: 6,
        registrationFee: 57,
        docFeeTaxable: true,
        tradeInTaxable: false
    },
    "VA": {
        docFee: 799,
        titleFee: 15,
        registrationFee: 36,
        docFeeTaxable: true,
        tradeInTaxable: true
    },
    "VT": {
        docFee: 200,
        titleFee: 35,
        registrationFee: 78,
        docFeeTaxable: true,
        tradeInTaxable: false
    },
    "WA": {
        docFee: 199,
        titleFee: 15,
        registrationFee: 73,
        docFeeTaxable: false,
        tradeInTaxable: false
    },
    "WI": {
        docFee: 299,
        titleFee: 165,
        registrationFee: 85,
        docFeeTaxable: false,
        tradeInTaxable: false
    },
    "WV": {
        docFee: 299,
        titleFee: 15,
        registrationFee: 52,
        docFeeTaxable: false,
        tradeInTaxable: false
    },
    "WY": {
        docFee: 500,
        titleFee: 15,
        registrationFee: 616,
        docFeeTaxable: true,
        tradeInTaxable: false
    },
    "DC": {
        docFee: 300,
        titleFee: 26,
        registrationFee: 185,
        docFeeTaxable: true,
        tradeInTaxable: false
    },
    "IA": {
        docFee: 180,
        titleFee: 25,
        registrationFee: 333,
        docFeeTaxable: false,
        tradeInTaxable: false
    }
};

function getStateFromZipcode(zipcode) {
    // Ensure zipcode is a string and pad with leading zeros if necessary
    zipcode = String(zipcode).padStart(5, '0');
    
    // Iterate through the ranges for each state
    for (const [state, ranges] of Object.entries(zipcodeRanges)) {
        for (const range of ranges) {
            if (zipcode >= range.start && zipcode <= range.end) {
                return state;
            }
        }
    }
    return null; // Return null if no matching state is found
} 