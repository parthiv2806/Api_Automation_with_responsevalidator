import { test } from "../fixtures/apifixture";
import { Partial_update } from "../payloads/partialupdate_payload";
import { Partil_update } from "../services/partialupdate_service";
import {
  validateBody,
  validateProperty,
  validateStatus,
  validateTruthy,
} from "../utils/response_validator";

test("Partial update", async ({ booking }) => {
  const response = await Partil_update(
    Partial_update,
    booking.bookingid,
  );

  const body = await response.json();
  console.log(body);

  validateProperty(body, "firstname");
  validateProperty(body, "lastname");

  validateTruthy(body.firstname);
  validateTruthy(body.lastname);

  validateBody(body, {
    firstname: Partial_update.firstname,
    lastname: Partial_update.lastname,
  });
});
