"use client";

import { useEffect, useState } from "react";
import ProtectedRoute from "@/app/components/ProtectedRoute";
import { getUsers, getPegawai } from "@/app/api/api";

export default function Dashboard() {
  const [totalUser, setTotalUser] = useState(0);
  const [totalPegawai, setTotalPegawai] = useState(0);
  const [aktivitas, setAktivitas] = useState("");

  useEffect(() => {
    async function loadData() {
      try {
        const usersRes = await getUsers();
        const pegawaiRes = await getPegawai();

        if (usersRes.data) setTotalUser(usersRes.data.length);
        if (pegawaiRes.data) setTotalPegawai(pegawaiRes.data.length);

        let lastUser = usersRes.data?.[usersRes.data.length - 1];
        let lastPegawai = pegawaiRes.data?.[pegawaiRes.data.length - 1];

        let aktivitasText = "";
        if (lastUser) aktivitasText += `User baru: ${lastUser.name} ditambahkan. `;
        if (lastPegawai) aktivitasText += `Pegawai baru: ${lastPegawai.name} ditambahkan.`;

        setAktivitas(aktivitasText || "Belum ada aktivitas terbaru.");
      } catch (err) {
        console.error("Gagal load dashboard:", err);
      }
    }

    loadData();
  }, []);

  return (
    <ProtectedRoute>
      <div className="d-flex">
        <div className="flex-grow-1">
          <div className="container mt-4">
            <div className="card shadow-sm p-4">
              <h3 className="text-center mb-4">Menu Dashboard</h3>

              <p className="text-muted">
                Halaman ini menampilkan ringkasan jumlah user, jumlah pegawai, dan aktivitas terbaru yang telah dilakukan.
              </p>
        
              <div className="row mt-4">

                <div className="col-md-4 mb-3">
                  <div className="card text-white bg-primary">
                    <div className="card-body">
                      <h5 className="card-title">Total User</h5>
                      <p className="card-text">{totalUser}</p>
                    </div>
                  </div>
                </div>

                <div className="col-md-4 mb-3">
                  <div className="card text-white bg-success">
                    <div className="card-body">
                      <h5 className="card-title">Total Pegawai</h5>
                      <p className="card-text">{totalPegawai}</p>
                    </div>
                  </div>
                </div>

                <div className="col-md-4 mb-3">
                  <div className="card text-white bg-warning">
                    <div className="card-body">
                      <h5 className="card-title">Aktivitas Terbaru</h5>
                      <p className="card-text">{aktivitas}</p>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
