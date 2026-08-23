import { remove } from "../utils/apiclients";

export async function Delete_function(bookingid) {
  return await remove(
    `https://restful-booker.herokuapp.com/booking/${bookingid}`,
  );
}
