"use client";

import { useEffect, useState } from "react";

type Theme = "dark" | "light" | "sunset" | "turkcell";

export default function ThemeSelector() {
  const [theme, setTheme] = useState<Theme>("dark");

  useEffect(() => {
    const savedTheme = localStorage.getItem("app-theme") as Theme;
    if (savedTheme) {
      setTheme(savedTheme);
      document.body.setAttribute("data-theme", savedTheme);
    }
  }, []);

  const handleThemeChange = (newTheme: Theme) => {
    setTheme(newTheme);
    document.body.setAttribute("data-theme", newTheme);
    localStorage.setItem("app-theme", newTheme);
  };

  return (
    <div className="d-flex align-items-center gap-2 bg-dark bg-opacity-25 p-1 rounded-pill border border-secondary border-opacity-25">
      <button 
        onClick={() => handleThemeChange("dark")}
        className={`btn btn-sm rounded-pill px-3 border-0 ${theme === "dark" ? "bg-primary text-white" : "text-muted"}`}
        title="Dark Mode"
      >
        🌙
      </button>
      <button 
        onClick={() => handleThemeChange("light")}
        className={`btn btn-sm rounded-pill px-3 border-0 ${theme === "light" ? "bg-primary text-white" : "text-muted"}`}
        title="Light Mode"
      >
        ☀️
      </button>
      <button 
        onClick={() => handleThemeChange("sunset")}
        className={`btn btn-sm rounded-pill px-3 border-0 ${theme === "sunset" ? "bg-warning text-dark" : "text-muted"}`}
        title="Sunset Mode"
      >
        🌅
      </button>
      <button 
        onClick={() => handleThemeChange("turkcell")}
        className={`btn btn-sm rounded-pill px-3 border-0 fw-bold ${theme === "turkcell" ? "" : "text-muted"}`}
        style={theme === "turkcell" ? { backgroundColor: "#f7d117", color: "#004c8c" } : {}}
        title="Turkcell Mode"
      >
        T
      </button>
    </div>
  );
}
