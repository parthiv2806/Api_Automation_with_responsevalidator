import { patch } from "../utils/apiclients";

export async function Partil_update(payload, bookingid, token) {
  return await patch(
    `https://restful-booker.herokuapp.com/booking/${bookingid}`,
    payload,
    token,
  );
}
