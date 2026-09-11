import StubPage from "@/components/marketing/stub-page";
import { communities } from "@/lib/mock-data";
import Link from "next/link";

export default function CommunitiesPage() {
  return (
    <>
      <StubPage
        eyebrow="Join a Community"
        title="People Like You. Places You Love."
        body="Explore neighborhoods, follow agents, and be part of a real estate community that moves forward."
      />
      <section className="mktSection" style={{ paddingTop: 0 }}>
        <div className="mktWrap mktCityGrid">
          {communities.map(c => (
            <Link href="/explore" className="mktCity" key={c.name}>
              <img src={c.image} alt={c.name} />
              <div>
                <strong>{c.name}</strong>
                <span>{c.members}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
