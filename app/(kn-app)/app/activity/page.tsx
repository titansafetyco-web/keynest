"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { knActivity, knAgentById, knPostById } from "@/lib/mock-data";
import { useSocial } from "@/components/kn-app/social-context";

export default function ActivityPage() {
  const router = useRouter();
  const social = useSocial();

  const thisWeek = knActivity.filter(n => !n.time.endsWith("d"));
  const earlier = knActivity.filter(n => n.time.endsWith("d"));

  function open(n: (typeof knActivity)[number]) {
    social.markActivityRead(n.id);
    if (n.kind === "follow") {
      router.push(`/app/u/${knAgentById(n.actorId).handle}`);
      return;
    }
    if (n.kind === "showing" && n.threadId) {
      router.push(`/app/messages/${n.threadId}`);
      return;
    }
    if (n.postId) social.setCommentPostId(n.postId);
  }

  function section(title: string, items: typeof knActivity) {
    if (!items.length) return null;
    return (
      <section>
        <h2 className="knActivityLabel">{title}</h2>
        {items.map(n => {
          const actor = knAgentById(n.actorId);
          const post = n.postId ? knPostById(n.postId) : undefined;
          const unread = social.activityUnread[n.id] !== false && n.unread;
          return (
            <div key={n.id} className={`knActivityRow${unread ? " is-unread" : ""}`}>
              <button type="button" className="knActivityMain" onClick={() => open(n)}>
                <img src={actor.image} alt="" />
                <p>
                  <b>{actor.handle}</b> {n.text} <time>{n.time}</time>
                </p>
              </button>
              {n.kind === "follow" ? (
                <button
                  type="button"
                  className={`knFollow knFollowSm${social.followed[n.actorId] ? " is-on" : ""}`}
                  onClick={() => social.toggleFollow(n.actorId)}
                >
                  {social.followed[n.actorId] ? "Following" : "Follow"}
                </button>
              ) : post ? (
                <button type="button" className="knActivityThumb" onClick={() => open(n)} aria-label={post.address}>
                  <img src={post.image} alt="" />
                </button>
              ) : (
                <Link href={`/app/u/${actor.handle}`} className="knActivityThumb">
                  <img src={actor.image} alt="" />
                </Link>
              )}
            </div>
          );
        })}
      </section>
    );
  }

  return (
    <div className="knActivity">
      {section("New", thisWeek)}
      {section("Earlier", earlier)}
    </div>
  );
}
