import Link from "next/link";
import { notFound } from "next/navigation";
import { knAgentById, knPostById, knThreadById } from "@/lib/mock-data";

export default async function ThreadPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const thread = knThreadById(id);
  if (!thread) return notFound();
  const agent = knAgentById(thread.agentId);

  return (
    <div>
      <Link href={`/app/u/${agent.handle}`} className="knThreadTop">
        <img src={agent.image} alt="" />
        <strong>{agent.name}</strong>
      </Link>
      <div className="knBubbles">
        {thread.messages.map(message => {
          const listing = message.listingId ? knPostById(message.listingId) : undefined;
          return (
            <div key={message.id} className={`knBubble${message.fromMe ? " is-me" : ""}`}>
              {message.text}
              {listing ? (
                <Link href={`/app/u/${agent.handle}`} className="knChip">
                  <img src={listing.image} alt="" />
                  <span>
                    {listing.price}
                    <small>{listing.address}</small>
                  </span>
                </Link>
              ) : null}
            </div>
          );
        })}
      </div>
    </div>
  );
}
