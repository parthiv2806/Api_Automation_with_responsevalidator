import { patch } from "../utils/apiclients";

export async function Partil_update(payload, bookingid) {
  return await patch(
    `https://restful-booker.herokuapp.com/booking/${bookingid}`,
    payload,
  );
}
