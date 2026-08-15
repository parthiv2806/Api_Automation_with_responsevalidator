import { expect } from "@playwright/test";

export function validateStatus(response, expectedStatus) {
  expect(response.status()).toBe(expectedStatus);
}
export function validateTruthy(value) {
  expect(value).toBeTruthy();
}

export function validateProperty(body, property) {
  expect(body).toHaveProperty(property);
}
export function validateBody(body, property) {
  expect(body).toMatchObject(property);
}

export function validateTextBody(body, expectedBody) {
  expect(body).toBe(expectedBody);
}
// export function Validate

// Status   → API successful hai?
// Property → Field hai?
// Truthy   → Value hai?
// Body     → Data sahi hai?

// Status     → 200 hai?
// Property   → token field hai?
// Truthy     → token mein value hai?
// Body       → token String hai?
