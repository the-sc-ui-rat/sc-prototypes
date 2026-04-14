import type { Story } from "@ladle/react";

export default { title: "Tokens" };


const css = `
  .tok-main { max-width: 860px; margin: 0 auto; padding: 2.5rem 2rem 4rem; display: flex; flex-direction: column; gap: 3.5rem; }
  .tok-section-header { display: flex; align-items: baseline; gap: 0.75rem; margin-bottom: 1.25rem; padding-bottom: 0.75rem; border-bottom: 1px solid var(--page-border); }
  .tok-section-title { font-size: 1rem; font-weight: 600; letter-spacing: -0.02em; }
  .tok-section-subtitle { font-size: 0.75rem; color: var(--page-text-subtle); }

  .tok-intro { font-size: 0.875rem; color: var(--page-text-muted); line-height: 1.6; max-width: 640px; }
  .tok-code-block { background: var(--page-code-bg); border: 1px solid var(--page-border); border-radius: 8px; padding: 1rem 1.25rem; margin-top: 1rem; }
  .tok-code-block pre { font-family: "SF Mono","Fira Code",Consolas,monospace; font-size: 0.8125rem; color: var(--page-text); overflow-x: auto; line-height: 1.6; }

  .tok-table-wrap { background: var(--page-surface); border: 1px solid var(--page-border); border-radius: 8px; overflow: hidden; }
  .tok-table { width: 100%; border-collapse: collapse; }
  .tok-table th { font-size: 0.6875rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.06em; color: var(--page-text-subtle); background: var(--page-code-bg); padding: 0.5rem 0.75rem; text-align: left; border-bottom: 1px solid var(--page-border); }
  .tok-table td { padding: 0.4375rem 0.75rem; font-size: 0.8125rem; border-bottom: 1px solid var(--page-border); vertical-align: middle; color: var(--page-text); }
  .tok-table tr:last-child td { border-bottom: none; }
  .tok-group-sep td { font-size: 0.6875rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.07em; color: var(--page-text-subtle); background: var(--page-code-bg); padding: 0.5rem 0.75rem; border-top: 1px solid var(--page-border); }
  .tok-group-sep:first-child td { border-top: none; }

  .tok-token-class { font-family: "SF Mono","Fira Code",Consolas,monospace; font-size: 0.8125rem; font-weight: 500; white-space: nowrap; color: var(--page-text); }
  .tok-token-value { font-family: "SF Mono","Fira Code",Consolas,monospace; font-size: 0.75rem; color: var(--page-text-muted); white-space: nowrap; }
  .tok-token-dark { color: var(--page-text-subtle); }
  .tok-swatch-cell { width: 2.5rem; padding-right: 0.875rem; }
  .tok-swatch { width: 1.5rem; height: 1.5rem; border-radius: 4px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
  .tok-swatch-text { background: var(--page-surface); box-shadow: inset 0 0 0 1px var(--page-border); }
  .tok-swatch-text span { font-weight: 700; font-size: 0.875rem; line-height: 1; }
  .tok-swatch-border { background: var(--page-surface); border: 2px solid; }

  .tok-spacing-bar { height: 8px; background: var(--background-color-accent-default); border-radius: 2px; min-width: 2px; }
  .tok-dim { color: var(--page-text-subtle); }
  .tok-mono { font-family: "SF Mono","Fira Code",Consolas,monospace; font-size: 0.75rem; color: var(--text-color-accent-default); }

  .tok-radius-grid { display: flex; flex-wrap: wrap; gap: 1.5rem; align-items: flex-end; }
  .tok-radius-item { display: flex; flex-direction: column; align-items: center; gap: 0.625rem; }
  .tok-radius-box { width: 64px; height: 64px; background: var(--background-color-accent-weaker); border: 2px solid var(--background-color-accent-default); }
  .tok-radius-label { font-size: 0.6875rem; font-family: "SF Mono","Fira Code",Consolas,monospace; color: var(--page-text-muted); text-align: center; }

  .tok-shadow-grid { display: flex; flex-wrap: wrap; gap: 2rem; padding: 2rem; background: var(--page-code-bg); border-radius: 8px; }
  .tok-shadow-item { display: flex; flex-direction: column; align-items: center; gap: 1rem; }
  .tok-shadow-box { width: 80px; height: 80px; background: var(--page-surface); border-radius: 8px; }
  .tok-shadow-label { font-size: 0.6875rem; font-family: "SF Mono","Fira Code",Consolas,monospace; color: var(--page-text-muted); }

  .tok-type-preview { color: var(--page-text); line-height: 1.2; }
  .tok-bp-bar-wrap { background: var(--page-code-bg); border-radius: 3px; height: 10px; flex: 1; overflow: hidden; }
  .tok-bp-bar { height: 100%; background: var(--background-color-accent-weaker); border-right: 2px solid var(--background-color-accent-default); border-radius: 3px; }

  /* page-level CSS vars (not in @theme) */
  :root {
    --page-bg: #f8f9fc;
    --page-surface: #ffffff;
    --page-border: #e9edf6;
    --page-text: #1f2533;
    --page-text-muted: #545f70;
    --page-text-subtle: #828ea0;
    --page-code-bg: #f1f3fb;
  }
  .dark {
    --page-bg: #13141a;
    --page-surface: #22232c;
    --page-border: #2c2c41;
    --page-text: #efeff6;
    --page-text-muted: #8c8ca1;
    --page-text-subtle: #5a5a6d;
    --page-code-bg: #282936;
  }
`;

export const Reference: Story = () => (
  <>
    <style dangerouslySetInnerHTML={{ __html: css }} />
    <div style={{ color: "var(--page-text)", minHeight: "100vh", fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, sans-serif', fontSize: "16px", lineHeight: 1.5 }}>
      <div className="tok-main">

        {/* Setup */}
        <section>
          <div className="tok-section-header">
            <span className="tok-section-title">Design Tokens</span>
          </div>
          <p className="tok-intro" style={{ marginBottom: "1rem" }}>
            Design tokens are the visual design atoms of the design system — they are semantically named style classes that store visual design attributes such as colors, typography, spacing, etc. They ensure a consistent visual language across products and platforms. Enabling multiple themes (e.g. light and dark mode) is as simple as changing the values of the design tokens.
          </p>
        
        </section>

        {/* Colors */}
        <section>
          <div className="tok-section-header">
            <span className="tok-section-title">Colors</span>
            <span className="tok-section-subtitle">Semantic — responds to dark mode · value shown as light / dark</span>
          </div>
          <div className="tok-table-wrap">
            <table className="tok-table">
              <thead><tr><th>Tailwind class</th><th>Value</th><th></th></tr></thead>
              <tbody>
                <tr className="tok-group-sep"><td colSpan={3}>Accent</td></tr>
                <tr><td className="tok-token-class">bg-accent-default</td><td className="tok-token-value">#6559ff<span className="tok-token-dark"> / #6a5bff</span></td><td className="tok-swatch-cell"><div className="tok-swatch" style={{ background: "var(--background-color-accent-default)" }} /></td></tr>
                <tr><td className="tok-token-class">bg-accent-hover</td><td className="tok-token-value">#544af3<span className="tok-token-dark"> / #7a73ff</span></td><td className="tok-swatch-cell"><div className="tok-swatch" style={{ background: "var(--background-color-accent-hover)" }} /></td></tr>
                <tr><td className="tok-token-class">bg-accent-pressed</td><td className="tok-token-value">#493ee0<span className="tok-token-dark"> / #5249e0</span></td><td className="tok-swatch-cell"><div className="tok-swatch" style={{ background: "var(--background-color-accent-pressed)" }} /></td></tr>
                <tr><td className="tok-token-class">bg-accent-weaker</td><td className="tok-token-value">#dde1ff<span className="tok-token-dark"> / #36328c</span></td><td className="tok-swatch-cell"><div className="tok-swatch" style={{ background: "var(--background-color-accent-weaker)", border: "1px solid var(--page-border)" }} /></td></tr>
                <tr><td className="tok-token-class">bg-accent-weaker-hover</td><td className="tok-token-value">#d6dafe<span className="tok-token-dark"> / #4c44c0</span></td><td className="tok-swatch-cell"><div className="tok-swatch" style={{ background: "var(--background-color-accent-weaker-hover)" }} /></td></tr>
                <tr><td className="tok-token-class">bg-accent-weaker-pressed</td><td className="tok-token-value">#cacffe<span className="tok-token-dark"> / #312d87</span></td><td className="tok-swatch-cell"><div className="tok-swatch" style={{ background: "var(--background-color-accent-weaker-pressed)" }} /></td></tr>
                <tr><td className="tok-token-class">bg-accent-weakest</td><td className="tok-token-value">#ecedfe<span className="tok-token-dark"> / #24204d</span></td><td className="tok-swatch-cell"><div className="tok-swatch" style={{ background: "var(--background-color-accent-weakest)", border: "1px solid var(--page-border)" }} /></td></tr>
                <tr><td className="tok-token-class">text-accent-default</td><td className="tok-token-value">#4740d4<span className="tok-token-dark"> / #9ea5ff</span></td><td className="tok-swatch-cell"><div className="tok-swatch tok-swatch-text"><span style={{ color: "var(--text-color-accent-default)" }}>A</span></div></td></tr>
                <tr><td className="tok-token-class">text-accent-on-default</td><td className="tok-token-value">#ffffff<span className="tok-token-dark"> / #fcfcfd</span></td><td className="tok-swatch-cell"><div className="tok-swatch tok-swatch-text"><span style={{ color: "var(--text-color-accent-on-default)" }}>A</span></div></td></tr>
                <tr><td className="tok-token-class">text-accent-on-weaker</td><td className="tok-token-value">#4740d4<span className="tok-token-dark"> / #d6d9ff</span></td><td className="tok-swatch-cell"><div className="tok-swatch tok-swatch-text"><span style={{ color: "var(--text-color-accent-on-weaker)" }}>A</span></div></td></tr>
                <tr><td className="tok-token-class">border-accent-default</td><td className="tok-token-value">#564be7<span className="tok-token-dark"> / #746bf5</span></td><td className="tok-swatch-cell"><div className="tok-swatch tok-swatch-border" style={{ borderColor: "var(--border-color-accent-default)" }} /></td></tr>
                <tr><td className="tok-token-class">border-accent-weak</td><td className="tok-token-value">#b3b3ff<span className="tok-token-dark"> / #453dc0</span></td><td className="tok-swatch-cell"><div className="tok-swatch tok-swatch-border" style={{ borderColor: "var(--border-color-accent-weak)" }} /></td></tr>

                <tr className="tok-group-sep"><td colSpan={3}>Negative</td></tr>
                <tr><td className="tok-token-class">bg-negative-default</td><td className="tok-token-value">#c62f35<span className="tok-token-dark"> / #d2414b</span></td><td className="tok-swatch-cell"><div className="tok-swatch" style={{ background: "var(--background-color-negative-default)" }} /></td></tr>
                <tr><td className="tok-token-class">bg-negative-hover</td><td className="tok-token-value">#db4249<span className="tok-token-dark"> / #dc474e</span></td><td className="tok-swatch-cell"><div className="tok-swatch" style={{ background: "var(--background-color-negative-hover)" }} /></td></tr>
                <tr><td className="tok-token-class">bg-negative-pressed</td><td className="tok-token-value">#b62a32<span className="tok-token-dark"> / #b3323f</span></td><td className="tok-swatch-cell"><div className="tok-swatch" style={{ background: "var(--background-color-negative-pressed)" }} /></td></tr>
                <tr><td className="tok-token-class">bg-negative-weaker</td><td className="tok-token-value">#ffe5e9<span className="tok-token-dark"> / #4b0b17</span></td><td className="tok-swatch-cell"><div className="tok-swatch" style={{ background: "var(--background-color-negative-weaker)", border: "1px solid var(--page-border)" }} /></td></tr>
                <tr><td className="tok-token-class">bg-negative-weakest</td><td className="tok-token-value">#fff0f1<span className="tok-token-dark"> / #3a030e</span></td><td className="tok-swatch-cell"><div className="tok-swatch" style={{ background: "var(--background-color-negative-weakest)", border: "1px solid var(--page-border)" }} /></td></tr>
                <tr><td className="tok-token-class">text-negative-default</td><td className="tok-token-value">#a8242a<span className="tok-token-dark"> / #f68489</span></td><td className="tok-swatch-cell"><div className="tok-swatch tok-swatch-text"><span style={{ color: "var(--text-color-negative-default)" }}>A</span></div></td></tr>
                <tr><td className="tok-token-class">text-negative-on-default</td><td className="tok-token-value">#ffffff<span className="tok-token-dark"> / #fcfcfd</span></td><td className="tok-swatch-cell"><div className="tok-swatch tok-swatch-text"><span style={{ color: "var(--text-color-negative-on-default)" }}>A</span></div></td></tr>
                <tr><td className="tok-token-class">text-negative-on-weaker</td><td className="tok-token-value">#a8242a<span className="tok-token-dark"> / #fecdcf</span></td><td className="tok-swatch-cell"><div className="tok-swatch tok-swatch-text"><span style={{ color: "var(--text-color-negative-on-weaker)" }}>A</span></div></td></tr>
                <tr><td className="tok-token-class">border-negative-default</td><td className="tok-token-value">#a8242a<span className="tok-token-dark"> / #dc474e</span></td><td className="tok-swatch-cell"><div className="tok-swatch tok-swatch-border" style={{ borderColor: "var(--border-color-negative-default)" }} /></td></tr>
                <tr><td className="tok-token-class">border-negative-weak</td><td className="tok-token-value">#fbacb2<span className="tok-token-dark"> / #b3323f</span></td><td className="tok-swatch-cell"><div className="tok-swatch tok-swatch-border" style={{ borderColor: "var(--border-color-negative-weak)" }} /></td></tr>

                <tr className="tok-group-sep"><td colSpan={3}>Positive</td></tr>
                <tr><td className="tok-token-class">bg-positive-default</td><td className="tok-token-value">#17966c<span className="tok-token-dark"> / #15ac7a</span></td><td className="tok-swatch-cell"><div className="tok-swatch" style={{ background: "var(--background-color-positive-default)" }} /></td></tr>
                <tr><td className="tok-token-class">bg-positive-hover</td><td className="tok-token-value">#1eae7e<span className="tok-token-dark"> / #20c58e</span></td><td className="tok-swatch-cell"><div className="tok-swatch" style={{ background: "var(--background-color-positive-hover)" }} /></td></tr>
                <tr><td className="tok-token-class">bg-positive-pressed</td><td className="tok-token-value">#04855d<span className="tok-token-dark"> / #029264</span></td><td className="tok-swatch-cell"><div className="tok-swatch" style={{ background: "var(--background-color-positive-pressed)" }} /></td></tr>
                <tr><td className="tok-token-class">bg-positive-weaker</td><td className="tok-token-value">#dafbef<span className="tok-token-dark"> / #003d29</span></td><td className="tok-swatch-cell"><div className="tok-swatch" style={{ background: "var(--background-color-positive-weaker)", border: "1px solid var(--page-border)" }} /></td></tr>
                <tr><td className="tok-token-class">bg-positive-weakest</td><td className="tok-token-value">#e8fcf5<span className="tok-token-dark"> / #002e1f</span></td><td className="tok-swatch-cell"><div className="tok-swatch" style={{ background: "var(--background-color-positive-weakest)", border: "1px solid var(--page-border)" }} /></td></tr>
                <tr><td className="tok-token-class">text-positive-default</td><td className="tok-token-value">#007a52<span className="tok-token-dark"> / #8df2d0</span></td><td className="tok-swatch-cell"><div className="tok-swatch tok-swatch-text"><span style={{ color: "var(--text-color-positive-default)" }}>A</span></div></td></tr>
                <tr><td className="tok-token-class">text-positive-on-default</td><td className="tok-token-value">#ffffff<span className="tok-token-dark"> / #15161e</span></td><td className="tok-swatch-cell"><div className="tok-swatch tok-swatch-text"><span style={{ color: "var(--text-color-positive-on-default)" }}>A</span></div></td></tr>
                <tr><td className="tok-token-class">text-positive-on-weaker</td><td className="tok-token-value">#007a52<span className="tok-token-dark"> / #b0fde3</span></td><td className="tok-swatch-cell"><div className="tok-swatch tok-swatch-text"><span style={{ color: "var(--text-color-positive-on-weaker)" }}>A</span></div></td></tr>
                <tr><td className="tok-token-class">border-positive-default</td><td className="tok-token-value">#007a52<span className="tok-token-dark"> / #20c58e</span></td><td className="tok-swatch-cell"><div className="tok-swatch tok-swatch-border" style={{ borderColor: "var(--border-color-positive-default)" }} /></td></tr>
                <tr><td className="tok-token-class">border-positive-weak</td><td className="tok-token-value">#99e5c9<span className="tok-token-dark"> / #029264</span></td><td className="tok-swatch-cell"><div className="tok-swatch tok-swatch-border" style={{ borderColor: "var(--border-color-positive-weak)" }} /></td></tr>

                <tr className="tok-group-sep"><td colSpan={3}>Warning</td></tr>
                <tr><td className="tok-token-class">bg-warning-default</td><td className="tok-token-value">#d97502<span className="tok-token-dark"> / #e47f0c</span></td><td className="tok-swatch-cell"><div className="tok-swatch" style={{ background: "var(--background-color-warning-default)" }} /></td></tr>
                <tr><td className="tok-token-class">bg-warning-hover</td><td className="tok-token-value">#e78932<span className="tok-token-dark"> / #f4962a</span></td><td className="tok-swatch-cell"><div className="tok-swatch" style={{ background: "var(--background-color-warning-hover)" }} /></td></tr>
                <tr><td className="tok-token-class">bg-warning-pressed</td><td className="tok-token-value">#c96500<span className="tok-token-dark"> / #c26c0a</span></td><td className="tok-swatch-cell"><div className="tok-swatch" style={{ background: "var(--background-color-warning-pressed)" }} /></td></tr>
                <tr><td className="tok-token-class">bg-warning-weaker</td><td className="tok-token-value">#fff1cc<span className="tok-token-dark"> / #4d2400</span></td><td className="tok-swatch-cell"><div className="tok-swatch" style={{ background: "var(--background-color-warning-weaker)", border: "1px solid var(--page-border)" }} /></td></tr>
                <tr><td className="tok-token-class">bg-warning-weakest</td><td className="tok-token-value">#fffae5<span className="tok-token-dark"> / #331a00</span></td><td className="tok-swatch-cell"><div className="tok-swatch" style={{ background: "var(--background-color-warning-weakest)", border: "1px solid var(--page-border)" }} /></td></tr>
                <tr><td className="tok-token-class">text-warning-default</td><td className="tok-token-value">#bd5800<span className="tok-token-dark"> / #f4962a</span></td><td className="tok-swatch-cell"><div className="tok-swatch tok-swatch-text"><span style={{ color: "var(--text-color-warning-default)" }}>A</span></div></td></tr>
                <tr><td className="tok-token-class">text-warning-on-default</td><td className="tok-token-value">#ffffff<span className="tok-token-dark"> / #15161e</span></td><td className="tok-swatch-cell"><div className="tok-swatch tok-swatch-text"><span style={{ color: "var(--text-color-warning-on-default)" }}>A</span></div></td></tr>
                <tr><td className="tok-token-class">text-warning-on-weaker</td><td className="tok-token-value">#9e4a00<span className="tok-token-dark"> / #ffcc80</span></td><td className="tok-swatch-cell"><div className="tok-swatch tok-swatch-text"><span style={{ color: "var(--text-color-warning-on-weaker)" }}>A</span></div></td></tr>
                <tr><td className="tok-token-class">border-warning-default</td><td className="tok-token-value">#bd5800<span className="tok-token-dark"> / #f4962a</span></td><td className="tok-swatch-cell"><div className="tok-swatch tok-swatch-border" style={{ borderColor: "var(--border-color-warning-default)" }} /></td></tr>
                <tr><td className="tok-token-class">border-warning-weak</td><td className="tok-token-value">#ffca7a<span className="tok-token-dark"> / #c26c0a</span></td><td className="tok-swatch-cell"><div className="tok-swatch tok-swatch-border" style={{ borderColor: "var(--border-color-warning-weak)" }} /></td></tr>

                <tr className="tok-group-sep"><td colSpan={3}>Info</td></tr>
                <tr><td className="tok-token-class">bg-info-default</td><td className="tok-token-value">#0e8ad8<span className="tok-token-dark"> / #1ca4e9</span></td><td className="tok-swatch-cell"><div className="tok-swatch" style={{ background: "var(--background-color-info-default)" }} /></td></tr>
                <tr><td className="tok-token-class">bg-info-hover</td><td className="tok-token-value">#0e9eec<span className="tok-token-dark"> / #2bbdf3</span></td><td className="tok-swatch-cell"><div className="tok-swatch" style={{ background: "var(--background-color-info-hover)" }} /></td></tr>
                <tr><td className="tok-token-class">bg-info-pressed</td><td className="tok-token-value">#0d75b5<span className="tok-token-dark"> / #1688ca</span></td><td className="tok-swatch-cell"><div className="tok-swatch" style={{ background: "var(--background-color-info-pressed)" }} /></td></tr>
                <tr><td className="tok-token-class">bg-info-weaker</td><td className="tok-token-value">#dbf8ff<span className="tok-token-dark"> / #0c4269</span></td><td className="tok-swatch-cell"><div className="tok-swatch" style={{ background: "var(--background-color-info-weaker)", border: "1px solid var(--page-border)" }} /></td></tr>
                <tr><td className="tok-token-class">bg-info-weakest</td><td className="tok-token-value">#e5faff<span className="tok-token-dark"> / #0c4269</span></td><td className="tok-swatch-cell"><div className="tok-swatch" style={{ background: "var(--background-color-info-weakest)", border: "1px solid var(--page-border)" }} /></td></tr>
                <tr><td className="tok-token-class">text-info-default</td><td className="tok-token-value">#0d75b5<span className="tok-token-dark"> / #8ae6ff</span></td><td className="tok-swatch-cell"><div className="tok-swatch tok-swatch-text"><span style={{ color: "var(--text-color-info-default)" }}>A</span></div></td></tr>
                <tr><td className="tok-token-class">text-info-on-default</td><td className="tok-token-value">#ffffff<span className="tok-token-dark"> / #15161e</span></td><td className="tok-swatch-cell"><div className="tok-swatch tok-swatch-text"><span style={{ color: "var(--text-color-info-on-default)" }}>A</span></div></td></tr>
                <tr><td className="tok-token-class">text-info-on-weaker</td><td className="tok-token-value">#0d75b5<span className="tok-token-dark"> / #d1f7ff</span></td><td className="tok-swatch-cell"><div className="tok-swatch tok-swatch-text"><span style={{ color: "var(--text-color-info-on-weaker)" }}>A</span></div></td></tr>
                <tr><td className="tok-token-class">border-info-default</td><td className="tok-token-value">#0d75b5<span className="tok-token-dark"> / #2bbdf3</span></td><td className="tok-swatch-cell"><div className="tok-swatch tok-swatch-border" style={{ borderColor: "var(--border-color-info-default)" }} /></td></tr>
                <tr><td className="tok-token-class">border-info-weak</td><td className="tok-token-value">#85daff<span className="tok-token-dark"> / #1688ca</span></td><td className="tok-swatch-cell"><div className="tok-swatch tok-swatch-border" style={{ borderColor: "var(--border-color-info-weak)" }} /></td></tr>

                <tr className="tok-group-sep"><td colSpan={3}>Surface</td></tr>
                <tr><td className="tok-token-class">bg-surface-default</td><td className="tok-token-value">#ffffff<span className="tok-token-dark"> / #22232c</span></td><td className="tok-swatch-cell"><div className="tok-swatch" style={{ background: "var(--background-color-surface-default)", border: "1px solid var(--page-border)" }} /></td></tr>
                <tr><td className="tok-token-class">bg-surface-hover</td><td className="tok-token-value">#f1f3fb<span className="tok-token-dark"> / #282936</span></td><td className="tok-swatch-cell"><div className="tok-swatch" style={{ background: "var(--background-color-surface-hover)", border: "1px solid var(--page-border)" }} /></td></tr>
                <tr><td className="tok-token-class">bg-surface-disabled</td><td className="tok-token-value">#f8f9fc<span className="tok-token-dark"> / #1e1f2b</span></td><td className="tok-swatch-cell"><div className="tok-swatch" style={{ background: "var(--background-color-surface-disabled)", border: "1px solid var(--page-border)" }} /></td></tr>
                <tr><td className="tok-token-class">bg-surface2-default</td><td className="tok-token-value">#e3e8f2<span className="tok-token-dark"> / #1c1d26</span></td><td className="tok-swatch-cell"><div className="tok-swatch" style={{ background: "var(--background-color-surface2-default)", border: "1px solid var(--page-border)" }} /></td></tr>
                <tr><td className="tok-token-class">bg-surface3-default</td><td className="tok-token-value">#ffffff<span className="tok-token-dark"> / #292a36</span></td><td className="tok-swatch-cell"><div className="tok-swatch" style={{ background: "var(--background-color-surface3-default)", border: "1px solid var(--page-border)" }} /></td></tr>
                <tr><td className="tok-token-class">text-surface-default</td><td className="tok-token-value">#3f495a<span className="tok-token-dark"> / #b5b5bf</span></td><td className="tok-swatch-cell"><div className="tok-swatch tok-swatch-text"><span style={{ color: "var(--text-color-surface-default)" }}>A</span></div></td></tr>
                <tr><td className="tok-token-class">text-surface-weaker</td><td className="tok-token-value">#545f70<span className="tok-token-dark"> / #8c8ca1</span></td><td className="tok-swatch-cell"><div className="tok-swatch tok-swatch-text"><span style={{ color: "var(--text-color-surface-weaker)" }}>A</span></div></td></tr>
                <tr><td className="tok-token-class">text-surface-disabled</td><td className="tok-token-value">#828ea0<span className="tok-token-dark"> / #5a5a6d</span></td><td className="tok-swatch-cell"><div className="tok-swatch tok-swatch-text"><span style={{ color: "var(--text-color-surface-disabled)" }}>A</span></div></td></tr>
                <tr><td className="tok-token-class">text-surface-placeholder</td><td className="tok-token-value">#bfc6d4<span className="tok-token-dark"> / #5a5a6d</span></td><td className="tok-swatch-cell"><div className="tok-swatch tok-swatch-text"><span style={{ color: "var(--text-color-surface-placeholder)" }}>A</span></div></td></tr>
                <tr><td className="tok-token-class">border-surface-default</td><td className="tok-token-value">#bfc6d4<span className="tok-token-dark"> / #4a4a5f</span></td><td className="tok-swatch-cell"><div className="tok-swatch tok-swatch-border" style={{ borderColor: "var(--border-color-surface-default)" }} /></td></tr>
                <tr><td className="tok-token-class">border-surface-weak</td><td className="tok-token-value">#dbe0eb<span className="tok-token-dark"> / #37374c</span></td><td className="tok-swatch-cell"><div className="tok-swatch tok-swatch-border" style={{ borderColor: "var(--border-color-surface-weak)" }} /></td></tr>
                <tr><td className="tok-token-class">border-surface-strong</td><td className="tok-token-value">#abb5c4<span className="tok-token-dark"> / #6f6f85</span></td><td className="tok-swatch-cell"><div className="tok-swatch tok-swatch-border" style={{ borderColor: "var(--border-color-surface-strong)" }} /></td></tr>
                <tr><td className="tok-token-class">border-surface-weakest</td><td className="tok-token-value">#e9edf6<span className="tok-token-dark"> / #2c2c41</span></td><td className="tok-swatch-cell"><div className="tok-swatch tok-swatch-border" style={{ borderColor: "var(--border-color-surface-weakest)" }} /></td></tr>
                <tr><td className="tok-token-class">border-surface-disabled</td><td className="tok-token-value">#e9edf6<span className="tok-token-dark"> / #28283a</span></td><td className="tok-swatch-cell"><div className="tok-swatch tok-swatch-border" style={{ borderColor: "var(--border-color-surface-disabled)" }} /></td></tr>

                <tr className="tok-group-sep"><td colSpan={3}>Background · Inverse · Utility</td></tr>
                <tr><td className="tok-token-class">bg-default</td><td className="tok-token-value">#e9edf6<span className="tok-token-dark"> / #191a22</span></td><td className="tok-swatch-cell"><div className="tok-swatch" style={{ background: "var(--background-color-default)", border: "1px solid var(--page-border)" }} /></td></tr>
                <tr><td className="tok-token-class">bg-strong</td><td className="tok-token-value">#dbe0eb<span className="tok-token-dark"> / #21222b</span></td><td className="tok-swatch-cell"><div className="tok-swatch" style={{ background: "var(--background-color-strong)" }} /></td></tr>
                <tr><td className="tok-token-class">bg-weak</td><td className="tok-token-value">#f8f9fc<span className="tok-token-dark"> / #13141a</span></td><td className="tok-swatch-cell"><div className="tok-swatch" style={{ background: "var(--background-color-weak)", border: "1px solid var(--page-border)" }} /></td></tr>
                <tr><td className="tok-token-class">bg-inverse-default</td><td className="tok-token-value">#1f2533<span className="tok-token-dark"> / #efeff6</span></td><td className="tok-swatch-cell"><div className="tok-swatch" style={{ background: "var(--background-color-inverse-default)" }} /></td></tr>
                <tr><td className="tok-token-class">text-inverse-default</td><td className="tok-token-value">#ffffff<span className="tok-token-dark"> / #1c1c27</span></td><td className="tok-swatch-cell"><div className="tok-swatch tok-swatch-text"><span style={{ color: "var(--text-color-inverse-default)" }}>A</span></div></td></tr>
                <tr><td className="tok-token-class">border-inverse-default</td><td className="tok-token-value">#070b12<span className="tok-token-dark"> / #fcfcfd</span></td><td className="tok-swatch-cell"><div className="tok-swatch tok-swatch-border" style={{ borderColor: "var(--border-color-inverse-default)" }} /></td></tr>
                <tr><td className="tok-token-class">bg-overlay-default</td><td className="tok-token-value">#070b1280<span className="tok-token-dark"> / #02020380</span></td><td className="tok-swatch-cell"><div className="tok-swatch" style={{ background: "var(--background-color-overlay-default)" }} /></td></tr>
                <tr><td className="tok-token-class">outline-focus-default</td><td className="tok-token-value">#564be7e5<span className="tok-token-dark"> / #9ea5ffe5</span></td><td className="tok-swatch-cell"><div className="tok-swatch tok-swatch-border" style={{ borderColor: "var(--color-focus-default)" }} /></td></tr>
                <tr><td className="tok-token-class">bg-black-default / text-black-default</td><td className="tok-token-value">#070b12<span className="tok-token-dark"> / #020203</span></td><td className="tok-swatch-cell"><div className="tok-swatch" style={{ background: "var(--color-black-default)" }} /></td></tr>
                <tr><td className="tok-token-class">bg-white-default / text-white-default</td><td className="tok-token-value">#ffffff<span className="tok-token-dark"> / #fcfcfd</span></td><td className="tok-swatch-cell"><div className="tok-swatch" style={{ background: "var(--color-white-default)", border: "1px solid var(--page-border)" }} /></td></tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Spacing */}
        <section>
          <div className="tok-section-header">
            <span className="tok-section-title">Spacing</span>
            <span className="tok-section-subtitle">p-* · m-* · gap-* · w-* · h-* · inset-*</span>
          </div>
          <div className="tok-table-wrap">
            <table className="tok-table">
              <thead><tr><th>Token</th><th>Tailwind class</th><th>Value</th><th style={{ width: "30%" }}>Visual</th></tr></thead>
              <tbody>
                {[
                  ["--spacing-0", "p-0", "0", "0px", 0.3],
                  ["--spacing-0-5", "p-0.5", "0.125rem", "2px", 1.4],
                  ["--spacing-1", "p-1", "0.25rem", "4px", 2.8],
                  ["--spacing-2", "p-2", "0.5rem", "8px", 5.6],
                  ["--spacing-3", "p-3", "0.75rem", "12px", 8.3],
                  ["--spacing-4", "p-4", "1rem", "16px", 11.1],
                  ["--spacing-5", "p-5", "1.25rem", "20px", 13.9],
                  ["--spacing-6", "p-6", "1.5rem", "24px", 16.7],
                  ["--spacing-7", "p-7", "1.75rem", "28px", 19.4],
                  ["--spacing-8", "p-8", "2rem", "32px", 22.2],
                  ["--spacing-9", "p-9", "2.25rem", "36px", 25.0],
                  ["--spacing-10", "p-10", "2.5rem", "40px", 27.8],
                  ["--spacing-12", "p-12", "3rem", "48px", 33.3],
                  ["--spacing-14", "p-14", "3.5rem", "56px", 38.9],
                  ["--spacing-16", "p-16", "4rem", "64px", 44.4],
                  ["--spacing-20", "p-20", "5rem", "80px", 55.6],
                  ["--spacing-24", "p-24", "6rem", "96px", 66.7],
                  ["--spacing-28", "p-28", "7rem", "112px", 77.8],
                  ["--spacing-36", "p-36", "9rem", "144px", 100],
                ].map(([token, cls, val, px, pct]) => (
                  <tr key={token as string}>
                    <td className="tok-mono">{token}</td>
                    <td><code className="tok-mono" style={{ background: "var(--page-code-bg)", padding: "0.125rem 0.375rem", borderRadius: 4 }}>{cls}</code></td>
                    <td>{val} <span className="tok-dim">({px})</span></td>
                    <td style={{ width: "30%", paddingRight: "1.5rem" }}><div className="tok-spacing-bar" style={{ width: `${pct}%` }} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Border Radius */}
        <section>
          <div className="tok-section-header">
            <span className="tok-section-title">Border Radius</span>
            <span className="tok-section-subtitle">rounded-*</span>
          </div>
          <div className="tok-radius-grid">
            {[
              ["rounded-none", "0", "var(--radius-none)"],
              ["rounded-xs", "0.25rem", "var(--radius-xs)"],
              ["rounded-sm", "0.5rem", "var(--radius-sm)"],
              ["rounded-md", "0.75rem", "var(--radius-md)"],
              ["rounded-lg", "1rem", "var(--radius-lg)"],
              ["rounded-xl", "1.5rem", "var(--radius-xl)"],
              ["rounded-full", "100%", "var(--radius-full)"],
            ].map(([label, val, cssVar]) => (
              <div className="tok-radius-item" key={label as string}>
                <div className="tok-radius-box" style={{ borderRadius: cssVar as string }} />
                <div className="tok-radius-label">{label}<br />{val}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Shadows */}
        <section>
          <div className="tok-section-header">
            <span className="tok-section-title">Shadows</span>
            <span className="tok-section-subtitle">shadow-*</span>
          </div>
          <div className="tok-shadow-grid">
            {["xs", "sm", "md", "lg", "xl"].map((size) => (
              <div className="tok-shadow-item" key={size}>
                <div className="tok-shadow-box" style={{ boxShadow: `var(--shadow-${size})` }} />
                <div className="tok-shadow-label">shadow-{size}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Typography */}
        <section>
          <div className="tok-section-header">
            <span className="tok-section-title">Typography</span>
            <span className="tok-section-subtitle">text-* font sizes · leading-* line heights</span>
          </div>
          <div className="tok-table-wrap" style={{ overflowX: "auto" }}>
            <table className="tok-table">
              <thead><tr><th>Token</th><th>Value</th><th>Preview</th></tr></thead>
              <tbody>
                {[
                  ["display-lg", "3.5rem", "Aa", {}],
                  ["display-md", "3rem", "Aa", {}],
                  ["display-sm", "2.5rem", "Aa", {}],
                  ["headline-lg", "2.125rem", "Aa", {}],
                  ["headline-md", "1.75rem", "Aa", {}],
                  ["headline-sm", "1.5rem", "Aa", {}],
                  ["title-lg", "1.25rem", "The quick brown fox jumps over the lazy dog", {}],
                  ["title-md", "1.125rem", "The quick brown fox jumps over the lazy dog", {}],
                  ["title-sm", "0.875rem", "The quick brown fox jumps over the lazy dog", {}],
                  ["body-md", "1rem", "The quick brown fox jumps over the lazy dog", {}],
                  ["body-sm", "0.875rem", "The quick brown fox jumps over the lazy dog", {}],
                  ["body-xs", "0.75rem", "The quick brown fox jumps over the lazy dog", {}],
                  ["label-lg", "1rem", "Submit", { fontWeight: 500 }],
                  ["label-md", "0.875rem", "Submit", { fontWeight: 500 }],
                  ["label-sm", "0.75rem", "Submit", { fontWeight: 500 }],
                  ["caption-md", "0.75rem", "The quick brown fox jumps over the lazy dog", {}],
                  ["caption-sm", "0.688rem", "The quick brown fox jumps over the lazy dog", {}],
                  ["overline-md", "0.75rem", "Overline", { textTransform: "uppercase", letterSpacing: "0.08em", fontWeight: 600 }],
                  ["overline-sm", "0.625rem", "Overline", { textTransform: "uppercase", letterSpacing: "0.08em", fontWeight: 600 }],
                ].map(([token, val, text, extra]) => (
                  <tr key={token as string}>
                    <td>{token}</td>
                    <td>{val}</td>
                    <td><span className={`tok-type-preview ${token}`} style={{ ...(extra as object) }}>{text as string}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Breakpoints */}
        <section>
          <div className="tok-section-header">
            <span className="tok-section-title">Breakpoints</span>
            <span className="tok-section-subtitle">sm:* · md:* · lg:* — min-width responsive variants</span>
          </div>
          <div className="tok-table-wrap">
            <table className="tok-table">
              <thead><tr><th>Prefix</th><th>Token</th><th>Value</th><th>Pixels</th><th style={{ width: "35%" }}>Scale</th></tr></thead>
              <tbody>
                {[
                  ["xxs:", "--breakpoint-xxs", "23.5rem", "376px", 22],
                  ["xs:", "--breakpoint-xs", "36rem", "576px", 34],
                  ["sm:", "--breakpoint-sm", "48rem", "768px", 45],
                  ["md:", "--breakpoint-md", "62rem", "992px", 58],
                  ["lg:", "--breakpoint-lg", "75rem", "1200px", 71],
                  ["xl:", "--breakpoint-xl", "90rem", "1440px", 85],
                  ["2xl:", "--breakpoint-2xl", "106.25rem", "1700px", 100],
                ].map(([prefix, token, val, px, pct]) => (
                  <tr key={token as string}>
                    <td><code className="tok-mono" style={{ background: "var(--page-code-bg)", padding: "0.125rem 0.375rem", borderRadius: 4 }}>{prefix}</code></td>
                    <td>{token}</td>
                    <td>{val}</td>
                    <td className="tok-dim">{px}</td>
                    <td><div style={{ display: "flex" }}><div className="tok-bp-bar-wrap"><div className="tok-bp-bar" style={{ width: `${pct}%` }} /></div></div></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

      </div>
    </div>
  </>
);

Reference.storyName = "Reference";
