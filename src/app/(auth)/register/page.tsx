"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Register() {
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/user/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        router.push("/login?registered=true");
      } else {
        setError(data.message || "Registration failed");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="container d-flex align-items-center justify-content-center min-vh-100 py-5">
      <div className="row justify-content-center w-100">
        <div className="col-md-6 col-lg-5">
          <div className="glass-panel p-4 p-md-5">
            <h2 className="text-center mb-4 gradient-text">Create Account</h2>
            {error && <div className="alert alert-danger py-2 small">{error}</div>}
            
            <form onSubmit={handleSubmit}>
              <div className="row g-3">
                <div className="col-md-6 mb-3">
                  <label className="form-label small text-muted">First Name</label>
                  <input
                    type="text"
                    className="form-control"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label small text-muted">Last Name</label>
                  <input
                    type="text"
                    className="form-control"
                    required
                    value={formData.surname}
                    onChange={(e) => setFormData({ ...formData, surname: e.target.value })}
                  />
                </div>
              </div>

              <div className="mb-3">
                <label className="form-label small text-muted">Email Address</label>
                <input
                  type="email"
                  className="form-control"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>

              <div className="mb-4">
                <label className="form-label small text-muted">Password</label>
                <input
                  type="password"
                  className="form-control"
                  required
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
              </div>

              <button
                type="submit"
                className="btn btn-premium w-100 mb-3"
                disabled={loading}
              >
                {loading ? "Creating Account..." : "Register"}
              </button>

              <div className="text-center small text-muted">
                Already have an account?{" "}
                <Link href="/login" className="text-accent text-decoration-none">
                  Login here
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
