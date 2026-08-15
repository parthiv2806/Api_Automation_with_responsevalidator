import { post } from "../utils/apiclients";

export async function Create_booking(payload) {
  return await post("https://restful-booker.herokuapp.com/booking", payload);
}
