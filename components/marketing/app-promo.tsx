import { Bell, Search, Smartphone } from "lucide-react";

export default function AppPromo() {
  return (
    <section className="mktSection mktApp">
      <div className="mktWrap mktSplit">
        <div>
          <div className="mktEyebrow">The KeyNest App</div>
          <h2>Real Estate On the Go.</h2>
          <p>Search. Save. Connect. Anywhere.</p>
          <div className="mktStores">
            <a className="mktStore" href="https://www.apple.com/app-store/">App Store</a>
            <a className="mktStore" href="https://play.google.com/store">Google Play</a>
          </div>
        </div>
        <div className="mktPhones">
          <div className="mktPhone">
            <div className="mktPhoneBar" />
            <img src="/images/housepool.webp" alt="KeyNest app listings" />
          </div>
          <div className="mktPhone mktPhoneAlt">
            <div className="mktPhoneBar" />
            <div className="mktPhoneIcons">
              <Search size={18} />
              <Bell size={18} />
              <Smartphone size={18} />
            </div>
            <p>Your next move, in one place.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
