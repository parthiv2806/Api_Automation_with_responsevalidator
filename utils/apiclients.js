import { request } from "@playwright/test";

let apicontext = null;

export async function initApiClient() {
  apicontext = await request.newContext();
}

export async function get(url) {
  return await apicontext.get(url);
}

export async function post(url, payload) {
  return await apicontext.post(url, {
    data: payload,
  });
}
