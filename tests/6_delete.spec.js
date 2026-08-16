import { test } from "../fixtures/apifixture";
import { Delete_function } from "../services/delete_service";

import { validateStatus, validateTruthy } from "../utils/response_validator";

test("Delete booking", async ({ booking, token }) => {
  const response = await Delete_function(booking.bookingid, token);

  validateStatus(response, 201);
});
