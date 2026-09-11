export default function StubPage({
  eyebrow,
  title,
  body
}: {
  eyebrow: string;
  title: string;
  body: string;
}) {
  return (
    <section className="mktStub">
      <div className="mktEyebrow">{eyebrow}</div>
      <h1>{title}</h1>
      <p>{body}</p>
    </section>
  );
}
