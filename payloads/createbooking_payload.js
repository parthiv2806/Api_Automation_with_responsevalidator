export const CreateBooking = {
  firstname: "Parthiv",
  lastname: "Bhavsar",
  totalprice: 1112,
  depositpaid: false,
  bookingdates: {
    checkin: "2018-01-01",
    checkout: "2019-01-01",
  },
  additionalneeds: "Lunch",
};

// 1. Empty Firstname
export const emptyFirstnamePayload = {
    firstname: "",
    lastname: "Bhavsar",
    totalprice: 1112,
    depositpaid: false,
    bookingdates: {
        checkin: "2018-01-01",
        checkout: "2019-01-01",
    },
    additionalneeds: "Lunch",
};


// 2. Empty Lastname
export const emptyLastnamePayload = {
    firstname: "Parthiv",
    lastname: "",
    totalprice: 1112,
    depositpaid: false,
    bookingdates: {
        checkin: "2018-01-01",
        checkout: "2019-01-01",
    },
    additionalneeds: "Lunch",
};


// 3. Negative Total Price
export const negativeTotalPricePayload = {
    firstname: "Parthiv",
    lastname: "Bhavsar",
    totalprice: -1112,
    depositpaid: false,
    bookingdates: {
        checkin: "2018-01-01",
        checkout: "2019-01-01",
    },
    additionalneeds: "Lunch",
};


// 4. Zero Total Price
export const zeroTotalPricePayload = {
    firstname: "Parthiv",
    lastname: "Bhavsar",
    totalprice: 0,
    depositpaid: false,
    bookingdates: {
        checkin: "2018-01-01",
        checkout: "2019-01-01",
    },
    additionalneeds: "Lunch",
};


// 5. Invalid Check-in Date
export const invalidCheckinPayload = {
    firstname: "Parthiv",
    lastname: "Bhavsar",
    totalprice: 1112,
    depositpaid: false,
    bookingdates: {
        checkin: "invalid-date",
        checkout: "2019-01-01",
    },
    additionalneeds: "Lunch",
};


// 6. Invalid Check-out Date
export const invalidCheckoutPayload = {
    firstname: "Parthiv",
    lastname: "Bhavsar",
    totalprice: 1112,
    depositpaid: false,
    bookingdates: {
        checkin: "2018-01-01",
        checkout: "invalid-date",
    },
    additionalneeds: "Lunch",
};


// 7. Checkout Before Check-in
export const checkoutBeforeCheckinPayload = {
    firstname: "Parthiv",
    lastname: "Bhavsar",
    totalprice: 1112,
    depositpaid: false,
    bookingdates: {
        checkin: "2019-01-01",
        checkout: "2018-01-01",
    },
    additionalneeds: "Lunch",
};


// 8. Missing Firstname
export const missingFirstnamePayload = {
    lastname: "Bhavsar",
    totalprice: 1112,
    depositpaid: false,
    bookingdates: {
        checkin: "2018-01-01",
        checkout: "2019-01-01",
    },
    additionalneeds: "Lunch",
};


// 9. Missing Lastname
export const missingLastnamePayload = {
    firstname: "Parthiv",
    totalprice: 1112,
    depositpaid: false,
    bookingdates: {
        checkin: "2018-01-01",
        checkout: "2019-01-01",
    },
    additionalneeds: "Lunch",
};


// 10. Missing Total Price
export const missingTotalPricePayload = {
    firstname: "Parthiv",
    lastname: "Bhavsar",
    depositpaid: false,
    bookingdates: {
        checkin: "2018-01-01",
        checkout: "2019-01-01",
    },
    additionalneeds: "Lunch",
};


// 11. Missing Booking Dates
export const missingBookingDatesPayload = {
    firstname: "Parthiv",
    lastname: "Bhavsar",
    totalprice: 1112,
    depositpaid: false,
    additionalneeds: "Lunch",
};


// 12. Empty Additional Needs
export const emptyAdditionalNeedsPayload = {
    firstname: "Parthiv",
    lastname: "Bhavsar",
    totalprice: 1112,
    depositpaid: false,
    bookingdates: {
        checkin: "2018-01-01",
        checkout: "2019-01-01",
    },
    additionalneeds: "",
};


// 13. Invalid Deposit Paid Type
export const invalidDepositPaidPayload = {
    firstname: "Parthiv",
    lastname: "Bhavsar",
    totalprice: 1112,
    depositpaid: "false",
    bookingdates: {
        checkin: "2018-01-01",
        checkout: "2019-01-01",
    },
    additionalneeds: "Lunch",
};


// 14. Invalid Total Price Type
export const invalidTotalPriceTypePayload = {
    firstname: "Parthiv",
    lastname: "Bhavsar",
    totalprice: "1112",
    depositpaid: false,
    bookingdates: {
        checkin: "2018-01-01",
        checkout: "2019-01-01",
    },
    additionalneeds: "Lunch",
};


// 15. Empty Booking Object
export const emptyBookingPayload = {
    booking: {}
};