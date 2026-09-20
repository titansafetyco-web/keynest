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
            <a className="mktStore" href="https://www.apple.com/app-store/">
              <svg className="mktStoreLogo" viewBox="0 0 24 24" aria-hidden="true">
                <path
                  fill="currentColor"
                  d="M16.37 12.86c.03 3.1 2.72 4.13 2.75 4.14-.02.08-.43 1.47-1.41 2.91-.85 1.24-1.73 2.48-3.12 2.5-1.37.03-1.81-.81-3.37-.81-1.56 0-2.05.79-3.34.84-1.34.05-2.36-1.34-3.22-2.57C2.7 17.2 1.36 12.54 3.16 9.4c.89-1.56 2.49-2.54 4.22-2.57 1.32-.02 2.56.89 3.37.89.81 0 2.32-1.1 3.91-.94.67.03 2.54.27 3.74 2.03-.1.06-2.23 1.3-2.03 3.05zM14.2 5.37c.73-.88 1.22-2.1 1.09-3.32-1.05.04-2.32.7-3.07 1.58-.68.79-1.27 2.05-1.11 3.26 1.17.09 2.37-.6 3.09-1.52z"
                />
              </svg>
              <span>
                <small>Download on the</small>
                App Store
              </span>
            </a>
            <a className="mktStore" href="https://play.google.com/store">
              <svg className="mktStoreLogo" viewBox="0 0 24 24" aria-hidden="true">
                <path fill="#EA4335" d="M3.2 2.3 13.7 12 3.2 21.7c-.7-.4-1.2-1.2-1.2-2.1V4.4c0-.9.5-1.7 1.2-2.1z" />
                <path fill="#FBBC04" d="m3.2 21.7 10.5-9.7 3.2 3L6.1 22.8c-1.1.6-2.3.1-2.9-.1z" />
                <path fill="#4285F4" d="m16.9 15.3-3.2-3 3.2-3 4.1 2.4c1.3.8 1.3 2.1 0 2.9l-4.1.7z" />
                <path fill="#34A853" d="M3.2 2.3c.6-.2 1.8-.7 2.9-.1l10.8 6.2-3.2 3L3.2 2.3z" />
              </svg>
              <span>
                <small>Get it on</small>
                Google Play
              </span>
            </a>
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
