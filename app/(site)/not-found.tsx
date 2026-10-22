import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container">
      <div className="empty" style={{ marginTop: 60 }}>
        <h1 className="display">Page not found</h1>
        <p>This product may have been removed.</p>
        <Link href="/" className="btn btn-sun">Back to home</Link>
      </div>
    </div>
  );
}
