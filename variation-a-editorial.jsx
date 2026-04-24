// Variation A — "Editorial Index"
// Two-column reference layout. Left rail = sticky standard/strand/code + nav.
// Right column = long-form reading. Serif-forward, textbook feel.

function VariationA() {
  const d = window.TEK_DATA;
  return (
    <div style={editorialStyles.page}>
      {/* breadcrumb ribbon */}
      <div style={editorialStyles.ribbon}>
        <span style={editorialStyles.ribbonMono}>{d.courseCode}</span>
        <span style={editorialStyles.ribbonDivider}>·</span>
        <span>{d.course}</span>
        <span style={editorialStyles.ribbonDivider}>·</span>
        <span>{d.strand}</span>
        <span style={editorialStyles.ribbonDivider}>·</span>
        <span>{d.substrand}</span>
        <span style={{ flex: 1 }} />
        <span style={editorialStyles.ribbonMono}>TEK {d.code}</span>
      </div>

      <div style={editorialStyles.body}>
        {/* LEFT RAIL */}
        <aside style={editorialStyles.rail}>
          <div style={editorialStyles.railEyebrow}>Expectation</div>
          <div style={editorialStyles.railCode}>{d.code}</div>
          <div style={editorialStyles.railStandard}>{d.standard}</div>

          <div style={editorialStyles.railDivider} />

          <div style={editorialStyles.railEyebrow}>On this page</div>
          <ol style={editorialStyles.toc}>
            {[
              'Expectation',
              'Overview',
              'In student words',
              'Question stems',
              'Common misconceptions',
              'Vertical alignment',
            ].map((t, i) => (
              <li key={i} style={editorialStyles.tocItem}>
                <span style={editorialStyles.tocNum}>
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span>{t}</span>
              </li>
            ))}
          </ol>

          <div style={editorialStyles.railDivider} />

          <div style={editorialStyles.metaGrid}>
            <div>
              <div style={editorialStyles.metaLabel}>DOK</div>
              <div style={editorialStyles.metaValue}>{d.dok} · Strategic</div>
            </div>
            <div>
              <div style={editorialStyles.metaLabel}>Bloom</div>
              <div style={editorialStyles.metaValue}>{d.bloom}</div>
            </div>
            <div>
              <div style={editorialStyles.metaLabel}>Cadence</div>
              <div style={editorialStyles.metaValue}>{d.estimatedTime}</div>
            </div>
            <div>
              <div style={editorialStyles.metaLabel}>Related</div>
              <div style={editorialStyles.metaValue}>
                {d.related.map((r) => r.match(/\([A-Z]\)/)[0]).join(' · ')}
              </div>
            </div>
          </div>

          <div style={editorialStyles.railDivider} />

          <div style={editorialStyles.navBlock}>
            <div style={editorialStyles.navRow}>
              <span style={editorialStyles.navArrow}>←</span>
              <div>
                <div style={editorialStyles.navTiny}>Previous</div>
                <div style={editorialStyles.navCode}>110.36(1)(A)</div>
              </div>
            </div>
            <div style={editorialStyles.navRow}>
              <div style={{ textAlign: 'right', flex: 1 }}>
                <div style={editorialStyles.navTiny}>Next</div>
                <div style={editorialStyles.navCode}>110.36(1)(C)</div>
              </div>
              <span style={editorialStyles.navArrow}>→</span>
            </div>
          </div>
        </aside>

        {/* RIGHT — reading column */}
        <article style={editorialStyles.article}>
          <div style={editorialStyles.eyebrow}>Student expectation</div>
          <h1 style={editorialStyles.h1}>{d.title}</h1>
          <p style={editorialStyles.expectation}>{d.expectation}</p>

          <section style={editorialStyles.section}>
            <h2 style={editorialStyles.h2}>
              <span style={editorialStyles.h2Num}>01</span>
              Overview
            </h2>
            <p style={editorialStyles.lede}>{d.overview}</p>
          </section>

          <section style={editorialStyles.section}>
            <h2 style={editorialStyles.h2}>
              <span style={editorialStyles.h2Num}>02</span>
              In student words
            </h2>
            <blockquote style={editorialStyles.pullquote}>
              {d.studentFriendly}
            </blockquote>
          </section>

          <section style={editorialStyles.section}>
            <h2 style={editorialStyles.h2}>
              <span style={editorialStyles.h2Num}>03</span>
              Question stems
              <span style={editorialStyles.h2Count}>{d.questionStems.length}</span>
            </h2>
            <ol style={editorialStyles.stemList}>
              {d.questionStems.map((q, i) => (
                <li key={i} style={editorialStyles.stemItem}>
                  <span style={editorialStyles.stemNum}>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span>{q}</span>
                </li>
              ))}
            </ol>
          </section>

          <section style={editorialStyles.section}>
            <h2 style={editorialStyles.h2}>
              <span style={editorialStyles.h2Num}>04</span>
              Common misconceptions
            </h2>
            {d.misconceptions.map((m, i) => (
              <div key={i} style={editorialStyles.misc}>
                <div style={editorialStyles.miscHeader}>
                  <span style={editorialStyles.miscX}>✕</span>
                  <div style={editorialStyles.miscTitle}>{m.title}</div>
                </div>
                <p style={editorialStyles.miscBody}>
                  {highlightText(m.body, m.highlight, editorialStyles.highlight)}
                </p>
              </div>
            ))}
          </section>

          <section style={editorialStyles.section}>
            <h2 style={editorialStyles.h2}>
              <span style={editorialStyles.h2Num}>05</span>
              Vertical alignment
            </h2>
            <div style={editorialStyles.verticalRow}>
              <div style={editorialStyles.vCell}>
                <div style={editorialStyles.vLabel}>Prior grade</div>
                <div style={editorialStyles.vCode}>{d.verticalPrev}</div>
              </div>
              <div style={editorialStyles.vCellActive}>
                <div style={editorialStyles.vLabel}>This TEK</div>
                <div style={editorialStyles.vCode}>{d.code} · {d.course}</div>
              </div>
              <div style={editorialStyles.vCell}>
                <div style={editorialStyles.vLabel}>Next grade</div>
                <div style={editorialStyles.vCode}>{d.verticalNext}</div>
              </div>
            </div>
          </section>
        </article>
      </div>
    </div>
  );
}

// utility — wrap highlighted phrases in a span
function highlightText(body, phrases, hlStyle) {
  if (!phrases || !phrases.length) return body;
  const parts = [body];
  phrases.forEach((p) => {
    for (let i = 0; i < parts.length; i++) {
      if (typeof parts[i] !== 'string') continue;
      const idx = parts[i].toLowerCase().indexOf(p.toLowerCase());
      if (idx === -1) continue;
      const before = parts[i].slice(0, idx);
      const match = parts[i].slice(idx, idx + p.length);
      const after = parts[i].slice(idx + p.length);
      parts.splice(i, 1, before, <mark key={p + i} style={hlStyle}>{match}</mark>, after);
      i += 2;
    }
  });
  return parts;
}

const editorialStyles = {
  page: {
    background: '#F6F2EC',
    color: '#1A1713',
    fontFamily: '"IBM Plex Sans", system-ui, sans-serif',
    minHeight: '100%',
    width: '100%',
  },
  ribbon: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    padding: '16px 56px',
    fontSize: 12,
    fontWeight: 500,
    letterSpacing: '0.04em',
    textTransform: 'uppercase',
    color: '#5A5148',
    borderBottom: '1px solid rgba(26,23,19,0.08)',
    background: '#F1ECE3',
  },
  ribbonMono: { fontFamily: '"IBM Plex Mono", monospace', fontSize: 11 },
  ribbonDivider: { opacity: 0.4 },
  body: {
    display: 'grid',
    gridTemplateColumns: '280px 1fr',
    gap: 64,
    padding: '56px 56px 96px',
    maxWidth: 1280,
  },
  rail: {
    position: 'sticky',
    top: 32,
    alignSelf: 'start',
    fontSize: 13,
    color: '#3C352D',
  },
  railEyebrow: {
    fontFamily: '"IBM Plex Mono", monospace',
    fontSize: 10,
    textTransform: 'uppercase',
    letterSpacing: '0.14em',
    color: '#8A7F73',
    marginBottom: 10,
  },
  railCode: {
    fontFamily: '"Source Serif 4", Georgia, serif',
    fontSize: 30,
    fontWeight: 500,
    letterSpacing: '-0.02em',
    color: '#1A1713',
    marginBottom: 10,
  },
  railStandard: {
    fontSize: 13,
    lineHeight: 1.5,
    color: '#4A4138',
    fontStyle: 'italic',
  },
  railDivider: {
    height: 1,
    background: 'rgba(26,23,19,0.1)',
    margin: '24px 0',
  },
  toc: { listStyle: 'none', padding: 0, margin: 0 },
  tocItem: {
    display: 'flex',
    gap: 12,
    padding: '6px 0',
    fontSize: 13,
    color: '#3C352D',
  },
  tocNum: {
    fontFamily: '"IBM Plex Mono", monospace',
    fontSize: 11,
    color: '#8A7F73',
    width: 22,
  },
  metaGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '16px 20px',
  },
  metaLabel: {
    fontFamily: '"IBM Plex Mono", monospace',
    fontSize: 10,
    textTransform: 'uppercase',
    letterSpacing: '0.12em',
    color: '#8A7F73',
    marginBottom: 4,
  },
  metaValue: { fontSize: 13, color: '#1A1713', fontWeight: 500 },
  navBlock: { display: 'flex', flexDirection: 'column', gap: 12 },
  navRow: {
    display: 'flex',
    gap: 12,
    alignItems: 'center',
    padding: '12px 14px',
    background: '#EDE6D9',
    borderRadius: 2,
    fontSize: 12,
  },
  navArrow: { fontSize: 16, color: '#3C352D' },
  navTiny: {
    fontFamily: '"IBM Plex Mono", monospace',
    fontSize: 9,
    textTransform: 'uppercase',
    letterSpacing: '0.14em',
    color: '#8A7F73',
  },
  navCode: { fontFamily: '"IBM Plex Mono", monospace', fontSize: 12, color: '#1A1713' },

  article: { maxWidth: 720, paddingTop: 0 },
  eyebrow: {
    fontFamily: '"IBM Plex Mono", monospace',
    fontSize: 11,
    textTransform: 'uppercase',
    letterSpacing: '0.14em',
    color: '#6B5E3C', // muted green
    marginBottom: 16,
  },
  h1: {
    fontFamily: '"Source Serif 4", Georgia, serif',
    fontSize: 44,
    lineHeight: 1.08,
    fontWeight: 500,
    letterSpacing: '-0.02em',
    margin: 0,
    textWrap: 'balance',
  },
  expectation: {
    marginTop: 20,
    fontFamily: '"Source Serif 4", Georgia, serif',
    fontSize: 20,
    lineHeight: 1.5,
    color: '#3C352D',
    paddingLeft: 20,
    borderLeft: '2px solid oklch(0.45 0.08 150)',
    fontStyle: 'italic',
  },
  section: { marginTop: 56 },
  h2: {
    fontFamily: '"Source Serif 4", Georgia, serif',
    fontSize: 22,
    fontWeight: 500,
    letterSpacing: '-0.01em',
    margin: 0,
    marginBottom: 20,
    display: 'flex',
    alignItems: 'baseline',
    gap: 14,
    borderBottom: '1px solid rgba(26,23,19,0.12)',
    paddingBottom: 10,
  },
  h2Num: {
    fontFamily: '"IBM Plex Mono", monospace',
    fontSize: 11,
    color: '#8A7F73',
    fontWeight: 400,
  },
  h2Count: {
    fontFamily: '"IBM Plex Mono", monospace',
    fontSize: 11,
    color: '#8A7F73',
    fontWeight: 400,
    marginLeft: 'auto',
  },
  lede: {
    fontFamily: '"Source Serif 4", Georgia, serif',
    fontSize: 17,
    lineHeight: 1.65,
    color: '#2A241E',
    margin: 0,
    textWrap: 'pretty',
  },
  pullquote: {
    margin: 0,
    padding: '24px 28px',
    background: '#EDE6D9',
    fontFamily: '"Source Serif 4", Georgia, serif',
    fontSize: 18,
    lineHeight: 1.6,
    color: '#2A241E',
    position: 'relative',
    textWrap: 'pretty',
  },
  stemList: {
    listStyle: 'none',
    padding: 0,
    margin: 0,
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    columnGap: 24,
  },
  stemItem: {
    display: 'flex',
    gap: 12,
    padding: '10px 0',
    borderBottom: '1px dotted rgba(26,23,19,0.15)',
    fontSize: 14,
    lineHeight: 1.5,
    color: '#2A241E',
  },
  stemNum: {
    fontFamily: '"IBM Plex Mono", monospace',
    fontSize: 11,
    color: '#8A7F73',
    flexShrink: 0,
    paddingTop: 2,
  },
  misc: {
    padding: '18px 0',
    borderBottom: '1px solid rgba(26,23,19,0.08)',
  },
  miscHeader: {
    display: 'flex',
    gap: 10,
    alignItems: 'baseline',
    marginBottom: 6,
  },
  miscX: {
    fontFamily: '"IBM Plex Mono", monospace',
    fontSize: 11,
    color: '#A24B2F',
  },
  miscTitle: {
    fontFamily: '"Source Serif 4", Georgia, serif',
    fontSize: 17,
    fontWeight: 500,
    color: '#1A1713',
  },
  miscBody: {
    margin: 0,
    marginLeft: 21,
    fontSize: 14,
    lineHeight: 1.6,
    color: '#3C352D',
    textWrap: 'pretty',
  },
  highlight: {
    background: 'transparent',
    color: 'oklch(0.45 0.08 150)',
    fontWeight: 600,
  },
  verticalRow: { display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12 },
  vCell: {
    padding: '16px 18px',
    background: '#EDE6D9',
    borderRadius: 2,
  },
  vCellActive: {
    padding: '16px 18px',
    background: 'oklch(0.45 0.08 150)',
    color: '#F6F2EC',
    borderRadius: 2,
  },
  vLabel: {
    fontFamily: '"IBM Plex Mono", monospace',
    fontSize: 10,
    textTransform: 'uppercase',
    letterSpacing: '0.12em',
    opacity: 0.7,
    marginBottom: 6,
  },
  vCode: { fontFamily: '"IBM Plex Mono", monospace', fontSize: 12 },
};

window.VariationA = VariationA;
