// Variation D — "Printable Notebook Page"
// One-pager, print-ready. Single column, generous margins, numbered
// sections. Designed so the PDF/print version looks identical to screen.
// This is the "teacher binder" version.

function VariationD() {
  const d = window.TEK_DATA;
  return (
    <div style={notebookStyles.sheet}>
      {/* margin rule lines running down the page */}
      <div style={notebookStyles.marginRule} />

      {/* letterhead */}
      <header style={notebookStyles.letterhead}>
        <div>
          <div style={notebookStyles.orgMark}>Kaizen.School · English TEKS</div>
          <div style={notebookStyles.filing}>
            Filed under <em>{d.course}</em> · {d.strand}
          </div>
        </div>
        <div style={notebookStyles.stampBlock}>
          <div style={notebookStyles.stamp}>
            <div style={notebookStyles.stampCode}>{d.code}</div>
            <div style={notebookStyles.stampLetter}>{d.course[0]}</div>
          </div>
          <div style={notebookStyles.stampMeta}>
            <div>DOK {d.dok}</div>
            <div>{d.bloom}</div>
          </div>
        </div>
      </header>

      {/* title */}
      <h1 style={notebookStyles.title}>{d.title}.</h1>
      <p style={notebookStyles.standard}>
        <span style={notebookStyles.standardLabel}>Standard.</span>{' '}
        {d.standard}
      </p>
      <p style={notebookStyles.expect}>
        <span style={notebookStyles.expectLabel}>Expectation.</span>{' '}
        {d.expectation}
      </p>

      <hr style={notebookStyles.hr} />

      {/* In plain English */}
      <Fold num="I" title="In plain English">
        <p style={notebookStyles.overview}>{d.overview}</p>
        <div style={notebookStyles.studentBlock}>
          <div style={notebookStyles.studentLabel}>Said back to a student —</div>
          <p style={notebookStyles.studentQuote}>{d.studentFriendly}</p>
        </div>
      </Fold>

      {/* Question stems */}
      <Fold num="II" title="Question stems" sub={`${d.questionStems.length} prompts · use as checks-for-understanding`}>
        <ol style={notebookStyles.rule}>
          {d.questionStems.map((q, i) => (
            <li key={i} style={notebookStyles.ruleItem}>
              <span style={notebookStyles.ruleNum}>{i + 1}.</span>
              <span style={notebookStyles.ruleText}>{q}</span>
            </li>
          ))}
        </ol>
      </Fold>

      {/* Misconceptions */}
      <Fold num="III" title="Common misconceptions" sub="Watch-for list during instruction">
        {d.misconceptions.map((m, i) => (
          <div key={i} style={notebookStyles.misc}>
            <div style={notebookStyles.miscHead}>
              <span style={notebookStyles.miscRoman}>{['i', 'ii', 'iii', 'iv', 'v'][i]}.</span>
              <span style={notebookStyles.miscBelief}>Belief: </span>
              <span style={notebookStyles.miscBeliefText}>"{m.title}"</span>
            </div>
            <div style={notebookStyles.miscReality}>
              <span style={notebookStyles.miscRealityLabel}>Reality. </span>
              {m.body}
            </div>
          </div>
        ))}
      </Fold>

      {/* Alignment */}
      <Fold num="IV" title="Alignment" sub="Where this TEK lives in the sequence">
        <div style={notebookStyles.alignRow}>
          <div style={notebookStyles.alignCol}>
            <div style={notebookStyles.alignLabel}>Prior</div>
            <div style={notebookStyles.alignCode}>{d.verticalPrev}</div>
          </div>
          <div style={notebookStyles.alignArrow}>→</div>
          <div style={notebookStyles.alignColActive}>
            <div style={notebookStyles.alignLabel}>This TEK</div>
            <div style={notebookStyles.alignCode}>{d.code}</div>
          </div>
          <div style={notebookStyles.alignArrow}>→</div>
          <div style={notebookStyles.alignCol}>
            <div style={notebookStyles.alignLabel}>Next</div>
            <div style={notebookStyles.alignCode}>{d.verticalNext}</div>
          </div>
        </div>
        <div style={notebookStyles.relatedLine}>
          <span style={notebookStyles.relatedLabel}>See also.</span>
          {d.related.join(' · ')}
        </div>
      </Fold>

      {/* Footer */}
      <footer style={notebookStyles.footer}>
        <div>kaizen.school / teks / {d.code.replace(/[()]/g, '').replace(/\./g, '-')}</div>
        <div>TEK 047 of 312 · English I</div>
      </footer>
    </div>
  );
}

function Fold({ num, title, sub, children }) {
  return (
    <section style={notebookStyles.fold}>
      <div style={notebookStyles.foldHead}>
        <div style={notebookStyles.foldNum}>§ {num}</div>
        <div>
          <div style={notebookStyles.foldTitle}>{title}</div>
          {sub && <div style={notebookStyles.foldSub}>{sub}</div>}
        </div>
      </div>
      <div style={notebookStyles.foldBody}>{children}</div>
    </section>
  );
}

const notebookStyles = {
  sheet: {
    background: '#FAF6ED',
    color: '#1A1713',
    fontFamily: '"Source Serif 4", Georgia, serif',
    padding: '64px 84px 48px 140px',
    minHeight: '100%',
    position: 'relative',
    width: '100%',
    boxSizing: 'border-box',
  },
  marginRule: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 108,
    width: 1,
    background: 'rgba(165,40,30,0.25)', // faint pink rule
  },
  letterhead: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingBottom: 28,
    borderBottom: '2px solid #1A1713',
    marginBottom: 36,
  },
  orgMark: {
    fontFamily: '"IBM Plex Mono", monospace',
    fontSize: 11,
    textTransform: 'uppercase',
    letterSpacing: '0.18em',
    color: '#1A1713',
    marginBottom: 6,
  },
  filing: {
    fontFamily: '"IBM Plex Sans", sans-serif',
    fontSize: 12,
    color: '#5A5148',
  },
  stampBlock: { display: 'flex', gap: 14, alignItems: 'center' },
  stamp: {
    padding: '12px 16px',
    border: '2px solid oklch(0.45 0.08 150)',
    color: 'oklch(0.45 0.08 150)',
    textAlign: 'center',
    transform: 'rotate(-2deg)',
    borderRadius: 3,
  },
  stampCode: {
    fontFamily: '"IBM Plex Mono", monospace',
    fontSize: 12,
    letterSpacing: '0.1em',
    fontWeight: 600,
  },
  stampLetter: {
    fontFamily: '"Source Serif 4", Georgia, serif',
    fontSize: 22,
    lineHeight: 1,
    marginTop: 4,
  },
  stampMeta: {
    fontFamily: '"IBM Plex Mono", monospace',
    fontSize: 10,
    textTransform: 'uppercase',
    letterSpacing: '0.12em',
    color: '#5A5148',
    lineHeight: 1.6,
  },
  title: {
    fontFamily: '"Source Serif 4", Georgia, serif',
    fontSize: 46,
    lineHeight: 1.06,
    fontWeight: 500,
    letterSpacing: '-0.025em',
    margin: 0,
    textWrap: 'balance',
  },
  standard: {
    marginTop: 22,
    fontSize: 16,
    lineHeight: 1.55,
    color: '#3C352D',
  },
  standardLabel: {
    fontFamily: '"IBM Plex Mono", monospace',
    fontSize: 11,
    textTransform: 'uppercase',
    letterSpacing: '0.14em',
    color: '#6B5E3C',
  },
  expect: {
    marginTop: 10,
    fontSize: 17,
    lineHeight: 1.55,
    color: '#1A1713',
    fontStyle: 'italic',
  },
  expectLabel: {
    fontFamily: '"IBM Plex Mono", monospace',
    fontSize: 11,
    textTransform: 'uppercase',
    letterSpacing: '0.14em',
    color: '#6B5E3C',
    fontStyle: 'normal',
  },
  hr: {
    border: 'none',
    borderTop: '1px solid rgba(26,23,19,0.2)',
    margin: '36px 0 0',
  },
  fold: { marginTop: 36 },
  foldHead: {
    display: 'flex',
    gap: 20,
    alignItems: 'baseline',
    marginBottom: 16,
    paddingBottom: 8,
    borderBottom: '1px solid rgba(26,23,19,0.15)',
  },
  foldNum: {
    fontFamily: '"IBM Plex Mono", monospace',
    fontSize: 12,
    color: '#6B5E3C',
    letterSpacing: '0.1em',
    minWidth: 36,
  },
  foldTitle: {
    fontFamily: '"Source Serif 4", Georgia, serif',
    fontSize: 22,
    fontWeight: 500,
    letterSpacing: '-0.01em',
  },
  foldSub: {
    fontFamily: '"IBM Plex Sans", sans-serif',
    fontSize: 12,
    color: '#6B5E3C',
    marginTop: 2,
  },
  foldBody: { paddingLeft: 56 },
  overview: {
    margin: 0,
    fontSize: 16,
    lineHeight: 1.65,
    color: '#2A241E',
    textWrap: 'pretty',
  },
  studentBlock: { marginTop: 18 },
  studentLabel: {
    fontFamily: '"IBM Plex Mono", monospace',
    fontSize: 10,
    textTransform: 'uppercase',
    letterSpacing: '0.14em',
    color: '#6B5E3C',
    marginBottom: 6,
  },
  studentQuote: {
    margin: 0,
    fontSize: 16,
    lineHeight: 1.6,
    color: '#2A241E',
    fontStyle: 'italic',
    paddingLeft: 16,
    borderLeft: '2px solid oklch(0.45 0.08 150)',
    textWrap: 'pretty',
  },
  rule: { listStyle: 'none', padding: 0, margin: 0 },
  ruleItem: {
    display: 'flex',
    gap: 12,
    padding: '11px 0',
    borderBottom: '1px solid rgba(26,23,19,0.12)',
    fontSize: 15,
    lineHeight: 1.55,
    color: '#2A241E',
  },
  ruleNum: {
    fontFamily: '"Source Serif 4", Georgia, serif',
    fontSize: 15,
    color: '#6B5E3C',
    flexShrink: 0,
    width: 26,
    fontVariantNumeric: 'oldstyle-nums',
  },
  ruleText: { flex: 1, textWrap: 'pretty' },
  misc: { marginBottom: 22 },
  miscHead: {
    display: 'flex',
    gap: 8,
    alignItems: 'baseline',
    marginBottom: 6,
  },
  miscRoman: {
    fontFamily: '"Source Serif 4", Georgia, serif',
    fontSize: 15,
    color: '#6B5E3C',
    fontStyle: 'italic',
    width: 24,
    flexShrink: 0,
  },
  miscBelief: {
    fontFamily: '"IBM Plex Mono", monospace',
    fontSize: 10,
    textTransform: 'uppercase',
    letterSpacing: '0.14em',
    color: '#A24B2F',
  },
  miscBeliefText: {
    fontFamily: '"Source Serif 4", Georgia, serif',
    fontSize: 16,
    fontWeight: 500,
    color: '#1A1713',
  },
  miscReality: {
    paddingLeft: 32,
    fontSize: 14.5,
    lineHeight: 1.6,
    color: '#3C352D',
    textWrap: 'pretty',
  },
  miscRealityLabel: {
    fontFamily: '"IBM Plex Mono", monospace',
    fontSize: 10,
    textTransform: 'uppercase',
    letterSpacing: '0.14em',
    color: 'oklch(0.45 0.08 150)',
  },
  alignRow: {
    display: 'flex',
    alignItems: 'stretch',
    gap: 12,
  },
  alignCol: {
    flex: 1,
    padding: '14px 16px',
    background: '#F1EBDD',
    borderRadius: 2,
  },
  alignColActive: {
    flex: 1.2,
    padding: '14px 16px',
    background: 'oklch(0.45 0.08 150)',
    color: '#FAF6ED',
    borderRadius: 2,
  },
  alignArrow: {
    display: 'grid',
    placeItems: 'center',
    color: '#6B5E3C',
    fontSize: 18,
  },
  alignLabel: {
    fontFamily: '"IBM Plex Mono", monospace',
    fontSize: 10,
    textTransform: 'uppercase',
    letterSpacing: '0.14em',
    opacity: 0.75,
    marginBottom: 4,
  },
  alignCode: { fontFamily: '"IBM Plex Mono", monospace', fontSize: 12 },
  relatedLine: {
    marginTop: 16,
    fontFamily: '"IBM Plex Mono", monospace',
    fontSize: 12,
    color: '#3C352D',
  },
  relatedLabel: {
    color: '#6B5E3C',
    textTransform: 'uppercase',
    letterSpacing: '0.14em',
    fontSize: 10,
    marginRight: 8,
  },
  footer: {
    marginTop: 52,
    paddingTop: 16,
    borderTop: '1px solid rgba(26,23,19,0.2)',
    display: 'flex',
    justifyContent: 'space-between',
    fontFamily: '"IBM Plex Mono", monospace',
    fontSize: 10,
    textTransform: 'uppercase',
    letterSpacing: '0.14em',
    color: '#6B5E3C',
  },
};

window.VariationD = VariationD;
