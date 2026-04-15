import Link from "next/link";

export default function Home() {
  return (
    <main className="container d-flex align-items-center justify-content-center vh-100">
      <div className="row justify-content-center w-100">
        <div className="col-md-8 col-lg-6 text-center">
          <div className="glass-panel p-5 hover-glow">
            <h1 className="display-4 gradient-text mb-4">Project Tracking Dashboard</h1>
            <p className="lead mb-5 text-muted">
              Modern workflow management and Jira synchronization for efficient team collaboration.
            </p>
            <div className="d-grid gap-3 d-sm-flex justify-content-sm-center">
              <Link href="/login" className="btn btn-premium px-4 gap-3">
                Get Started
              </Link>
              <Link href="/register" className="btn btn-outline-light px-4">
                Create Account
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
