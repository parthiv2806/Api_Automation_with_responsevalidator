import { test as base } from "@playwright/test";
import { initApiClient } from "../utils/apiclients";
import { Lofin_Function } from "../services/loginservices";
import { Login } from "../payloads/loginpayload";
import { Create_booking } from "../services/createbooking_service";
import { CreateBooking } from "../payloads/createbooking_payload";
export const test = base.extend({
  // Initialize API client once per worker
  apiClient: [
    async ({}, use) => {
      await initApiClient();
      await use();
    },
    { scope: "worker" },
  ],

  auth: [
    async ({ apiClient }, use) => {
      const response = await Lofin_Function(Login);

      const body = await response.json();

      await use({
        response,
        body,
      });
    },
    { scope: "worker" },
  ],

  booking: [
    async ({ apiClient }, use) => {
      const response = await Create_booking(CreateBooking);

      const body = await response.json();
      console.log(body);
      const bookingid = body.bookingid;

      console.log("Created Booking ID:", bookingid);
      // fs.writeFileSync(
      //   "./test-data/booking.json",
      //   JSON.stringify({ bookingid }, null, 2),
      // );

      await use({
        response,
        body,
        bookingid,
      });
    },
    { scope: "worker" },
  ],
});
