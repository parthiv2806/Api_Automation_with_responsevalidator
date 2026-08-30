import { test } from "../fixtures/apifixture";
import { expect } from "@playwright/test";
import {
  validateStatus,
  validateTruthy,
  validateProperty,
  validateBody,
} from "../utils/response_validator";
import { invalidPasswordPayload } from "../payloads/loginpayload";
import { invalidUsernamePayload } from "../payloads/loginpayload";
import { bothInvalidPayload } from "../payloads/loginpayload";
import { emptyUsernamePayload } from "../payloads/loginpayload";
import { emptyPasswordPayload } from "../payloads/loginpayload";
import { emptyCredentialsPayload } from "../payloads/loginpayload";
import { missingPasswordPayload } from "../payloads/loginpayload";
import { missingUsernamePayload } from "../payloads/loginpayload";
import { Lofin_Function } from "../services/loginservices";

// import { initApiClient } from "../utils/apiclients";
// import { Lofin_Function } from "../services/loginservices";
// import { Login } from "../payloads/loginpayload";
test("Login Test case", async ({ auth }) => {
  // const response = await Lofin_Function(Login);
  // const body = await response.json();
  // console.log(body);
  // console.log("Token:", body.token);

  // expect(auth.response.status()).toBe(200);

  // expect(auth.body.token).toBeTruthy();
  validateStatus(auth.response, 200);
  validateTruthy(auth.body.token);
  validateProperty(auth.body, "token");
  validateBody(auth.body, {
    token: expect.any(String),
  });
});

// Status   → API successful hai?
// Property → Field hai?
// Truthy   → Value hai?
// Body     → Data sahi hai?

test("Invalid Username Login", async ({ apiClient }) => {
  const response = await Lofin_Function(apiClient, invalidUsernamePayload);

  // console.log("Status:", response.status());

  const body = await response.json();

  // console.log("Body:", body);
  validateStatus(response, 200);
  validateProperty(body, "reason");
  validateBody(body, {
    reason: "Bad credentials",
  });
  validateTruthy(body.reason);
});

test("Invalid Password Login", async ({ apiClient }) => {
  const response = await Lofin_Function(apiClient, invalidUsernamePayload);
  // console.log("Status:", response.status());
  const body = await response.json();
  // console.log("Body:", body);
  validateStatus(response, 200);
  validateProperty(body, "reason");
  validateBody(body, {
    reason: "Bad credentials",
  });
  validateTruthy(body.reason);
});

test("Invalid Both Username & Password Login", async ({ apiClient }) => {
  const response = await Lofin_Function(apiClient, bothInvalidPayload);
  // console.log("Status:", response.status());
  const body = await response.json();
  // console.log("Body:", body);
  validateStatus(response, 200);
  validateProperty(body, "reason");
  validateBody(body, {
    reason: "Bad credentials",
  });
  validateTruthy(body.reason);
});

test("emptyUsernamePayload", async ({ apiClient }) => {
  const response = await Lofin_Function(apiClient, emptyUsernamePayload);
  // console.log("Status:", response.status());
  const body = await response.json();
  // console.log("Body:", body);
  validateStatus(response, 200);
  validateProperty(body, "reason");
  validateBody(body, {
    reason: "Bad credentials",
  });
  validateTruthy(body.reason);
});

test("emptyPasswordPayload", async ({ apiClient }) => {
  const response = await Lofin_Function(apiClient, emptyPasswordPayload);
  // console.log("Status:", response.status());
  const body = await response.json();
  // console.log("Body:", body);
  validateStatus(response, 200);
  validateProperty(body, "reason");
  validateBody(body, {
    reason: "Bad credentials",
  });
  validateTruthy(body.reason);
});

test("emptyCredentialsPayload", async ({ apiClient }) => {
  const response = await Lofin_Function(apiClient, emptyCredentialsPayload);
  // console.log("Status:", response.status());
  const body = await response.json();
  // console.log("Body:", body);
  validateStatus(response, 200);
  validateProperty(body, "reason");
  validateBody(body, {
    reason: "Bad credentials",
  });
  validateTruthy(body.reason);
});

test("missingPasswordPayload", async ({ apiClient }) => {
  const response = await Lofin_Function(apiClient, missingPasswordPayload);
  // console.log("Status:", response.status());
  const body = await response.json();
  // console.log("Body:", body);
  validateStatus(response, 200);
  validateProperty(body, "reason");
  validateBody(body, {
    reason: "Bad credentials",
  });
  validateTruthy(body.reason);
});

test("missingUsernamePayload", async ({ apiClient }) => {
  const response = await Lofin_Function(apiClient, missingUsernamePayload);
  // console.log("Status:", response.status());
  const body = await response.json();
  // console.log("Body:", body);
  validateStatus(response, 200);
  validateProperty(body, "reason");
  validateBody(body, {
    reason: "Bad credentials",
  });
  validateTruthy(body.reason);
});
