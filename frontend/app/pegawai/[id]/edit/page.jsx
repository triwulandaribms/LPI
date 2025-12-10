"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import ProtectedRoute from "@/app/components/ProtectedRoute";
import { getPegawaiById, updatePegawai } from "@/app/api/api";

export default function EditPegawai() {
  const params = useParams();
  const [form, setForm] = useState({ name: "", email: "", phone: "", position: "" });
  const [photo, setPhoto] = useState(null);

  useEffect(() => {
    async function load() {
      const res = await getPegawaiById(params.id);
      if (res.data) {
        setForm(res.data);
      } else {
        alert(res.message);
      }
    }
    load();
  }, [params.id]);

  function handlePhoto(e) {
    const file = e.target.files[0];
    if (!file) return;

    if (!["image/jpeg", "image/jpg"].includes(file.type))
      return alert("Format foto harus JPG/JPEG");

    if (file.size > 300 * 1024)
      return alert("Ukuran foto maksimal 300KB");

    setPhoto(file);
  }

  async function submit(e) {
    e.preventDefault();
  
    const fd = new FormData();
  
    Object.keys(form).forEach((key) => {
      if (key !== "photo") {   
        fd.append(key, form[key]);
      }
    });
  
    if (photo) {
      fd.append("photo", photo); 
    }
  
    const res = await updatePegawai(params.id, fd);
  
    if (res.data) {
      alert("Pegawai berhasil diupdate");
      window.location.href = "/pegawai";
    } else {
      alert(res.message || "Gagal update pegawai");
    }
  }
  

  return (
    <ProtectedRoute>
      <div className="container mt-4" style={{ maxWidth: "500px" }}>
        <h3 className="text-center mb-3">Edit Pegawai</h3>

        <form onSubmit={submit} className="card p-3 shadow-sm">
          <input
            className="form-control mb-3"
            placeholder="Nama"
            value={form.name || ""}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />

          <input
            className="form-control mb-3"
            placeholder="Email"
            value={form.email || ""}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />

          <input
            className="form-control mb-3"
            placeholder="Phone"
            value={form.phone || ""}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
          />

          <input
            className="form-control mb-3"
            placeholder="Position"
            value={form.position || ""}
            onChange={(e) => setForm({ ...form, position: e.target.value })}
          />

          <input
            type="file"
            className="form-control mb-3"
            onChange={handlePhoto}
          />

          <button className="btn btn-success w-100">Update</button>
        </form>
      </div>
    </ProtectedRoute>
  );
}
