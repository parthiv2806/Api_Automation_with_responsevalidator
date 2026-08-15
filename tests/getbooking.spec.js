import { test } from "../fixtures/apifixture";
import { Getbooking } from "../services/getbookings_service";
import {
  validateStatus,
  validateProperty,
  validateBody,
  validateTruthy,
} from "../utils/response_validator";
test("Get the booking", async ({ booking }) => {
  const response = await Getbooking(booking.bookingid);

  validateStatus(response, 200);

  const body = await response.json();
  console.log(body);
  validateProperty(body, "firstname");
  validateProperty(body, "lastname");
  validateProperty(body, "totalprice");
  validateProperty(body, "depositpaid");
  validateProperty(body, "bookingdates");

  validateProperty(body.bookingdates, "checkin");
  validateProperty(body.bookingdates, "checkout");

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

  validateTruthy(body.firstname);
  validateTruthy(body.lastname);
  validateTruthy(body.totalprice);
  validateTruthy(body.bookingdates.checkin);
  validateTruthy(body.bookingdates.checkout);
  validateTruthy(body.additionalneeds);
});
