"use client";

import { useState } from "react";
import ProtectedRoute from "@/app/components/ProtectedRoute";
import { createUser } from "@/app/api/api";

export default function CreateUserPage() {
  const [form, setForm] = useState({ name: "", email: "", password: "", role: "" });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  async function submit(e) {
    e.preventDefault();

    try {
      const res = await createUser(form);

      if (res.data) {
        alert("User berhasil dibuat");
        window.location.href = "/users"; 
      } else {
        alert(res.message || "Gagal menambahkan user");
      }
    } catch (err) {
      console.error(err);
      alert("Terjadi kesalahan server saat menambahkan user.");
    }
  }

  return (
    <ProtectedRoute>
      <div className="container mt-4" style={{ maxWidth: "500px" }}>
      <h3 className="text-center mb-3">Tambah User</h3>
        <form onSubmit={submit} className="card p-3 shadow-sm" autoComplete="off">
          <input
            type="text"
            name="name"
            className="form-control mb-3"
            placeholder="Nama"
            value={form.name}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            className="form-control mb-3"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            className="form-control mb-3"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
          />
          <select
            name="role"
            className="form-control mb-3"
            value={form.role}
            onChange={handleChange}
            required
          >
            <option value="">-- Pilih Role --</option>
            <option value="admin">Admin</option>
            <option value="staff">Staff</option>
          </select>
          <button type="submit" className="btn btn-success w-100">Simpan</button>
        </form>
      </div>
    </ProtectedRoute>
  );
}
