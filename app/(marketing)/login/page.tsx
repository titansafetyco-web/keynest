import Link from "next/link";

export default function LoginPage() {
  return (
    <section className="mktStub">
      <div className="mktEyebrow">Sign in</div>
      <h1>Welcome back.</h1>
      <p>Sign in to save favorites and continue where you left off.</p>
      <form className="mktAuth">
        <input type="email" placeholder="Email" required />
        <input type="password" placeholder="Password" required />
        <button className="mktBtn" type="submit">Sign in</button>
      </form>
      <p style={{ marginTop: 18 }}>
        New here? <Link href="/signup" className="mktTextLink">Get Started</Link>
      </p>
    </section>
  );
}
