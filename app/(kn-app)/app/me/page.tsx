import AgentProfile from "@/components/kn-app/agent-profile";
import { knViewer } from "@/lib/mock-data";

export default function MePage() {
  return <AgentProfile agent={knViewer} isYou />;
}
