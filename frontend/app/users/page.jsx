"use client";

import { useEffect, useState } from "react";
import ProtectedRoute from "@/app/components/ProtectedRoute";

export default function UsersPage() {
  const [users, setUsers] = useState([]);

  async function loadUsers() {
    try {
      const token = localStorage.getItem("token");
      if (!token) return alert("Mohon login terlebih dahulu");

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/get`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const json = await res.json();
      if (res.ok) setUsers(json.data || []);
      else alert(json.message);
    } catch (err) {
      console.error("Gagal load users:", err);
      alert("Terjadi kesalahan saat mengambil data user.");
    }
  }

  useEffect(() => { loadUsers(); }, []);

  async function handleDelete(id) {
    if (!confirm("Yakin hapus user ini?")) return;

    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/delete/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      const json = await res.json();
      alert(json.message);
      if (res.ok) loadUsers();
    } catch (err) {
      console.error("Gagal hapus user:", err);
      alert("Terjadi kesalahan saat menghapus user.");
    }
  }

  return (
    <ProtectedRoute>
      <div className="container mt-4">
        <div className="d-flex justify-content-end mb-3">
          <a href="/users/create" className="btn btn-primary">+ Tambah User</a>
        </div>
        <h3 className="text-center mb-5">Daftar User</h3>

        <div className="table-responsive">
          <table className="table table-bordered table-hover">
            <thead className="table-light">
              <tr>
                <th>Nama</th>
                <th>Email</th>
                <th>Role</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {users.length > 0 ? (
                users.map(u => (
                  <tr key={u.id}>
                    <td>{u.name}</td>
                    <td>{u.email}</td>
                    <td>{u.role}</td>
                    <td>
                      <a href={`/users/${u.id}/edit`} className="btn btn-warning btn-sm me-2">
                        Edit
                      </a>

                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => handleDelete(u.id)}
                      >
                        Hapus
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="text-center">Belum ada data user.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </ProtectedRoute>
  );
}



