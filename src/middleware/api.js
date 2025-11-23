import axios from "axios";

const API = import.meta.env.VITE_API_BASE_URL || "localhost:5000";

const apiClient = axios.create({
  baseURL: API,
  headers: {
    "Content-Type": "application/json",
  },
});


export async function listLinks() {
  // Axios throws on errors automatically
  const res = await apiClient.get("/api/links");

  return res.data;
}

export async function createLink(payload) {
  try {
    const res = await apiClient.post("/api/links", payload);
    return res.data;
  } catch (error) {
    // Handle 409 Conflict specifically
    if (error.response && error.response.status === 409) {
      const message = error.response.data?.message || "Conflict";
      const err = new Error(message);
      err.status = 409;
      throw err;
    }
    // Re-throw other errors (Axios wraps the original error)
    throw new Error(error.response?.data?.message || "Create failed");
  }
}

export async function getLink(code) {
  try {
    const res = await apiClient.get(`/api/links/${code}`);
    return res.data;
  } catch (error) {
    if (error.response && error.response.status === 404) {
      throw Object.assign(new Error("Not found"), { status: 404 });
    }
    throw new Error(error.response?.data?.message || "Fetch failed");
  }
}


export async function deleteLink(code) {
  try {
    await apiClient.delete(`/api/links/${code}`);
    return true;
  } catch (error) {
    if (error.response && error.response.status === 404) {
      throw Object.assign(new Error("Not found"), { status: 404 });
    }
    throw new Error("Delete failed");
  }
}

export async function healthcheck() {
  const res = await apiClient.get("/api/healthz");
  return res.data;
}
