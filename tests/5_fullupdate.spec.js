import { test } from "../fixtures/apifixture";
import { PutBooking } from "../payloads/fullupdate_payload";
import { Full_update } from "../services/fullupdate._service";

import {
    validateProperty,
    validateTruthy,
    validateBody,
    validateStatus,
} from "../utils/response_validator";


test("Full update", async ({ booking }) => {

    const response = await Full_update(
        PutBooking,
        booking.bookingid
    );

    validateStatus(response, 200);

    const body = await response.json();

    console.log(body);

    // Property validation
    validateProperty(body, "firstname");
    validateProperty(body, "lastname");
    validateProperty(body, "totalprice");
    validateProperty(body, "depositpaid");
    validateProperty(body, "bookingdates");
    validateProperty(body.bookingdates, "checkin");
    validateProperty(body.bookingdates, "checkout");
    validateProperty(body, "additionalneeds");

    // Truthy validation
    validateTruthy(body.firstname);
    validateTruthy(body.lastname);
    validateTruthy(body.totalprice);
    validateTruthy(body.bookingdates.checkin);
    validateTruthy(body.bookingdates.checkout);
    validateTruthy(body.additionalneeds);

    // Body validation
    validateBody(body, {
        firstname: PutBooking.firstname,
        lastname: PutBooking.lastname,
        totalprice: PutBooking.totalprice,
        depositpaid: PutBooking.depositpaid,
        bookingdates: {
            checkin: PutBooking.bookingdates.checkin,
            checkout: PutBooking.bookingdates.checkout,
        },
        additionalneeds: PutBooking.additionalneeds,
    });
});