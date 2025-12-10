"use client";

import { usePathname } from "next/navigation";

export default function Sidebar() {
  const pathname = usePathname();

  function handleClick(path) {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Mohon login terlebih dahulu");
      return; 
    }
    window.location.href = path;
  }

  function handleLogout() {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Anda belum login");
      return;
    }
    if (confirm("Yakin ingin logout?")) {
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
  }

  const menuItems = [
    { label: "Dashboard", path: "/dashboard" },
    { label: "User", path: "/users" },
    { label: "Pegawai", path: "/pegawai" }
  ];

  return (
    <div className="bg-light border-end vh-100" style={{ width: "200px" }}>
      <ul className="nav flex-column p-2">
        {menuItems.map(item => (
          <li className="nav-item mb-2" key={item.path}>
            <a
              href={item.path}
              className={`nav-link ${pathname === item.path ? "active fw-bold" : ""}`}
              onClick={e => { e.preventDefault(); handleClick(item.path); }}
            >
              Menu {item.label}
            </a>
          </li>
        ))}
        <li className="nav-item mt-3">
          <button
            className="btn btn-danger w-100"
            onClick={handleLogout}
          >
            Logout
          </button>
        </li>
      </ul>
    </div>
  );
}
