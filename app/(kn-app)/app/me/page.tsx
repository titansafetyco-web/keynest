"use client";

import AgentProfile from "@/components/kn-app/agent-profile";
import { useSocial } from "@/components/kn-app/social-context";

export default function MePage() {
  const { viewer } = useSocial();
  return <AgentProfile agent={viewer} isYou />;
}
