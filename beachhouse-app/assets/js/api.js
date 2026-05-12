const API_BASE_URL = window.BEACHHOUSE_API_URL || "http://localhost:8080";
const AUTH_STORAGE_KEY = "beachhouseAdminAuth";

export function saveAdminAuth(username, password) {
  sessionStorage.setItem(AUTH_STORAGE_KEY, btoa(`${username}:${password}`));
}

export function clearAdminAuth() {
  sessionStorage.removeItem(AUTH_STORAGE_KEY);
}

function authHeaders() {
  const token = sessionStorage.getItem(AUTH_STORAGE_KEY);
  return token ? { Authorization: `Basic ${token}` } : {};
}

async function request(path, options = {}) {
  const { skipAuth = false, ...fetchOptions } = options;

  const response = await fetch(`${API_BASE_URL}${path}`, {
    credentials: "include",
    headers: {
      ...(skipAuth ? {} : authHeaders()),
      "Content-Type": "application/json",
      ...(fetchOptions.headers || {})
    },
    ...fetchOptions
  });

  if (response.status === 204) {
    return null;
  }

  const text = await response.text();
  const data = text ? JSON.parse(text) : null;

  if (!response.ok) {
    const error = new Error(data?.message || "No se pudo completar la operacion");
    error.status = response.status;
    error.details = data;
    throw error;
  }

  return data;
}

export const api = {
  get(path) {
    return request(path);
  },
  post(path, body, options = {}) {
    return request(path, {
      ...options,
      method: "POST",
      body: JSON.stringify(body)
    });
  },
  patch(path, body = {}) {
    return request(path, {
      method: "PATCH",
      body: JSON.stringify(body)
    });
  },
  delete(path) {
    return request(path, {
      method: "DELETE"
    });
  }
};
