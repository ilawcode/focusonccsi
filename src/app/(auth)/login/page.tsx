"use client";

import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (searchParams.get("registered")) {
      setSuccess("Account created! Please login.");
    }
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const result = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      if (result?.error) {
        setError("Invalid email or password");
      } else {
        router.push("/dashboard");
        router.refresh();
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="glass-panel p-4 p-md-5">
      <h2 className="text-center mb-4 gradient-text">Login</h2>
      
      {error && <div className="alert alert-danger py-2 small">{error}</div>}
      {success && <div className="alert alert-success py-2 small">{success}</div>}

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label small text-muted">Email Address</label>
          <input
            type="email"
            className="form-control"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label className="form-label small text-muted">Password</label>
          <input
            type="password"
            className="form-control"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button
          type="submit"
          className="btn btn-premium w-100 mb-3"
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <div className="text-center small text-muted">
          Don't have an account?{" "}
          <Link href="/register" className="text-accent text-decoration-none">
            Register here
          </Link>
        </div>
      </form>
    </div>
  );
}

export default function Login() {
  return (
    <main className="container d-flex align-items-center justify-content-center vh-100">
      <div className="row justify-content-center w-100">
        <div className="col-md-5 col-lg-4">
          <Suspense fallback={<div className="text-center h4">Loading...</div>}>
            <LoginForm />
          </Suspense>
        </div>
      </div>
    </main>
  );
}
