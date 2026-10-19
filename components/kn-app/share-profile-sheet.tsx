"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Copy, MessageCircle, Share2, Smartphone } from "lucide-react";
import { knThreadByAgentId } from "@/lib/mock-data";
import { useSocial } from "./social-context";

export default function ShareProfileSheet({
  name,
  handle,
  onClose
}: {
  name: string;
  handle: string;
  onClose: () => void;
}) {
  const router = useRouter();
  const social = useSocial();
  const [query, setQuery] = useState("");
  const [copied, setCopied] = useState(false);
  const url = typeof window === "undefined" ? `/app/u/${handle}` : `${window.location.origin}/app/u/${handle}`;
  const text = `Check out ${name} on KeyNest`;
  const payload = `${text} ${url}`;

  const people = useMemo(() => {
    const q = query.trim().toLowerCase().replace(/^@/, "");
    return social.agents.filter(agent => {
      if (agent.id === social.viewer.id || agent.handle === handle) return false;
      if (!q) return true;
      return agent.name.toLowerCase().includes(q) || agent.handle.toLowerCase().includes(q);
    });
  }, [handle, query, social.agents, social.viewer.id]);

  function sendTo(agentId: string) {
    const thread = knThreadByAgentId(agentId);
    onClose();
    router.push(thread ? `/app/messages/${thread.id}` : "/app/messages");
  }

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1200);
    } catch {
      /* ignore */
    }
  }

  async function more() {
    try {
      if (navigator.share) {
        await navigator.share({ title: name, text, url });
        return;
      }
    } catch {
      /* ignore */
    }
    copyLink();
  }

  return (
    <>
      <button type="button" className="knSheetScrim" aria-label="Close share" onClick={onClose} />
      <div className="knSheet knSheetShare" role="dialog" aria-label="Share profile">
        <div className="knSheetHead">
          Share profile
          <button type="button" className="knAppIconBtn" onClick={onClose}>Close</button>
        </div>
        <div className="knSearchWrap">
          <input
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search username"
            aria-label="Search username"
            autoComplete="off"
          />
        </div>
        <div className="knSharePeople">
          {people.length === 0 ? <p className="knEmpty">No people found.</p> : people.map(agent => (
            <button
              type="button"
              key={agent.id}
              className="knSharePerson"
              onClick={() => sendTo(agent.id)}
            >
              <img src={agent.image} alt="" />
              <span>
                <strong>{agent.name}</strong>
                <em>@{agent.handle}</em>
              </span>
            </button>
          ))}
        </div>
        <div className="knShareApps">
          <a className="knShareApp" href={`sms:?&body=${encodeURIComponent(payload)}`}>
            <i><MessageCircle size={20} /></i>
            <span>Message</span>
          </a>
          <a className="knShareApp" href={`sms:?&body=${encodeURIComponent(payload)}`}>
            <i><Smartphone size={20} /></i>
            <span>Text</span>
          </a>
          <a className="knShareApp" href={`https://wa.me/?text=${encodeURIComponent(payload)}`} target="_blank" rel="noreferrer">
            <i>WA</i>
            <span>WhatsApp</span>
          </a>
          <button type="button" className="knShareApp" onClick={copyLink}>
            <i><Copy size={18} /></i>
            <span>{copied ? "Copied" : "Copy"}</span>
          </button>
          <button type="button" className="knShareApp" onClick={more}>
            <i><Share2 size={18} /></i>
            <span>More</span>
          </button>
        </div>
      </div>
    </>
  );
}
