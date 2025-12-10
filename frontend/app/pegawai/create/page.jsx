"use client";

import { useState } from "react";
import ProtectedRoute from "@/app/components/ProtectedRoute";
import { createPegawai } from "@/app/api/api";

export default function CreatePegawai() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", position: "" });
  const [photo, setPhoto] = useState(null);
  const [preview, setPreview] = useState(null);

  function handlePhoto(e) {
    const file = e.target.files[0];
    if (!file) return;

    if (!["image/jpeg", "image/jpg"].includes(file.type))
      return alert("Format foto harus JPG/JPEG");

    if (file.size > 300 * 1024)
      return alert("Ukuran foto maksimal 300KB");

    setPhoto(file);
    setPreview(URL.createObjectURL(file));
  }

  async function submit(e) {
    e.preventDefault();
    const res = await createPegawai({ ...form, photo });

    if (res.data) {
      alert("Pegawai berhasil dibuat");
      window.location.href = "/pegawai";
    } else alert(res.message);
  }

  return (
    <ProtectedRoute>
      <div className="container mt-4" style={{ maxWidth: "500px" }}>
        <h3 className="text-center mb-3">Tambah Pegawai</h3>

        <form onSubmit={submit} className="card p-3 shadow-sm">
          <input
            className="form-control mb-3"
            placeholder="Nama"
            value={form.name}
            required
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />

          <input
            className="form-control mb-3"
            placeholder="Email"
            type="email"
            value={form.email}
            required
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />

          <input
            className="form-control mb-3"
            placeholder="Phone"
            value={form.phone}
            required
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
          />

          <input
            className="form-control mb-3"
            placeholder="Position"
            value={form.position}
            required
            onChange={(e) => setForm({ ...form, position: e.target.value })}
          />

          <input
            type="file"
            className="form-control mb-3"
            onChange={handlePhoto}
          />

          {preview && (
            <img
              src={preview}
              style={{ width: 100, height: 100, objectFit: "cover" }}
              className="mb-3 rounded"
            />
          )}

          <button className="btn btn-success w-100">Simpan</button>
        </form>
      </div>
    </ProtectedRoute>
  );
}
