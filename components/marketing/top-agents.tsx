"use client";

import { useState } from "react";
import Link from "next/link";
import { creators } from "@/lib/mock-data";

const featured = creators.slice(0, 6);

export default function TopAgents() {
  const [following, setFollowing] = useState<Record<string, boolean>>({});

  return (
    <section className="mktSection">
      <div className="mktWrap">
        <div className="mktSectionHead">
          <div>
            <h2>Top Agents</h2>
            <p>Follow, discover listings, and stay connected.</p>
          </div>
          <Link href="/agents" className="mktTextLink">View all</Link>
        </div>
        <div className="mktAgentsViewport">
          <div className="mktAgents">
            {featured.map(a => (
              <article className="mktAgentCard" key={a.handle}>
                <img src={a.image} alt={a.name} />
                <strong>{a.name}</strong>
                <span>{a.followers} followers</span>
                <button
                  type="button"
                  className={following[a.handle] ? "following" : ""}
                  onClick={() => setFollowing(f => ({ ...f, [a.handle]: !f[a.handle] }))}
                >
                  {following[a.handle] ? "Following" : "Follow"}
                </button>
              </article>
            ))}
            <div className="mktAgentsDup" aria-hidden="true">
              {featured.map(a => (
                <article className="mktAgentCard" key={`${a.handle}-dup`}>
                  <img src={a.image} alt="" />
                  <strong>{a.name}</strong>
                  <span>{a.followers} followers</span>
                  <button
                    type="button"
                    tabIndex={-1}
                    className={following[a.handle] ? "following" : ""}
                    onClick={() => setFollowing(f => ({ ...f, [a.handle]: !f[a.handle] }))}
                  >
                    {following[a.handle] ? "Following" : "Follow"}
                  </button>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
