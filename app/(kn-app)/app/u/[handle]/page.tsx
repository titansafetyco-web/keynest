import { notFound } from "next/navigation";
import AgentProfile from "@/components/kn-app/agent-profile";
import { knAgentByHandle } from "@/lib/mock-data";
import { loadProfileByHandle } from "@/lib/keynest";

export default async function AgentProfilePage({ params }: { params: Promise<{ handle: string }> }) {
  const { handle } = await params;
  const agent = (await loadProfileByHandle(handle)) ?? knAgentByHandle(handle);
  if (!agent) return notFound();
  return <AgentProfile agent={agent} />;
}
