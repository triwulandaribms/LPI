"use client";

import { useState, useEffect } from "react";
import ProtectedRoute from "@/app/components/ProtectedRoute";
import { getUserById, updateUser } from "@/app/api/api";
import { useParams } from "next/navigation";

export default function EditUserPage() {
  const params = useParams();
  const userId = params.id;

  const [form, setForm] = useState({ name: "", email: "", password: "", role: "" });

  useEffect(() => {
    async function loadUser() {
      try {
        const res = await getUserById(userId);
        if (res.data) {
          setForm({
            name: res.data.name,
            email: res.data.email,
            password: "",
            role: res.data.role
          });
        } else {
          alert(res.message || "Gagal load data user");
        }
      } catch (err) {
        console.error(err);
        alert("Terjadi kesalahan server saat load data user.");
      }
    }
    loadUser();
  }, [userId]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  async function submit(e) {
    e.preventDefault();

    try {
      const res = await updateUser(userId, form);

      if (res.data) {  
        alert("User berhasil diupdate");
        window.location.href = "/users"; 
      } else {
        alert(res.message || "Gagal update user");
      }
    } catch (err) {
      console.error(err);
      alert("Terjadi kesalahan server saat update user.");
    }
  }

  return (
    <ProtectedRoute>
      <div className="container mt-4" style={{ maxWidth: "500px" }}>
      <h3 className="text-center mb-3">Edit User</h3>
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
            placeholder="Password (biarkan kosong jika tidak diubah)"
            value={form.password}
            onChange={handleChange}
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
          <button type="submit" className="btn btn-success w-100">Update User</button>
        </form>
      </div>
    </ProtectedRoute>
  );
}
