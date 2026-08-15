import { test } from "../fixtures/apifixture";
import { Create_booking } from "../services/createbooking_service";

import {
  validateStatus,
  validateTruthy,
  validateProperty,
  validateBody,
  validateTextBody,
} from "../utils/response_validator";
import { emptyFirstnamePayload } from "../payloads/createbooking_payload";
import { emptyLastnamePayload } from "../payloads/createbooking_payload";
import { negativeTotalPricePayload } from "../payloads/createbooking_payload";
import { zeroTotalPricePayload } from "../payloads/createbooking_payload";
import { invalidCheckinPayload } from "../payloads/createbooking_payload";
import { invalidCheckoutPayload } from "../payloads/createbooking_payload";
import { checkoutBeforeCheckinPayload } from "../payloads/createbooking_payload";
import { missingFirstnamePayload } from "../payloads/createbooking_payload";
import { missingLastnamePayload } from "../payloads/createbooking_payload";
import { missingTotalPricePayload } from "../payloads/createbooking_payload";
import { missingBookingDatesPayload } from "../payloads/createbooking_payload";
import { emptyAdditionalNeedsPayload } from "../payloads/createbooking_payload";
import { invalidDepositPaidPayload } from "../payloads/createbooking_payload";
import { invalidTotalPriceTypePayload } from "../payloads/createbooking_payload";
import { emptyBookingPayload } from "../payloads/createbooking_payload";

test("Create booking", async ({ booking }) => {
  // Status
  validateStatus(booking.response, 200);

  // Properties
  validateProperty(booking.body, "bookingid");
  validateProperty(booking.body, "booking");

  validateProperty(booking.body.booking, "firstname");
  validateProperty(booking.body.booking, "lastname");
  validateProperty(booking.body.booking, "totalprice");
  validateProperty(booking.body.booking, "depositpaid");
  validateProperty(booking.body.booking, "bookingdates");
  validateProperty(booking.body.booking.bookingdates, "checkin");
  validateProperty(booking.body.booking.bookingdates, "checkout");
  validateProperty(booking.body.booking, "additionalneeds");

  // Truthy values
  validateTruthy(booking.body.bookingid);
  validateTruthy(booking.body.booking.firstname);
  validateTruthy(booking.body.booking.lastname);
  validateTruthy(booking.body.booking.totalprice);
  validateTruthy(booking.body.booking.bookingdates.checkin);
  validateTruthy(booking.body.booking.bookingdates.checkout);
  validateTruthy(booking.body.booking.additionalneeds);

  // Exact body validation
  validateBody(booking.body, {
    booking: {
      firstname: "Parthiv",
      lastname: "Bhavsar",
      totalprice: 1112,
      depositpaid: false,
      bookingdates: {
        checkin: "2018-01-01",
        checkout: "2019-01-01",
      },
      additionalneeds: "Lunch",
    },
  });
});

test("emptyFirstnamePayload", async ({ apiClient }) => {
  const response = await Create_booking(apiClient, emptyFirstnamePayload);

  //   console.log("Status:", response.status());

  //   const body = await response.json();

  //   console.log("Body:", body);

  validateStatus(response, 500);

  const body = await response.text();

  validateTextBody(body, "Internal Server Error");
  validateTruthy(body);
});

test("emptyLastnamePayload", async ({ apiClient }) => {
  const response = await Create_booking(apiClient, emptyLastnamePayload);

  validateStatus(response, 500);

  const body = await response.text();

  validateTextBody(body, "Internal Server Error");
  validateTruthy(body);
});

test("negativeTotalPricePayload", async ({ apiClient }) => {
  const response = await Create_booking(apiClient, negativeTotalPricePayload);

  validateStatus(response, 500);

  const body = await response.text();

  validateTextBody(body, "Internal Server Error");
  validateTruthy(body);
});

test("zeroTotalPricePayload", async ({ apiClient }) => {
  const response = await Create_booking(apiClient, zeroTotalPricePayload);

  validateStatus(response, 500);

  const body = await response.text();

  validateTextBody(body, "Internal Server Error");
  validateTruthy(body);
});

test("invalidCheckinPayload", async ({ apiClient }) => {
  const response = await Create_booking(apiClient, invalidCheckinPayload);

  validateStatus(response, 500);

  const body = await response.text();

  validateTextBody(body, "Internal Server Error");
  validateTruthy(body);
});

test("invalidCheckoutPayload", async ({ apiClient }) => {
  const response = await Create_booking(apiClient, invalidCheckoutPayload);

  validateStatus(response, 500);

  const body = await response.text();

  validateTextBody(body, "Internal Server Error");
  validateTruthy(body);
});

test("checkoutBeforeCheckinPayload", async ({ apiClient }) => {
  const response = await Create_booking(
    apiClient,
    checkoutBeforeCheckinPayload,
  );

  validateStatus(response, 500);

  const body = await response.text();

  validateTextBody(body, "Internal Server Error");
  validateTruthy(body);
});

test("missingFirstnamePayload", async ({ apiClient }) => {
  const response = await Create_booking(apiClient, missingFirstnamePayload);

  validateStatus(response, 500);

  const body = await response.text();

  validateTextBody(body, "Internal Server Error");
  validateTruthy(body);
});

test("missingLastnamePayload", async ({ apiClient }) => {
  const response = await Create_booking(apiClient, missingLastnamePayload);

  validateStatus(response, 500);

  const body = await response.text();

  validateTextBody(body, "Internal Server Error");
  validateTruthy(body);
});

test("missingTotalPricePayload", async ({ apiClient }) => {
  const response = await Create_booking(apiClient, missingTotalPricePayload);

  validateStatus(response, 500);

  const body = await response.text();

  validateTextBody(body, "Internal Server Error");
  validateTruthy(body);
});

test("missingBookingDatesPayload", async ({ apiClient }) => {
  const response = await Create_booking(apiClient, missingBookingDatesPayload);

  validateStatus(response, 500);

  const body = await response.text();

  validateTextBody(body, "Internal Server Error");
  validateTruthy(body);
});

test("emptyAdditionalNeedsPayload", async ({ apiClient }) => {
  const response = await Create_booking(apiClient, emptyAdditionalNeedsPayload);

  validateStatus(response, 500);

  const body = await response.text();

  validateTextBody(body, "Internal Server Error");
  validateTruthy(body);
});

test("invalidDepositPaidPayload", async ({ apiClient }) => {
  const response = await Create_booking(apiClient, invalidDepositPaidPayload);

  validateStatus(response, 500);

  const body = await response.text();

  validateTextBody(body, "Internal Server Error");
  validateTruthy(body);
});

test("invalidTotalPriceTypePayload", async ({ apiClient }) => {
  const response = await Create_booking(
    apiClient,
    invalidTotalPriceTypePayload,
  );

  validateStatus(response, 500);

  const body = await response.text();

  validateTextBody(body, "Internal Server Error");
  validateTruthy(body);
});

test("emptyBookingPayload", async ({ apiClient }) => {
  const response = await Create_booking(apiClient, emptyBookingPayload);

  validateStatus(response, 500);

  const body = await response.text();

  validateTextBody(body, "Internal Server Error");
  validateTruthy(body);
});
