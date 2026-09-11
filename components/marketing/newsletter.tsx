"use client";

import { FormEvent, useState } from "react";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;
    setDone(true);
  }

  return (
    <section className="mktSection mktNews">
      <div className="mktWrap">
        <div className="mktEyebrow">Stay in the Loop</div>
        <h2>Get Market Updates</h2>
        <p>Join our newsletter for the latest listings, insights, and opportunities.</p>
        {done ? (
          <p className="mktThanks">You&apos;re on the list. Welcome to KeyNest.</p>
        ) : (
          <form className="mktNewsForm" onSubmit={onSubmit}>
            <input
              type="email"
              required
              placeholder="Enter your email"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
            <button className="mktBtn" type="submit">Subscribe</button>
          </form>
        )}
      </div>
    </section>
  );
}
