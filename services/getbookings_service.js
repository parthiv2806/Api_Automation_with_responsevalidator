import { get } from "../utils/apiclients";

export async function Getbooking(bookingid) {
  return await get(
    `https://restful-booker.herokuapp.com/booking/${bookingid}`,
  );
}