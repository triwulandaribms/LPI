
const API_URL = process.env.NEXT_PUBLIC_API_URL; 

async function requestJSON(endpoint, method = "GET", data = null, token = null) {
  const headers = { "Content-Type": "application/json" };
  if (token) headers["Authorization"] = `Bearer ${token}`;

  const options = { method, headers };
  if (data) options.body = JSON.stringify(data);

  const res = await fetch(`${API_URL}/${endpoint}`, options);
  return await res.json();
}


async function requestFormData(endpoint, method = "POST", formData, token) {
  const headers = {};
  if (token) headers["Authorization"] = `Bearer ${token}`;

  const res = await fetch(`${API_URL}/${endpoint}`, {
    method,
    headers,
    body: formData,
  });

  return await res.json();
}


export async function login(email, password) {
  return await requestJSON("auth/login", "POST", { email, password });
}

export async function getUsers() {
  const token = localStorage.getItem("token");
  return await requestJSON("user/get", "GET", null, token);
}

export async function getUserById(id) {
  const token = localStorage.getItem("token");
  return await requestJSON(`user/get-by/${id}`, "GET", null, token);
}

export async function createUser(data) {
  const token = localStorage.getItem("token");
  return await requestJSON("user/add", "POST", data, token);
}

export async function updateUser(id, data) {
  const token = localStorage.getItem("token");
  return await requestJSON(`user/update/${id}`, "PUT", data, token);
}

export async function deleteUser(id) {
  const token = localStorage.getItem("token");
  return await requestJSON(`user/delete/${id}`, "DELETE", null, token);
}

export async function getPegawai() {
  const token = localStorage.getItem("token");
  return await requestJSON("pegawai/get", "GET", null, token);
}

export async function getPegawaiById(id) {
  const token = localStorage.getItem("token");
  return await requestJSON(`pegawai/get-by/${id}`, "GET", null, token);
}

export async function createPegawai(data) {
  const token = localStorage.getItem("token");
  const formData = new FormData();
  formData.append("name", data.name);
  formData.append("email", data.email);
  formData.append("phone", data.phone);
  formData.append("position", data.position);
  if (data.photo) formData.append("photo", data.photo);

  return await requestFormData("pegawai/add", "POST", formData, token);
}

export async function updatePegawai(id, formData) {
  const token = localStorage.getItem("token");
  return await requestFormData(`pegawai/update/${id}`, "PUT", formData, token);
}


export async function deletePegawai(id) {
  const token = localStorage.getItem("token");
  return await requestJSON(`pegawai/delete/${id}`, "DELETE", null, token);
}
