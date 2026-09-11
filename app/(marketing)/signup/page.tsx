import Link from "next/link";

export default function SignupPage() {
  return (
    <section className="mktStub">
      <div className="mktEyebrow">Get Started</div>
      <h1>Join KeyNest.</h1>
      <p>Create an account to follow agents, save homes, and join communities.</p>
      <form className="mktAuth">
        <input type="text" placeholder="Full name" required />
        <input type="email" placeholder="Email" required />
        <input type="password" placeholder="Password" required />
        <button className="mktBtn" type="submit">Create account</button>
      </form>
      <p style={{ marginTop: 18 }}>
        Already have an account? <Link href="/login" className="mktTextLink">Sign in</Link>
      </p>
    </section>
  );
}
