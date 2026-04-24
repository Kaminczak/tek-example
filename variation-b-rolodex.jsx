// Variation B — "Index Card / Rolodex Flip"
// A single card on a felt-like surface, with arrow navigation between
// tabbed facets (Overview / Stems / Misconceptions / Connections).
// The point of this one is the rolodex METAPHOR — tactile, one-at-a-time.

function VariationB() {
  const d = window.TEK_DATA;
  const [tab, setTab] = React.useState(0);
  const tabs = ['Overview', 'Question Stems', 'Misconceptions', 'Connections'];

  return (
    <div style={rolodexStyles.page}>
      {/* Top chrome: like a card box */}
      <div style={rolodexStyles.boxLip}>
        <div style={rolodexStyles.boxLipInner}>
          <span style={rolodexStyles.boxTitle}>TEKS · English</span>
          <span style={rolodexStyles.boxCount}>
            <span style={{ color: '#1A1713' }}>047</span> of 312
          </span>
        </div>
      </div>

      <div style={rolodexStyles.stage}>
        {/* Peek of card behind */}
        <div style={{ ...rolodexStyles.cardShadow, top: 24, left: 10, transform: 'rotate(-1.5deg)' }} />
        <div style={{ ...rolodexStyles.cardShadow, top: 14, left: 4, transform: 'rotate(0.8deg)' }} />

        <article style={rolodexStyles.card}>
          {/* punched hole at top */}
          <div style={rolodexStyles.hole} />

          {/* header */}
          <header style={rolodexStyles.cardHeader}>
            <div>
              <div style={rolodexStyles.courseTag}>{d.course} · {d.strand}</div>
              <div style={rolodexStyles.cardCode}>{d.code}</div>
            </div>
            <div style={rolodexStyles.badgeCol}>
              <span style={rolodexStyles.dokBadge}>DOK {d.dok}</span>
              <span style={rolodexStyles.bloomBadge}>{d.bloom}</span>
            </div>
          </header>

          <h1 style={rolodexStyles.title}>{d.title}</h1>

          <div style={rolodexStyles.expectationBlock}>
            <span style={rolodexStyles.expectLabel}>Expectation</span>
            <p style={rolodexStyles.expectBody}>{d.expectation}</p>
          </div>

          {/* tab strip */}
          <div style={rolodexStyles.tabs}>
            {tabs.map((t, i) => (
              <button
                key={t}
                onClick={() => setTab(i)}
                style={i === tab ? rolodexStyles.tabActive : rolodexStyles.tab}
              >
                <span style={rolodexStyles.tabNum}>
                  {String(i + 1).padStart(2, '0')}
                </span>
                {t}
              </button>
            ))}
          </div>

          <div style={rolodexStyles.tabBody}>
            {tab === 0 && <OverviewTab d={d} />}
            {tab === 1 && <StemsTab d={d} />}
            {tab === 2 && <MisconTab d={d} />}
            {tab === 3 && <ConnectionsTab d={d} />}
          </div>
        </article>

        {/* arrow buttons */}
        <button style={{ ...rolodexStyles.arrow, left: -72 }}>
          <span style={rolodexStyles.arrowGlyph}>‹</span>
          <span style={rolodexStyles.arrowLabel}>A</span>
        </button>
        <button style={{ ...rolodexStyles.arrow, right: -72 }}>
          <span style={rolodexStyles.arrowGlyph}>›</span>
          <span style={rolodexStyles.arrowLabel}>C</span>
        </button>
      </div>

      <div style={rolodexStyles.legend}>
        <span>← / → flip cards</span>
        <span style={rolodexStyles.legendDot}>·</span>
        <span>1–4 jump tabs</span>
        <span style={rolodexStyles.legendDot}>·</span>
        <span>/ search</span>
      </div>
    </div>
  );
}

function OverviewTab({ d }) {
  return (
    <div>
      <div style={rolodexStyles.twoCol}>
        <div>
          <div style={rolodexStyles.sectionLabel}>For teachers</div>
          <p style={rolodexStyles.para}>{d.overview}</p>
        </div>
        <div>
          <div style={rolodexStyles.sectionLabel}>For students</div>
          <p style={rolodexStyles.paraQuote}>"{d.studentFriendly}"</p>
        </div>
      </div>

      <div style={rolodexStyles.statStrip}>
        <Stat label="Question stems" value={d.questionStems.length} />
        <Stat label="Misconceptions" value={d.misconceptions.length} />
        <Stat label="Cadence" value="Ongoing" small />
        <Stat label="DOK" value={d.dok} />
      </div>
    </div>
  );
}

function Stat({ label, value, small }) {
  return (
    <div style={rolodexStyles.stat}>
      <div style={small ? rolodexStyles.statValSmall : rolodexStyles.statVal}>
        {value}
      </div>
      <div style={rolodexStyles.statLabel}>{label}</div>
    </div>
  );
}

function StemsTab({ d }) {
  return (
    <div>
      <div style={rolodexStyles.sectionLabel}>{d.questionStems.length} question stems</div>
      <ol style={rolodexStyles.stemGrid}>
        {d.questionStems.map((q, i) => (
          <li key={i} style={rolodexStyles.stemCard}>
            <span style={rolodexStyles.stemCardNum}>{String(i + 1).padStart(2, '0')}</span>
            <span style={rolodexStyles.stemCardText}>{q}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}

function MisconTab({ d }) {
  return (
    <div>
      <div style={rolodexStyles.sectionLabel}>{d.misconceptions.length} common misconceptions</div>
      {d.misconceptions.map((m, i) => (
        <div key={i} style={rolodexStyles.misconRow}>
          <div style={rolodexStyles.misconNum}>{String(i + 1).padStart(2, '0')}</div>
          <div>
            <div style={rolodexStyles.misconTitle}>
              <span style={rolodexStyles.misconStrike}>{m.title}</span>
            </div>
            <p style={rolodexStyles.misconBody}>{m.body}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

function ConnectionsTab({ d }) {
  return (
    <div>
      <div style={rolodexStyles.sectionLabel}>Vertical alignment</div>
      <div style={rolodexStyles.tracks}>
        <TrackItem code={d.verticalPrev} note="Prior grade" dim />
        <TrackItem code={`${d.code} · ${d.course}`} note="This TEK" active />
        <TrackItem code={d.verticalNext} note="Next grade" dim />
      </div>

      <div style={{ ...rolodexStyles.sectionLabel, marginTop: 32 }}>Within this strand</div>
      <div style={rolodexStyles.relatedRow}>
        {d.related.map((r, i) => (
          <div key={i} style={rolodexStyles.relatedChip}>
            <span style={rolodexStyles.chipCode}>{r}</span>
            <span style={rolodexStyles.chipLabel}>
              {['Effective listening', 'Discussion — collaborative', 'Discussion — formal'][i]}
            </span>
          </div>
        ))}
      </div>

      <div style={{ ...rolodexStyles.sectionLabel, marginTop: 32 }}>Tags</div>
      <div style={rolodexStyles.tagRow}>
        {d.tags.map((t) => (
          <span key={t} style={rolodexStyles.tag}>{t}</span>
        ))}
      </div>
    </div>
  );
}

function TrackItem({ code, note, active, dim }) {
  const base = { ...rolodexStyles.trackItem };
  if (active) Object.assign(base, rolodexStyles.trackItemActive);
  if (dim) Object.assign(base, rolodexStyles.trackItemDim);
  return (
    <div style={base}>
      <div style={rolodexStyles.trackNote}>{note}</div>
      <div style={rolodexStyles.trackCode}>{code}</div>
    </div>
  );
}

const rolodexStyles = {
  page: {
    background: '#E4DED1', // felt/desktop tone
    color: '#1A1713',
    fontFamily: '"IBM Plex Sans", system-ui, sans-serif',
    minHeight: '100%',
    width: '100%',
    padding: '36px 0 48px',
    backgroundImage:
      'radial-gradient(circle at 20% 10%, rgba(0,0,0,0.04) 0%, transparent 50%), radial-gradient(circle at 80% 90%, rgba(0,0,0,0.05) 0%, transparent 55%)',
  },
  boxLip: {
    maxWidth: 840,
    margin: '0 auto',
    padding: '0 16px',
  },
  boxLipInner: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '14px 28px',
    background: '#1A1713',
    color: '#E4DED1',
    fontFamily: '"IBM Plex Mono", monospace',
    fontSize: 11,
    textTransform: 'uppercase',
    letterSpacing: '0.16em',
    borderRadius: '6px 6px 0 0',
  },
  boxTitle: { fontWeight: 500 },
  boxCount: { opacity: 0.8 },
  stage: {
    position: 'relative',
    maxWidth: 840,
    margin: '0 auto',
    padding: '0 16px',
  },
  cardShadow: {
    position: 'absolute',
    inset: 0,
    background: '#F6F2EC',
    borderRadius: 6,
    boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
  },
  card: {
    position: 'relative',
    background: '#F6F2EC',
    padding: '52px 56px 48px',
    borderRadius: 6,
    boxShadow: '0 12px 40px rgba(26,23,19,0.16), 0 2px 6px rgba(26,23,19,0.08)',
  },
  hole: {
    position: 'absolute',
    top: 22,
    left: '50%',
    transform: 'translateX(-50%)',
    width: 28,
    height: 8,
    borderRadius: 4,
    background: '#1A1713',
    boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.4)',
  },
  cardHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingBottom: 24,
    borderBottom: '1px solid rgba(26,23,19,0.1)',
  },
  courseTag: {
    fontFamily: '"IBM Plex Mono", monospace',
    fontSize: 11,
    textTransform: 'uppercase',
    letterSpacing: '0.14em',
    color: '#6B5E3C',
    marginBottom: 6,
  },
  cardCode: {
    fontFamily: '"Source Serif 4", Georgia, serif',
    fontSize: 38,
    fontWeight: 500,
    letterSpacing: '-0.02em',
  },
  badgeCol: { display: 'flex', flexDirection: 'column', gap: 6, alignItems: 'flex-end' },
  dokBadge: {
    fontFamily: '"IBM Plex Mono", monospace',
    fontSize: 11,
    letterSpacing: '0.1em',
    padding: '4px 10px',
    background: 'oklch(0.45 0.08 150)',
    color: '#F6F2EC',
    borderRadius: 2,
  },
  bloomBadge: {
    fontFamily: '"IBM Plex Mono", monospace',
    fontSize: 11,
    letterSpacing: '0.1em',
    padding: '4px 10px',
    border: '1px solid rgba(26,23,19,0.2)',
    color: '#3C352D',
    borderRadius: 2,
  },
  title: {
    fontFamily: '"Source Serif 4", Georgia, serif',
    fontSize: 36,
    lineHeight: 1.12,
    fontWeight: 500,
    letterSpacing: '-0.02em',
    margin: '24px 0 18px',
    textWrap: 'balance',
  },
  expectationBlock: {
    display: 'flex',
    gap: 20,
    padding: '18px 0 24px',
    borderBottom: '1px solid rgba(26,23,19,0.1)',
  },
  expectLabel: {
    fontFamily: '"IBM Plex Mono", monospace',
    fontSize: 10,
    textTransform: 'uppercase',
    letterSpacing: '0.14em',
    color: '#8A7F73',
    flexShrink: 0,
    width: 90,
    paddingTop: 4,
  },
  expectBody: {
    margin: 0,
    fontFamily: '"Source Serif 4", Georgia, serif',
    fontSize: 17,
    lineHeight: 1.5,
    color: '#2A241E',
    fontStyle: 'italic',
  },
  tabs: {
    display: 'flex',
    gap: 4,
    marginTop: 28,
    borderBottom: '1px solid rgba(26,23,19,0.1)',
  },
  tab: {
    display: 'inline-flex',
    gap: 8,
    alignItems: 'baseline',
    padding: '12px 16px',
    background: 'transparent',
    border: 'none',
    borderBottom: '2px solid transparent',
    fontFamily: '"IBM Plex Sans", sans-serif',
    fontSize: 13,
    fontWeight: 500,
    color: '#6B5E3C',
    cursor: 'pointer',
    marginBottom: -1,
  },
  tabActive: {
    display: 'inline-flex',
    gap: 8,
    alignItems: 'baseline',
    padding: '12px 16px',
    background: 'transparent',
    border: 'none',
    borderBottom: '2px solid oklch(0.45 0.08 150)',
    fontFamily: '"IBM Plex Sans", sans-serif',
    fontSize: 13,
    fontWeight: 600,
    color: '#1A1713',
    cursor: 'pointer',
    marginBottom: -1,
  },
  tabNum: {
    fontFamily: '"IBM Plex Mono", monospace',
    fontSize: 10,
    opacity: 0.6,
  },
  tabBody: { paddingTop: 28, minHeight: 300 },
  sectionLabel: {
    fontFamily: '"IBM Plex Mono", monospace',
    fontSize: 10,
    textTransform: 'uppercase',
    letterSpacing: '0.14em',
    color: '#8A7F73',
    marginBottom: 12,
  },
  twoCol: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: 36,
  },
  para: {
    margin: 0,
    fontFamily: '"Source Serif 4", Georgia, serif',
    fontSize: 16,
    lineHeight: 1.6,
    color: '#2A241E',
    textWrap: 'pretty',
  },
  paraQuote: {
    margin: 0,
    padding: '14px 18px',
    background: '#EDE6D9',
    fontFamily: '"Source Serif 4", Georgia, serif',
    fontSize: 15,
    lineHeight: 1.6,
    color: '#2A241E',
    textWrap: 'pretty',
    borderRadius: 2,
  },
  statStrip: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: 0,
    marginTop: 32,
    borderTop: '1px solid rgba(26,23,19,0.1)',
    borderBottom: '1px solid rgba(26,23,19,0.1)',
  },
  stat: {
    padding: '18px 0',
    borderRight: '1px solid rgba(26,23,19,0.08)',
    paddingLeft: 4,
  },
  statVal: {
    fontFamily: '"Source Serif 4", Georgia, serif',
    fontSize: 32,
    fontWeight: 500,
    lineHeight: 1,
    marginBottom: 4,
  },
  statValSmall: {
    fontFamily: '"Source Serif 4", Georgia, serif',
    fontSize: 20,
    fontWeight: 500,
    lineHeight: 1.4,
    marginBottom: 4,
  },
  statLabel: {
    fontFamily: '"IBM Plex Mono", monospace',
    fontSize: 10,
    textTransform: 'uppercase',
    letterSpacing: '0.12em',
    color: '#8A7F73',
  },
  stemGrid: {
    listStyle: 'none',
    padding: 0,
    margin: 0,
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: 12,
  },
  stemCard: {
    display: 'flex',
    gap: 12,
    padding: '14px 16px',
    background: '#FFFEFB',
    border: '1px solid rgba(26,23,19,0.08)',
    borderRadius: 3,
    fontSize: 13,
    lineHeight: 1.45,
    color: '#2A241E',
  },
  stemCardNum: {
    fontFamily: '"IBM Plex Mono", monospace',
    fontSize: 11,
    color: 'oklch(0.45 0.08 150)',
    flexShrink: 0,
    paddingTop: 1,
  },
  stemCardText: { textWrap: 'pretty' },
  misconRow: {
    display: 'flex',
    gap: 20,
    padding: '18px 0',
    borderBottom: '1px solid rgba(26,23,19,0.08)',
  },
  misconNum: {
    fontFamily: '"Source Serif 4", Georgia, serif',
    fontSize: 28,
    fontWeight: 500,
    color: '#C78B5C',
    lineHeight: 1,
    flexShrink: 0,
    width: 36,
  },
  misconTitle: {
    fontFamily: '"Source Serif 4", Georgia, serif',
    fontSize: 17,
    fontWeight: 500,
    marginBottom: 6,
  },
  misconStrike: {
    textDecoration: 'line-through',
    textDecorationColor: '#C78B5C',
    textDecorationThickness: '1.5px',
    color: '#3C352D',
  },
  misconBody: {
    margin: 0,
    fontFamily: '"IBM Plex Sans", sans-serif',
    fontSize: 13.5,
    lineHeight: 1.6,
    color: '#3C352D',
    textWrap: 'pretty',
  },
  tracks: { display: 'grid', gridTemplateColumns: '1fr 1.2fr 1fr', gap: 8 },
  trackItem: {
    padding: '16px 18px',
    background: '#EDE6D9',
    borderRadius: 3,
  },
  trackItemActive: {
    background: 'oklch(0.45 0.08 150)',
    color: '#F6F2EC',
  },
  trackItemDim: { opacity: 0.75 },
  trackNote: {
    fontFamily: '"IBM Plex Mono", monospace',
    fontSize: 10,
    textTransform: 'uppercase',
    letterSpacing: '0.12em',
    opacity: 0.75,
    marginBottom: 6,
  },
  trackCode: { fontFamily: '"IBM Plex Mono", monospace', fontSize: 12 },
  relatedRow: { display: 'flex', gap: 10, flexWrap: 'wrap' },
  relatedChip: {
    display: 'flex',
    flexDirection: 'column',
    padding: '10px 14px',
    background: '#FFFEFB',
    border: '1px solid rgba(26,23,19,0.1)',
    borderRadius: 3,
  },
  chipCode: {
    fontFamily: '"IBM Plex Mono", monospace',
    fontSize: 11,
    color: '#6B5E3C',
    marginBottom: 2,
  },
  chipLabel: { fontSize: 13, color: '#1A1713' },
  tagRow: { display: 'flex', gap: 8, flexWrap: 'wrap' },
  tag: {
    fontFamily: '"IBM Plex Mono", monospace',
    fontSize: 11,
    padding: '4px 10px',
    background: '#EDE6D9',
    borderRadius: 2,
    color: '#3C352D',
  },
  arrow: {
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 2,
    padding: '12px 14px',
    background: '#F6F2EC',
    border: '1px solid rgba(26,23,19,0.12)',
    borderRadius: 4,
    cursor: 'pointer',
    boxShadow: '0 2px 6px rgba(26,23,19,0.08)',
  },
  arrowGlyph: {
    fontFamily: '"Source Serif 4", Georgia, serif',
    fontSize: 24,
    lineHeight: 1,
    color: '#3C352D',
  },
  arrowLabel: {
    fontFamily: '"IBM Plex Mono", monospace',
    fontSize: 9,
    color: '#8A7F73',
    letterSpacing: '0.12em',
  },
  legend: {
    maxWidth: 840,
    margin: '20px auto 0',
    padding: '0 28px',
    fontFamily: '"IBM Plex Mono", monospace',
    fontSize: 10,
    textTransform: 'uppercase',
    letterSpacing: '0.14em',
    color: '#8A7F73',
    display: 'flex',
    gap: 10,
    justifyContent: 'center',
  },
  legendDot: { opacity: 0.4 },
};

window.VariationB = VariationB;
