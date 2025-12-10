"use client";
import { useEffect } from "react";

export default function ProtectedRoute({ children }) {
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) window.location.href = "/login";
  }, []);

  return children;
}
