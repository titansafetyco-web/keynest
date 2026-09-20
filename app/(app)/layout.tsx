import "../marketing.css";
import SiteHeader from "@/components/marketing/site-header";
import SiteFooter from "@/components/marketing/site-footer";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="mkt">
      <SiteHeader />
      <div className="mktPage">{children}</div>
      <SiteFooter />
    </div>
  );
}
