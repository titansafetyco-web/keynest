import { Bell, Home, MessageCircle } from "lucide-react";

export default function AppPromo() {
  return (
    <section className="mktSection mktApp">
      <div className="mktWrap mktAppGrid">
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
            <img src="/images/townliv2.webp" alt="KeyNest app map" />
          </div>
        </div>
        <ul className="mktAppFeatures">
          <li><Home size={16} /> Live listings</li>
          <li><MessageCircle size={16} /> Messages</li>
          <li><Bell size={16} /> Market updates</li>
        </ul>
      </div>
    </section>
  );
}
