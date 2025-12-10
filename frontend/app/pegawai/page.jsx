"use client";

import { useEffect, useState } from "react";
import ProtectedRoute from "@/app/components/ProtectedRoute";
import { getPegawai, deletePegawai } from "@/app/api/api";

export default function PegawaiPage() {
  const [data, setData] = useState([]);

  async function load() {
    const res = await getPegawai();
    if (res.data) setData(res.data);
    else alert(res.message);
  }

  async function handleDelete(id) {
    if (!confirm("Yakin hapus pegawai?")) return;
  
    const res = await deletePegawai(id);
    alert(res.message);
  
    if (res.message) {
      setData(prev => prev.filter(p => p.id != id));
    }
  }
  

  useEffect(() => {
    load();
  }, []);

  return (
    <ProtectedRoute>
      <div className="container mt-4">
        <div className="d-flex justify-content-end mb-3">
          <a href="/pegawai/create" className="btn btn-primary">
            + Tambah Pegawai
          </a>
        </div>
        <h3 className="text-center mb-5">Daftar Pegawai</h3>

        <div className="table-responsive">
          <table className="table table-bordered table-hover">
            <thead>
              <tr>
                <th>Nama</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Position</th>
                <th>Foto</th>
                <th>Aksi</th>
              </tr>
            </thead>

            <tbody>
              {data.length > 0 ? (
                data.map((p) => (
                  <tr key={p.id}>
                    <td>{p.name}</td>
                    <td>{p.email}</td>
                    <td>{p.phone}</td>
                    <td>{p.position}</td>

                    <td>
                      {p.photo ? (
                        <img
                          src={`${process.env.NEXT_PUBLIC_API_URL.replace(
                            "/api",
                            ""
                          )}/uploads/${p.photo}`}
                          width="60"
                          alt="foto pegawai"
                        />
                      ) : (
                        "-"
                      )}
                    </td>

                    <td>
                      <a
                        href={`/pegawai/${p.id}/edit`}
                        className="btn btn-warning btn-sm me-2"
                      >
                        Edit
                      </a>

                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => handleDelete(p.id)}
                      >
                        Hapus
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="text-center">
                    Belum ada data pegawai.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </ProtectedRoute>
  );
}
