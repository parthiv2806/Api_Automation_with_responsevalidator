export const Login = {
  username: "admin",
  password: "password123",
};

export const invalidUsernamePayload = {
  username: "wronguser",
  password: "password123",
};

export const invalidPasswordPayload = {
  username: "admin",
  password: "wrongpassword",
};

export const bothInvalidPayload = {
  username: "wronguser",
  password: "wrongpassword",
};

export const emptyUsernamePayload = {
  username: "",
  password: "password123",
};

export const emptyPasswordPayload = {
  username: "admin",
  password: "",
};

export const emptyCredentialsPayload = {
  username: "",
  password: "",
};

export const missingUsernamePayload = {
  password: "password123",
};

export const missingPasswordPayload = {
  username: "admin",
};
