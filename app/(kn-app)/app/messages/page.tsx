import Link from "next/link";
import { knAgentById, knThreads } from "@/lib/mock-data";

export default function MessagesPage() {
  return (
    <div>
      {knThreads.map(thread => {
        const agent = knAgentById(thread.agentId);
        return (
          <Link key={thread.id} href={`/app/messages/${thread.id}`} className="knInboxRow">
            <img src={agent.image} alt="" />
            <div>
              <strong>{agent.name}</strong>
              <span>{thread.preview}</span>
            </div>
            {thread.unread ? <i className="knUnread" aria-label="Unread" /> : null}
          </Link>
        );
      })}
    </div>
  );
}
