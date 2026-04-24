// Variation C — "Dashboard / Workbench"
// A two-column, tile-dense layout. Feels like a reference dashboard
// with sidebar browse + main workspace. For teachers who live in the
// TEKs vault daily and need scanning speed.

function VariationC() {
  const d = window.TEK_DATA;

  return (
    <div style={dashStyles.page}>
      {/* top bar */}
      <header style={dashStyles.topbar}>
        <div style={dashStyles.brand}>
          <span style={dashStyles.brandMark}>◆</span>
          Kaizen · TEKS
        </div>
        <div style={dashStyles.search}>
          <span style={dashStyles.searchIcon}>⌕</span>
          <span style={dashStyles.searchPlaceholder}>Jump to TEK, strand, keyword…</span>
          <span style={dashStyles.searchKbd}>/</span>
        </div>
        <div style={dashStyles.topbarRight}>
          <span style={dashStyles.topbarItem}>Browse</span>
          <span style={dashStyles.topbarItem}>Saved</span>
          <span style={dashStyles.topbarAvatar}>MB</span>
        </div>
      </header>

      <div style={dashStyles.body}>
        {/* SIDEBAR — course browser */}
        <aside style={dashStyles.sidebar}>
          <div style={dashStyles.sideSection}>
            <div style={dashStyles.sideLabel}>Course</div>
            <div style={dashStyles.courseList}>
              {[
                ['110.36', 'English I', 36, true],
                ['110.37', 'English II', 36, false],
                ['110.38', 'English III', 36, false],
                ['110.39', 'English IV', 36, false],
              ].map(([code, name, count, active]) => (
                <div key={code} style={active ? dashStyles.courseItemActive : dashStyles.courseItem}>
                  <span style={dashStyles.courseCode}>{code}</span>
                  <span style={dashStyles.courseName}>{name}</span>
                  <span style={dashStyles.courseCount}>{count}</span>
                </div>
              ))}
            </div>
          </div>

          <div style={dashStyles.sideSection}>
            <div style={dashStyles.sideLabel}>Strand · {d.strand}</div>
            <ul style={dashStyles.tekList}>
              {[
                ['1A', 'Engage in meaningful discourse', false],
                ['1B', d.title, true],
                ['1C', 'Give a formal presentation', false],
                ['1D', 'Participate collaboratively', false],
                ['1E', 'Use visual or digital media', false],
              ].map(([letter, title, active]) => (
                <li key={letter} style={active ? dashStyles.tekItemActive : dashStyles.tekItem}>
                  <span style={dashStyles.tekLetter}>{letter}</span>
                  <span style={dashStyles.tekTitle}>{title}</span>
                </li>
              ))}
            </ul>
          </div>

          <div style={dashStyles.sideFilter}>
            <div style={dashStyles.sideLabel}>Filter</div>
            <div style={dashStyles.chips}>
              {['All', 'DOK 1', 'DOK 2', 'DOK 3', 'DOK 4'].map((c, i) => (
                <span key={c} style={i === 3 ? dashStyles.chipActive : dashStyles.chip}>{c}</span>
              ))}
            </div>
          </div>
        </aside>

        {/* MAIN WORKSPACE */}
        <main style={dashStyles.main}>
          {/* header tile */}
          <section style={dashStyles.headerTile}>
            <div style={dashStyles.headerMeta}>
              <span style={dashStyles.codeChip}>{d.code}</span>
              <span style={dashStyles.metaDot}>·</span>
              <span>{d.course}</span>
              <span style={dashStyles.metaDot}>·</span>
              <span>{d.strand}</span>
              <span style={dashStyles.metaDot}>·</span>
              <span>{d.substrand}</span>
              <span style={{ flex: 1 }} />
              <span style={dashStyles.actionBtn}>Copy link</span>
              <span style={dashStyles.actionBtn}>Print one-pager</span>
              <span style={dashStyles.actionBtnPrimary}>Plan a lesson</span>
            </div>
            <h1 style={dashStyles.h1}>{d.title}</h1>
            <p style={dashStyles.expectation}>{d.expectation}</p>

            <div style={dashStyles.pillStrip}>
              <MetaPill label="DOK" value={`${d.dok} · Strategic`} />
              <MetaPill label="Bloom" value={d.bloom} />
              <MetaPill label="Cadence" value="Ongoing" />
              <MetaPill label="Strand" value="Foundational" />
              {d.tags.map((t) => (
                <MetaPill key={t} label="" value={t} muted />
              ))}
            </div>
          </section>

          {/* tile grid */}
          <section style={dashStyles.grid}>
            {/* Overview tile */}
            <div style={{ ...dashStyles.tile, gridColumn: 'span 6' }}>
              <TileHead num="01" title="Overview" />
              <p style={dashStyles.tileBody}>{d.overview}</p>
            </div>

            {/* Student-friendly tile */}
            <div style={{ ...dashStyles.tileAccent, gridColumn: 'span 6' }}>
              <TileHead num="02" title="Say it to a student" accent />
              <p style={dashStyles.tileBodyQuote}>{d.studentFriendly}</p>
            </div>

            {/* Question stems tile */}
            <div style={{ ...dashStyles.tile, gridColumn: 'span 7' }}>
              <TileHead num="03" title="Question stems" count={d.questionStems.length} />
              <div style={dashStyles.stemStack}>
                {d.questionStems.slice(0, 6).map((q, i) => (
                  <div key={i} style={dashStyles.stemLine}>
                    <span style={dashStyles.stemNum}>{String(i + 1).padStart(2, '0')}</span>
                    <span>{q}</span>
                  </div>
                ))}
                <div style={dashStyles.stemMore}>
                  + {d.questionStems.length - 6} more — click to expand
                </div>
              </div>
            </div>

            {/* Vertical alignment tile */}
            <div style={{ ...dashStyles.tile, gridColumn: 'span 5' }}>
              <TileHead num="04" title="Vertical alignment" />
              <div style={dashStyles.vAlign}>
                <VAlignRow label="Prior" code={d.verticalPrev} />
                <VAlignRow label="Current" code={`${d.code}`} active />
                <VAlignRow label="Next" code={d.verticalNext} />
              </div>

              <div style={dashStyles.subHead}>Related in strand</div>
              <div style={dashStyles.relatedList}>
                {d.related.map((r) => (
                  <div key={r} style={dashStyles.relatedLine}>
                    <span style={dashStyles.relatedCode}>{r}</span>
                    <span style={dashStyles.relatedArrow}>↗</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Misconceptions tile */}
            <div style={{ ...dashStyles.tile, gridColumn: 'span 12' }}>
              <TileHead num="05" title="Common misconceptions" count={d.misconceptions.length} />
              <div style={dashStyles.misconGrid}>
                {d.misconceptions.map((m, i) => (
                  <div key={i} style={dashStyles.misconCard}>
                    <div style={dashStyles.misconCardHead}>
                      <span style={dashStyles.misconCardNum}>{String(i + 1).padStart(2, '0')}</span>
                      <span style={dashStyles.misconCardTitle}>{m.title}</span>
                    </div>
                    <p style={dashStyles.misconCardBody}>{m.body}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

function TileHead({ num, title, count, accent }) {
  return (
    <div style={dashStyles.tileHead}>
      <span style={accent ? dashStyles.tileHeadNumAccent : dashStyles.tileHeadNum}>{num}</span>
      <span style={dashStyles.tileHeadTitle}>{title}</span>
      {count !== undefined && <span style={dashStyles.tileHeadCount}>{count}</span>}
    </div>
  );
}

function MetaPill({ label, value, muted }) {
  return (
    <span style={muted ? dashStyles.pillMuted : dashStyles.pill}>
      {label && <span style={dashStyles.pillLabel}>{label}</span>}
      <span style={dashStyles.pillValue}>{value}</span>
    </span>
  );
}

function VAlignRow({ label, code, active }) {
  return (
    <div style={active ? dashStyles.vRowActive : dashStyles.vRow}>
      <span style={dashStyles.vRowLabel}>{label}</span>
      <span style={dashStyles.vRowCode}>{code}</span>
    </div>
  );
}

const dashStyles = {
  page: {
    background: '#F6F2EC',
    color: '#1A1713',
    fontFamily: '"IBM Plex Sans", system-ui, sans-serif',
    minHeight: '100%',
    width: '100%',
  },
  topbar: {
    display: 'flex',
    alignItems: 'center',
    gap: 24,
    padding: '14px 28px',
    borderBottom: '1px solid rgba(26,23,19,0.1)',
    background: '#FFFDF7',
  },
  brand: {
    fontFamily: '"Source Serif 4", Georgia, serif',
    fontSize: 16,
    fontWeight: 500,
    display: 'flex',
    gap: 8,
    alignItems: 'center',
  },
  brandMark: { color: 'oklch(0.45 0.08 150)', fontSize: 14 },
  search: {
    flex: 1,
    maxWidth: 560,
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    padding: '8px 14px',
    background: '#F1ECE3',
    borderRadius: 2,
    border: '1px solid rgba(26,23,19,0.08)',
  },
  searchIcon: { fontSize: 14, color: '#8A7F73' },
  searchPlaceholder: { fontSize: 13, color: '#8A7F73', flex: 1 },
  searchKbd: {
    fontFamily: '"IBM Plex Mono", monospace',
    fontSize: 11,
    padding: '2px 6px',
    border: '1px solid rgba(26,23,19,0.15)',
    borderRadius: 2,
    color: '#6B5E3C',
  },
  topbarRight: { display: 'flex', alignItems: 'center', gap: 18 },
  topbarItem: { fontSize: 13, color: '#3C352D' },
  topbarAvatar: {
    fontFamily: '"IBM Plex Mono", monospace',
    fontSize: 11,
    width: 28,
    height: 28,
    borderRadius: '50%',
    background: 'oklch(0.45 0.08 150)',
    color: '#F6F2EC',
    display: 'grid',
    placeItems: 'center',
    fontWeight: 500,
  },

  body: { display: 'grid', gridTemplateColumns: '280px 1fr', minHeight: 'calc(100% - 57px)' },
  sidebar: {
    borderRight: '1px solid rgba(26,23,19,0.1)',
    padding: '28px 22px',
    background: '#F1ECE3',
  },
  sideSection: { marginBottom: 32 },
  sideLabel: {
    fontFamily: '"IBM Plex Mono", monospace',
    fontSize: 10,
    textTransform: 'uppercase',
    letterSpacing: '0.14em',
    color: '#8A7F73',
    marginBottom: 10,
  },
  courseList: { display: 'flex', flexDirection: 'column', gap: 2 },
  courseItem: {
    display: 'grid',
    gridTemplateColumns: '60px 1fr auto',
    alignItems: 'center',
    gap: 10,
    padding: '8px 10px',
    borderRadius: 2,
    fontSize: 13,
    color: '#3C352D',
  },
  courseItemActive: {
    display: 'grid',
    gridTemplateColumns: '60px 1fr auto',
    alignItems: 'center',
    gap: 10,
    padding: '8px 10px',
    borderRadius: 2,
    fontSize: 13,
    color: '#1A1713',
    background: '#FFFDF7',
    boxShadow: 'inset 2px 0 0 oklch(0.45 0.08 150)',
    fontWeight: 500,
  },
  courseCode: { fontFamily: '"IBM Plex Mono", monospace', fontSize: 11, color: '#8A7F73' },
  courseName: {},
  courseCount: { fontFamily: '"IBM Plex Mono", monospace', fontSize: 11, color: '#8A7F73' },
  tekList: { listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 2 },
  tekItem: {
    display: 'flex',
    gap: 10,
    padding: '8px 10px',
    fontSize: 13,
    color: '#3C352D',
    borderRadius: 2,
    lineHeight: 1.4,
  },
  tekItemActive: {
    display: 'flex',
    gap: 10,
    padding: '8px 10px',
    fontSize: 13,
    color: '#1A1713',
    background: '#FFFDF7',
    borderRadius: 2,
    boxShadow: 'inset 2px 0 0 oklch(0.45 0.08 150)',
    fontWeight: 500,
    lineHeight: 1.4,
  },
  tekLetter: {
    fontFamily: '"IBM Plex Mono", monospace',
    fontSize: 11,
    color: '#6B5E3C',
    width: 20,
    flexShrink: 0,
  },
  tekTitle: { textWrap: 'pretty' },
  sideFilter: {},
  chips: { display: 'flex', flexWrap: 'wrap', gap: 6 },
  chip: {
    fontFamily: '"IBM Plex Mono", monospace',
    fontSize: 10,
    padding: '4px 8px',
    background: '#FFFDF7',
    border: '1px solid rgba(26,23,19,0.1)',
    borderRadius: 2,
    color: '#3C352D',
  },
  chipActive: {
    fontFamily: '"IBM Plex Mono", monospace',
    fontSize: 10,
    padding: '4px 8px',
    background: 'oklch(0.45 0.08 150)',
    color: '#F6F2EC',
    borderRadius: 2,
  },

  main: { padding: '28px 36px 56px', minWidth: 0 },
  headerTile: {
    background: '#FFFDF7',
    padding: '28px 32px',
    borderRadius: 3,
    border: '1px solid rgba(26,23,19,0.08)',
    marginBottom: 20,
  },
  headerMeta: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    fontFamily: '"IBM Plex Mono", monospace',
    fontSize: 11,
    textTransform: 'uppercase',
    letterSpacing: '0.1em',
    color: '#6B5E3C',
    marginBottom: 16,
  },
  codeChip: {
    padding: '3px 8px',
    background: '#1A1713',
    color: '#F6F2EC',
    borderRadius: 2,
    fontSize: 11,
  },
  metaDot: { opacity: 0.4 },
  actionBtn: {
    fontFamily: '"IBM Plex Sans", sans-serif',
    textTransform: 'none',
    letterSpacing: 0,
    fontSize: 12,
    padding: '5px 10px',
    border: '1px solid rgba(26,23,19,0.15)',
    borderRadius: 2,
    color: '#3C352D',
    cursor: 'pointer',
    background: '#FFFDF7',
  },
  actionBtnPrimary: {
    fontFamily: '"IBM Plex Sans", sans-serif',
    textTransform: 'none',
    letterSpacing: 0,
    fontSize: 12,
    padding: '5px 10px',
    background: 'oklch(0.45 0.08 150)',
    color: '#F6F2EC',
    borderRadius: 2,
    cursor: 'pointer',
    fontWeight: 500,
  },
  h1: {
    fontFamily: '"Source Serif 4", Georgia, serif',
    fontSize: 34,
    lineHeight: 1.1,
    fontWeight: 500,
    letterSpacing: '-0.02em',
    margin: 0,
    marginBottom: 12,
    textWrap: 'balance',
  },
  expectation: {
    margin: 0,
    fontFamily: '"Source Serif 4", Georgia, serif',
    fontSize: 17,
    lineHeight: 1.55,
    color: '#3C352D',
    fontStyle: 'italic',
    maxWidth: 720,
    textWrap: 'pretty',
  },
  pillStrip: { display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 22 },
  pill: {
    display: 'inline-flex',
    gap: 6,
    padding: '4px 10px',
    background: '#F1ECE3',
    borderRadius: 2,
    fontSize: 11.5,
    fontFamily: '"IBM Plex Mono", monospace',
  },
  pillMuted: {
    display: 'inline-flex',
    gap: 6,
    padding: '4px 10px',
    background: 'transparent',
    border: '1px solid rgba(26,23,19,0.12)',
    borderRadius: 2,
    fontSize: 11.5,
    fontFamily: '"IBM Plex Mono", monospace',
    color: '#6B5E3C',
  },
  pillLabel: { color: '#8A7F73', textTransform: 'uppercase', letterSpacing: '0.1em' },
  pillValue: { color: '#1A1713' },

  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(12, 1fr)',
    gap: 16,
  },
  tile: {
    background: '#FFFDF7',
    padding: '22px 26px',
    borderRadius: 3,
    border: '1px solid rgba(26,23,19,0.08)',
    minWidth: 0,
  },
  tileAccent: {
    background: '#1A1713',
    color: '#F6F2EC',
    padding: '22px 26px',
    borderRadius: 3,
    minWidth: 0,
  },
  tileHead: {
    display: 'flex',
    alignItems: 'baseline',
    gap: 10,
    marginBottom: 14,
  },
  tileHeadNum: {
    fontFamily: '"IBM Plex Mono", monospace',
    fontSize: 10,
    color: '#8A7F73',
    letterSpacing: '0.1em',
  },
  tileHeadNumAccent: {
    fontFamily: '"IBM Plex Mono", monospace',
    fontSize: 10,
    color: 'oklch(0.7 0.08 150)',
    letterSpacing: '0.1em',
  },
  tileHeadTitle: {
    fontFamily: '"Source Serif 4", Georgia, serif',
    fontSize: 16,
    fontWeight: 500,
    letterSpacing: '-0.01em',
  },
  tileHeadCount: {
    fontFamily: '"IBM Plex Mono", monospace',
    fontSize: 10,
    color: '#8A7F73',
    marginLeft: 'auto',
  },
  tileBody: {
    margin: 0,
    fontFamily: '"Source Serif 4", Georgia, serif',
    fontSize: 15,
    lineHeight: 1.6,
    color: '#2A241E',
    textWrap: 'pretty',
  },
  tileBodyQuote: {
    margin: 0,
    fontFamily: '"Source Serif 4", Georgia, serif',
    fontSize: 17,
    lineHeight: 1.55,
    color: '#F1ECE3',
    textWrap: 'pretty',
    fontStyle: 'italic',
  },
  stemStack: { display: 'flex', flexDirection: 'column' },
  stemLine: {
    display: 'flex',
    gap: 12,
    padding: '9px 0',
    borderBottom: '1px dotted rgba(26,23,19,0.12)',
    fontSize: 13.5,
    lineHeight: 1.45,
    color: '#2A241E',
  },
  stemNum: {
    fontFamily: '"IBM Plex Mono", monospace',
    fontSize: 11,
    color: '#8A7F73',
    flexShrink: 0,
    paddingTop: 1,
  },
  stemMore: {
    padding: '10px 0 0',
    fontFamily: '"IBM Plex Mono", monospace',
    fontSize: 11,
    color: 'oklch(0.45 0.08 150)',
    textTransform: 'uppercase',
    letterSpacing: '0.12em',
  },
  vAlign: { display: 'flex', flexDirection: 'column', gap: 4 },
  vRow: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '10px 12px',
    background: '#F1ECE3',
    borderRadius: 2,
    fontSize: 12,
  },
  vRowActive: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '10px 12px',
    background: 'oklch(0.45 0.08 150)',
    color: '#F6F2EC',
    borderRadius: 2,
    fontSize: 12,
  },
  vRowLabel: {
    fontFamily: '"IBM Plex Mono", monospace',
    textTransform: 'uppercase',
    letterSpacing: '0.12em',
    fontSize: 10,
    opacity: 0.75,
  },
  vRowCode: { fontFamily: '"IBM Plex Mono", monospace', fontSize: 11 },
  subHead: {
    fontFamily: '"IBM Plex Mono", monospace',
    fontSize: 10,
    textTransform: 'uppercase',
    letterSpacing: '0.14em',
    color: '#8A7F73',
    marginTop: 18,
    marginBottom: 8,
  },
  relatedList: { display: 'flex', flexDirection: 'column', gap: 2 },
  relatedLine: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '8px 12px',
    background: '#F1ECE3',
    borderRadius: 2,
    fontSize: 12,
  },
  relatedCode: { fontFamily: '"IBM Plex Mono", monospace', color: '#3C352D' },
  relatedArrow: { color: '#8A7F73', fontSize: 12 },
  misconGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(5, 1fr)',
    gap: 12,
  },
  misconCard: {
    padding: '16px 18px',
    background: '#F1ECE3',
    borderRadius: 3,
    borderTop: '2px solid oklch(0.45 0.08 150)',
  },
  misconCardHead: {
    display: 'flex',
    gap: 8,
    alignItems: 'baseline',
    marginBottom: 8,
  },
  misconCardNum: {
    fontFamily: '"IBM Plex Mono", monospace',
    fontSize: 11,
    color: 'oklch(0.45 0.08 150)',
    fontWeight: 500,
  },
  misconCardTitle: {
    fontFamily: '"Source Serif 4", Georgia, serif',
    fontSize: 14,
    fontWeight: 500,
    lineHeight: 1.3,
    color: '#1A1713',
  },
  misconCardBody: {
    margin: 0,
    fontSize: 12.5,
    lineHeight: 1.55,
    color: '#3C352D',
    textWrap: 'pretty',
  },
};

window.VariationC = VariationC;
