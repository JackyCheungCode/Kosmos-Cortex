export default function HomePage() {
  return (
    <main className="page-shell">
      <section className="hero" aria-labelledby="page-title">
        <p className="eyebrow">PROJECT WORKSPACE</p>
        <h1 id="page-title">Kosmos Cortex</h1>
        <p className="intro">
          Your application foundation is ready to evolve. Connect the backend,
          define the product workflow, and build from a secure, versioned base.
        </p>
        <div className="status-list" aria-label="Initial project status">
          <div className="status-item">
            <span className="status-dot" aria-hidden="true" />
            <span>Next.js and TypeScript scaffold</span>
            <span className="status-label">Prepared</span>
          </div>
          <div className="status-item">
            <span className="status-dot" aria-hidden="true" />
            <span>Supabase environment template</span>
            <span className="status-label">Prepared</span>
          </div>
          <div className="status-item">
            <span className="status-dot pending" aria-hidden="true" />
            <span>Live backend connection</span>
            <span className="status-label">Not configured</span>
          </div>
          <div className="status-item">
            <span className="status-dot pending" aria-hidden="true" />
            <span>Deployment target</span>
            <span className="status-label">Not selected</span>
          </div>
        </div>
        <p className="note">
          This starter page does not query or modify the production database.
        </p>
      </section>
    </main>
  );
}
