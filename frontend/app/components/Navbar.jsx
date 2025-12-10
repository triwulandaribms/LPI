"use client";

import { useEffect, useState } from "react";

export default function Navbar() {
  const [name, setName] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const payload = JSON.parse(atob(token.split('.')[1]));
      setName(payload.name);
    }
  }, []);

 

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container-fluid">

        <div className="marquee-wrapper ms-3 flex-grow-1">
          <div className="marquee">
            <span>SELAMAT DATANG {name} </span>
          </div>
        </div>
      </div>

      <style jsx>{`
        .marquee-wrapper {
          overflow: hidden;
          white-space: nowrap;
        }
        .marquee {
          display: inline-block;
          padding-left: 100%;
          animation: marquee 15s linear infinite;
          color: #fff;
          font-weight: 500;
        }
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-100%); }
        }
      `}</style>
    </nav>
  );
}
