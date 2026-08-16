# API Automation with Response Validator

A Playwright-based **REST API automation** project that tests a full booking lifecycle on the public [restful-booker](https://restful-booker.herokuapp.com) demo API. All responses are validated through a central **response validator** module.

---

## Project Overview

This project automates the complete booking flow:

```
Login → Create Booking → Get Booking → Partial Update (PATCH) → Full Update (PUT) → Delete Booking
```

Every API response is validated for:

- **Status** – HTTP status code correct hai?
- **Property** – required field present hai?
- **Truthy** – field mein value hai?
- **Body** – response data expected data se match karta hai?
- **Text body** – raw text response correct hai?

---

## Tech Stack

- **Language:** JavaScript (CommonJS / ES modules)
- **Framework:** Playwright Test (`@playwright/test` ^1.62.1)
- **API:** restful-booker demo API (no API keys needed, public demo)

---

## Project Structure

```
.
├── .github/workflows/playwright.yml   # GitHub Actions CI pipeline
├── fixtures/
│   └── apifixture.js                  # Reusable fixtures (apiClient, auth, token, booking)
├── payloads/
│   ├── loginpayload.js                # Login + negative login payloads
│   ├── createbooking_payload.js       # Valid + 15 negative create payloads
│   ├── fullupdate_payload.js          # PUT payload
│   └── partialupdate_payload.js       # PATCH payload
├── services/                          # API call layer (1 service = 1 endpoint)
│   ├── loginservices.js
│   ├── createbooking_service.js
│   ├── getbookings_service.js
│   ├── partialupdate_service.js
│   ├── fullupdate._service.js
│   └── delete_service.js
├── tests/                             # Test specs (numbered = execution order)
│   ├── 1_login.spec.js
│   ├── 2_createbooking.spec.js
│   ├── 3_getbooking.spec.js
│   ├── 4_partialupdate.spec.js
│   ├── 5_fullupdate.spec.js
│   └── 6_delete.spec.js
├── utils/
│   ├── apiclients.js                  # HTTP wrapper (get/post/patch/put/delete)
│   ├── response_validator.js          # Central assertion/validation functions
│   └── tokenmanager.js                # In-memory token storage
├── playwright.config.js               # Playwright config (sequential, 1 worker)
└── package.json
```

---

## Architecture / Flow

1. **Fixtures** (`fixtures/apifixture.js`) create reusable state:
   - `apiClient` – initializes one Playwright request context per worker.
   - `auth` – logs in and stores the token.
   - `token` – exposes the stored token (used for PATCH/PUT/DELETE via `Cookie: token=...`).
   - `booking` – creates one booking (worker-scoped) and exposes `{ response, body, bookingid }` so **the same booking ID is reused** by get → patch → put → delete.

2. **Services** map 1:1 to API endpoints and call the HTTP wrapper.

3. **Utils** handle the actual HTTP calls and validation.

4. **Tests** consume the fixtures, call the services, and validate responses.

### Execution order (by file name prefix)

| Order | File                     | Operation   | Endpoint                     |
|-------|--------------------------|-------------|------------------------------|
| 1     | `1_login.spec.js`        | Login       | `POST /auth`                 |
| 2     | `2_createbooking.spec.js`| Create      | `POST /booking`              |
| 3     | `3_getbooking.spec.js`   | Get         | `GET /booking/:id`           |
| 4     | `4_partialupdate.spec.js`| PATCH       | `PATCH /booking/:id`         |
| 5     | `5_fullupdate.spec.js`   | PUT         | `PUT /booking/:id`           |
| 6     | `6_delete.spec.js`       | Delete      | `DELETE /booking/:id`        |

Order is enforced with **numbered file prefixes** + `workers: 1` + `fullyParallel: false` in `playwright.config.js`.

---

## Issues Faced & Fixes

### 1. "Bad credentials" on login
- **Issue:** `post(url, payload)` passed the payload directly to `apicontext.post()`.
- **Cause:** Playwright's `post()` second argument is an **options object**, not the raw body. The payload was ignored → empty body → `{ reason: 'Bad credentials' }`.
- **Fix:** Wrap payload as `{ data: payload }` with `Content-Type: application/json` in `utils/apiclients.js`.

### 2. `response is not defined` in specs
- **Issue:** `validateStatus(response, 200)` but `response` wasn't a parameter.
- **Cause:** The fixture returns values under `auth` / `booking`, so `response` had to be accessed as `auth.response` / `booking.response`.
- **Fix:** Use `validateStatus(auth.response, 200)` and `validateStatus(booking.response, 200)`.

### 3. Missing `return` in service functions
- **Issue:** `Getbooking()` and `Delete_function()` didn't `return` the request result → `undefined` → `Cannot read properties of undefined (reading 'status')`.
- **Fix:** Add `return await get(...)` / `return await remove(...)`.

### 4. Missing validator imports
- **Issue:** `validateProperty` / `validateTruthy` used but not imported in spec files → `ReferenceError`.
- **Fix:** Import the validators from `utils/response_validator.js`.

### 5. Delete used the `delete` keyword
- **Issue:** `delete_service.js` called the JS reserved `delete` operator instead of the `remove()` helper → no HTTP call, returned `undefined`.
- **Fix:** Call `remove(url, token)` which sends `DELETE` with `Cookie: token=...`.

### 6. Intermittent 404 in "Get booking" (data purge)
- **Issue:** Sometimes `GET /booking/:id` returned 404 even right after creation.
- **Cause:** restful-booker is a **public demo server that purges all bookings every ~10 minutes**. A worker-scoped booking could be purged between create and get.
- **Fix:** Keep the booking worker-scoped (so the same ID is reused) and accept the demo-server limitation; booking is created fresh per test run. (Note: a purge landing exactly inside a test run is the server's limitation, not the code.)

### 7. 405 on Full Update (PUT)
- **Issue:** `PUT /booking/:id` returned 405 Method Not Allowed.
- **Cause:** Test files ran in **alphabetical order**, so `delete.spec.js` ran *before* `Fullupdate.spec.js` and deleted the shared booking. PUT on a deleted booking → 405.
- **Fix:** Renamed spec files with numeric prefixes (`1_login` → `6_delete`) and set `fullyParallel: false` + `workers: 1` so the flow runs login → create → get → patch → put → delete.

### 8. Playwright 1.62.1 fixture bug (single-element array)
- **Issue:** A fixture defined as a single-element array `booking: [async () => {...}]` (test scope) returned `[AsyncFunction]` and the fixture body never ran.
- **Cause:** Regression in Playwright 1.62.1 for test-scoped single-element array fixtures. Worker-scoped fixtures with `[fn, { scope: "worker" }]` work fine.
- **Fix:** Always use the explicit two-element form `[fn, { scope: "worker" }]` (or `{ scope: "test" }`).

---

## How to Run

```bash
npm install
npx playwright test            # run the whole suite
npx playwright test --reporter=html
npx playwright test tests/1_login.spec.js   # run a single spec
```

Reports are generated in `playwright-report/` (HTML).

### CI (GitHub Actions)

`.github/workflows/playwright.yml` runs the full suite on every push/PR to `main` / `master` and uploads the HTML report as an artifact.

---

## Testing Coverage

- **Login:** valid + invalid username / password / empty / missing fields (all expect `Bad credentials`).
- **Create Booking:** valid creation + 15 negative payloads (empty fields, missing fields, wrong types, invalid dates, checkout before checkin, etc.) – all expect `500 Internal Server Error`.
- **Get Booking:** verify the created booking's data via status/property/truthy/body validations.
- **Partial Update (PATCH):** update firstname + lastname.
- **Full Update (PUT):** replace the whole booking and validate the full body.
- **Delete:** delete the booking (requires token via Cookie).

---

## Demo API Note

- Base URL: `https://restful-booker.herokuapp.com`
- Auth: `POST /auth` returns a token used as `Cookie: token=<token>` for PATCH/PUT/DELETE.
- **Data is purged every ~10 minutes** – the server is shared by all users and data is not persistent.
