"use client";

import { FormEvent, useRef, useState } from "react";
import { Plus } from "lucide-react";
import { knRoles, type KnAgent, type KnRole } from "@/lib/mock-data";
import { useSocial } from "./social-context";
import FeedPost from "./feed-post";
import ShareProfileSheet from "./share-profile-sheet";
import VerifiedBadge from "./verified";

function websiteHref(raw: string) {
  const value = raw.trim();
  if (!value) return "";
  return /^https?:\/\//i.test(value) ? value : `https://${value}`;
}

function websiteLabel(raw: string) {
  return raw.trim().replace(/^https?:\/\//i, "").replace(/\/$/, "");
}

export default function AgentProfile({ agent, isYou }: { agent: KnAgent; isYou?: boolean }) {
  const social = useSocial();
  const posts = social.postsByAgent(agent.id);
  const fileRef = useRef<HTMLInputElement>(null);
  const avatarRef = useRef<HTMLInputElement>(null);
  const [openId, setOpenId] = useState<string | null>(null);
  const [editing, setEditing] = useState(false);
  const [sharing, setSharing] = useState(false);
  const [profile, setProfile] = useState({
    name: agent.name,
    city: agent.city,
    bio: agent.bio,
    website: agent.website ?? "",
    image: agent.image,
    role: (agent.role ?? (isYou ? "Spectator" : "Agent")) as KnRole,
    license: agent.license ?? ""
  });
  const [draft, setDraft] = useState(profile);
  const following = !!social.followed[agent.id];
  const open = posts.find(p => p.id === openId);

  function saveProfile(e: FormEvent) {
    e.preventDefault();
    const next = {
      name: draft.name.trim() || agent.name,
      city: draft.city.trim() || agent.city,
      bio: draft.bio.trim() || agent.bio,
      website: draft.website.trim(),
      image: draft.image || agent.image,
      role: draft.role,
      license: draft.role === "Spectator" ? "" : draft.license.trim()
    };
    setProfile(next);
    social.updateAgent(agent.id, next);
    setEditing(false);
  }

  if (open) {
    return (
      <div>
        <div className="knSearchWrap">
          <button type="button" className="knCommentLink" onClick={() => setOpenId(null)}>
            Back to profile
          </button>
        </div>
        <FeedPost post={open} />
      </div>
    );
  }

  return (
    <>
      <div className="knProfileHead">
        <div className="knProfileRow">
          {isYou ? (
            <>
              <input
                ref={fileRef}
                type="file"
                accept="image/*"
                multiple
                className="knComposeFile"
                aria-label="Add photos to your story"
                onChange={e => {
                  const files = [...(e.target.files ?? [])].filter(file => file.type.startsWith("image/"));
                  if (files.length) social.addOwnStories(files.map(file => URL.createObjectURL(file)));
                  e.target.value = "";
                }}
              />
              <button
                type="button"
                className="knProfileAvatar"
                aria-label="Add photos to your story"
                onClick={() => fileRef.current?.click()}
              >
                <img src={profile.image} alt="" />
                <i className="knProfileStoryAdd" aria-hidden>
                  <Plus size={14} strokeWidth={2.5} />
                </i>
              </button>
            </>
          ) : (
            <img src={profile.image} alt="" />
          )}
          <div className="knStats">
            <div><strong>{posts.length || agent.postCount}</strong><span>listings</span></div>
            <div><strong>{agent.followers}</strong><span>followers</span></div>
            <div><strong>{agent.following}</strong><span>following</span></div>
          </div>
        </div>
        <h1>
          {profile.name}
          {agent.verified ? <VerifiedBadge /> : null}
        </h1>
        <p className="knProfileRole">
          {profile.role}
          {profile.role !== "Spectator" && profile.license ? ` · Lic # ${profile.license}` : ""}
        </p>
        <p>{profile.city}</p>
        <p>{profile.bio}</p>
        {profile.website.trim() ? (
          <a
            className="knProfileLink"
            href={websiteHref(profile.website)}
            target="_blank"
            rel="noreferrer"
          >
            {websiteLabel(profile.website)}
          </a>
        ) : null}
        {isYou ? (
          <div className="knProfileBtns">
            <button
              type="button"
              className="knProfileBtn"
              onClick={() => {
                setDraft(profile);
                setEditing(true);
              }}
            >
              Edit profile
            </button>
            <button type="button" className="knProfileBtn" onClick={() => setSharing(true)}>
              Share profile
            </button>
          </div>
        ) : (
          <button
            type="button"
            className={`knFollow${following ? " is-on" : ""}`}
            onClick={() => social.toggleFollow(agent.id)}
          >
            {following ? "Following" : "Follow"}
          </button>
        )}
      </div>
      {sharing ? (
        <ShareProfileSheet
          name={profile.name}
          handle={agent.handle}
          onClose={() => setSharing(false)}
        />
      ) : null}
      {editing ? (
        <>
          <button type="button" className="knSheetScrim" aria-label="Close edit profile" onClick={() => setEditing(false)} />
          <div className="knSheet knSheetCompose" role="dialog" aria-label="Edit profile">
            <div className="knSheetHead">
              Edit profile
              <button type="button" className="knAppIconBtn" onClick={() => setEditing(false)}>Close</button>
            </div>
            <form className="knCompose" onSubmit={saveProfile}>
              <input
                ref={avatarRef}
                type="file"
                accept="image/*"
                className="knComposeFile"
                aria-label="Upload profile photo"
                onChange={e => {
                  const file = e.target.files?.[0];
                  if (!file || !file.type.startsWith("image/")) return;
                  if (draft.image.startsWith("blob:")) URL.revokeObjectURL(draft.image);
                  setDraft(cur => ({ ...cur, image: URL.createObjectURL(file) }));
                  e.target.value = "";
                }}
              />
              <button
                type="button"
                className="knEditAvatar"
                onClick={() => avatarRef.current?.click()}
              >
                <img src={draft.image} alt="" />
                <span>Change photo</span>
              </button>
              <input
                value={draft.name}
                onChange={e => setDraft(cur => ({ ...cur, name: e.target.value }))}
                placeholder="Name"
                aria-label="Name"
              />
              <div className={`knComposeRole${draft.role === "Spectator" ? "" : " has-lic"}`}>
                <select
                  value={draft.role}
                  onChange={e => setDraft(cur => ({ ...cur, role: e.target.value as KnRole }))}
                  aria-label="Role"
                >
                  {knRoles.map(role => (
                    <option key={role} value={role}>{role}</option>
                  ))}
                </select>
                {draft.role === "Spectator" ? null : (
                  <input
                    value={draft.license}
                    onChange={e => setDraft(cur => ({ ...cur, license: e.target.value }))}
                    placeholder="Lic #"
                    aria-label="License number"
                  />
                )}
              </div>
              <input
                value={draft.city}
                onChange={e => setDraft(cur => ({ ...cur, city: e.target.value }))}
                placeholder="City"
                aria-label="City"
              />
              <textarea
                value={draft.bio}
                onChange={e => setDraft(cur => ({ ...cur, bio: e.target.value }))}
                placeholder="Bio"
                aria-label="Bio"
              />
              <input
                value={draft.website}
                onChange={e => setDraft(cur => ({ ...cur, website: e.target.value }))}
                placeholder="Website"
                aria-label="Website"
                inputMode="url"
                autoComplete="url"
              />
              <button type="submit">Save</button>
            </form>
          </div>
        </>
      ) : null}
      {posts.length === 0 ? <p className="knEmpty">No listings yet.</p> : (
        <div className="knGrid">
          {posts.map(post => (
            <button type="button" key={post.id} onClick={() => setOpenId(post.id)} aria-label={post.address}>
              <img src={post.image} alt="" />
            </button>
          ))}
        </div>
      )}
    </>
  );
}
