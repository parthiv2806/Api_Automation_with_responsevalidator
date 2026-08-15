import { post } from "../utils/apiclients";

export async function Lofin_Function(payload) {
  return await post("https://restful-booker.herokuapp.com/auth", payload);
}
