import { put } from "../utils/apiclients";

export async function Full_update(payload, bookingid, token) {
  return await put(
    `https://restful-booker.herokuapp.com/booking/${bookingid}`,
    payload,
    token,
  );
}
