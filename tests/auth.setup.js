import fs from "fs";
import { test as setup } from "@playwright/test";
import { Login } from "../payloads/loginpayload";

const BASE_URL = "https://restful-booker.herokuapp.com";
const AUTH_DIR = "playwright/.auth";
const AUTH_FILE = `${AUTH_DIR}/user.json`;

setup("authenticate", async ({ request }) => {
  const response = await request.post(`${BASE_URL}/auth`, {
    data: Login,
  });

  const { token } = await response.json();

  fs.mkdirSync(AUTH_DIR, { recursive: true });

  fs.writeFileSync(
    AUTH_FILE,
    JSON.stringify(
      {
        cookies: [
          {
            name: "token",
            value: token,
            domain: "restful-booker.herokuapp.com",
            path: "/",
            expires: -1,
            httpOnly: false,
            secure: false,
            sameSite: "Lax",
          },
        ],
        origins: [],
      },
      null,
      2,
    ),
  );
});
