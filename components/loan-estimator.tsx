"use client";

import { useMemo, useState } from "react";

type LoanKind = "conventional" | "fha" | "va";
type TermPick = 15 | 30 | "custom";

function money(n: number) {
  if (!Number.isFinite(n) || n <= 0) return "$0";
  return n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });
}

function moneyCents(n: number) {
  if (!Number.isFinite(n) || n < 0) return "$0";
  return n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });
}

function parsePrice(raw: string) {
  return Number(String(raw).replace(/[^0-9.]/g, "")) || 0;
}

function monthlyPi(principal: number, apr: number, years: number) {
  const n = years * 12;
  const r = apr / 100 / 12;
  if (principal <= 0 || n <= 0) return 0;
  if (r <= 0) return principal / n;
  const pow = Math.pow(1 + r, n);
  return principal * (r * pow) / (pow - 1);
}

export default function LoanEstimator({ priceLabel }: { priceLabel: string }) {
  const listPrice = parsePrice(priceLabel);
  const [kind, setKind] = useState<LoanKind>("conventional");
  const [price, setPrice] = useState(listPrice);
  const [downPct, setDownPct] = useState(20);
  const [apr, setApr] = useState(6.5);
  const [termPick, setTermPick] = useState<TermPick>(30);
  const [customYears, setCustomYears] = useState("20");
  const [taxRate, setTaxRate] = useState(1.2);
  const [insurance, setInsurance] = useState(1800);
  const [hoa, setHoa] = useState(0);
  const [pmiRate, setPmiRate] = useState(0.6);
  const [financeFees, setFinanceFees] = useState(true);

  const minDown = kind === "fha" ? 3.5 : kind === "va" ? 0 : 3;
  const usedDownPct = Math.max(minDown, downPct);
  const down = price * (usedDownPct / 100);
  const baseLoan = Math.max(0, price - down);
  const years = termPick === "custom"
    ? Math.min(50, Math.max(1, Number(customYears) || 1))
    : termPick;

  const estimate = useMemo(() => {
    const ufMip = kind === "fha" ? baseLoan * 0.0175 : 0;
    const vaFee = kind === "va" ? baseLoan * 0.0215 : 0;
    const financed = financeFees ? ufMip + vaFee : 0;
    const cashFees = financeFees ? 0 : ufMip + vaFee;
    const principal = baseLoan + financed;
    const pi = monthlyPi(principal, apr, years);
    const tax = (price * (taxRate / 100)) / 12;
    const ins = insurance / 12;
    const pmi = kind === "conventional" && usedDownPct < 20
      ? (baseLoan * (pmiRate / 100)) / 12
      : 0;
    const mip = kind === "fha" ? (baseLoan * 0.0055) / 12 : 0;
    const mi = pmi + mip;
    const total = pi + tax + ins + mi + hoa;
    const closeLow = price * 0.02;
    const closeHigh = price * 0.05;
    const closeMid = price * 0.03;
    const cashToClose = down + closeMid + cashFees;
    return { principal, pi, tax, ins, mi, hoa, total, cashFees, ufMip, vaFee, closeLow, closeHigh, closeMid, cashToClose };
  }, [apr, baseLoan, down, financeFees, hoa, insurance, kind, pmiRate, price, taxRate, usedDownPct, years]);

  return (
    <div className="loanBox">
      <h2 className="propAboutTitle">Loan estimator</h2>
      <p className="muted propAbout">Estimate payment with tax, insurance, and mortgage insurance. Not a lender quote.</p>

      <div className="loanKinds" role="tablist" aria-label="Loan type">
        {([
          ["conventional", "Conventional"],
          ["fha", "FHA"],
          ["va", "VA"]
        ] as const).map(([id, label]) => (
          <button
            key={id}
            type="button"
            role="tab"
            aria-selected={kind === id}
            className={kind === id ? "is-on" : ""}
            onClick={() => {
              setKind(id);
              if (id === "fha") setDownPct(pct => Math.max(3.5, pct));
              if (id === "conventional" && downPct < 5) setDownPct(20);
              if (id === "va") setDownPct(0);
            }}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="loanGrid">
        <label>
          Home price
          <input inputMode="decimal" value={price ? price.toLocaleString("en-US") : ""} onChange={e => setPrice(parsePrice(e.target.value))} />
        </label>
        <div className="loanField loanDownRow">
          <span>Down payment</span>
          <div className="loanSplitPair">
            <label>
              Amount
              <span className="loanSplit">
                <em>$</em>
                <input
                  inputMode="decimal"
                  aria-label="Down payment amount"
                  value={down ? Math.round(down).toLocaleString("en-US") : ""}
                  onChange={e => {
                    const dollars = parsePrice(e.target.value);
                    setDownPct(price > 0 ? Math.round((dollars / price) * 10000) / 100 : 0);
                  }}
                />
              </span>
            </label>
            <label>
              Percent
              <span className="loanSplit">
                <input
                  inputMode="decimal"
                  aria-label="Down payment percent"
                  value={Number.isInteger(usedDownPct) ? usedDownPct : Math.round(usedDownPct * 100) / 100}
                  onChange={e => setDownPct(Number(e.target.value) || 0)}
                />
                <em>%</em>
              </span>
            </label>
          </div>
        </div>
        <label>
          APR
          <span className="loanSplit">
            <input inputMode="decimal" value={apr} onChange={e => setApr(Number(e.target.value) || 0)} />
            <em>%</em>
          </span>
        </label>
        <div className="loanField">
          <span>Term</span>
          <div className="loanKinds loanKindsMini" role="group" aria-label="Loan term">
            <button type="button" className={termPick === 15 ? "is-on" : ""} onClick={() => setTermPick(15)}>15 yr</button>
            <button type="button" className={termPick === 30 ? "is-on" : ""} onClick={() => setTermPick(30)}>30 yr</button>
            <button type="button" className={termPick === "custom" ? "is-on" : ""} onClick={() => setTermPick("custom")}>Custom</button>
          </div>
          {termPick === "custom" ? (
            <span className="loanSplit">
              <input
                inputMode="numeric"
                aria-label="Custom term in years"
                placeholder="Years"
                value={customYears}
                onChange={e => setCustomYears(e.target.value.replace(/[^0-9.]/g, ""))}
              />
              <em>yr</em>
            </span>
          ) : null}
        </div>
        <label>
          Property tax
          <span className="loanSplit">
            <input inputMode="decimal" value={taxRate} onChange={e => setTaxRate(Number(e.target.value) || 0)} />
            <em>% / yr</em>
          </span>
        </label>
        <label>
          Homeowners ins.
          <span className="loanSplit">
            <input inputMode="decimal" value={insurance ? insurance.toLocaleString("en-US") : ""} onChange={e => setInsurance(parsePrice(e.target.value))} />
            <em>/ yr</em>
          </span>
        </label>
        {kind === "conventional" && usedDownPct < 20 ? (
          <label>
            PMI
            <span className="loanSplit">
              <input inputMode="decimal" value={pmiRate} onChange={e => setPmiRate(Number(e.target.value) || 0)} />
              <em>% / yr</em>
            </span>
          </label>
        ) : null}
        <label>
          HOA
          <span className="loanSplit">
            <input inputMode="decimal" value={hoa ? hoa.toLocaleString("en-US") : "0"} onChange={e => setHoa(parsePrice(e.target.value))} />
            <em>/ mo</em>
          </span>
        </label>
      </div>

      {kind === "fha" || kind === "va" ? (
        <label className="loanCheck">
          <input type="checkbox" checked={financeFees} onChange={e => setFinanceFees(e.target.checked)} />
          Finance {kind === "fha" ? "FHA upfront MIP (1.75%)" : "VA funding fee (2.15%)"}
        </label>
      ) : null}

      <div className="loanResult">
        <div className="loanTotal">
          <span>Est. monthly</span>
          <strong>{moneyCents(estimate.total)}</strong>
        </div>
        <ul>
          <li><span>Principal & interest</span><b>{moneyCents(estimate.pi)}</b></li>
          <li><span>Property tax</span><b>{moneyCents(estimate.tax)}</b></li>
          <li><span>Homeowners insurance</span><b>{moneyCents(estimate.ins)}</b></li>
          <li><span>{kind === "fha" ? "FHA mortgage insurance" : "Mortgage insurance"}</span><b>{moneyCents(estimate.mi)}</b></li>
          {hoa ? <li><span>HOA</span><b>{moneyCents(hoa)}</b></li> : null}
          <li><span>Loan amount</span><b>{money(estimate.principal)}</b></li>
          <li><span>Est. closing costs</span><b>{money(estimate.closeMid)}</b></li>
          <li><span>Suggested cash to close</span><b>{money(estimate.cashToClose)}</b></li>
        </ul>
        <p className="loanHint">
          Closing costs are typically 2–5% of price ({money(estimate.closeLow)}–{money(estimate.closeHigh)}) for lender, title, recording, and prepaid tax &amp; insurance. Cash to close is down payment plus that mid estimate{estimate.cashFees ? `, plus ${money(estimate.cashFees)} in unpaid loan fees` : ""}.
        </p>
      </div>
    </div>
  );
}
