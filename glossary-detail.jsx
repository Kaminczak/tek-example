// Detail column — the main TEK view. Two layouts: dashboard (tiles)
// and notebook (printable one-pager). Both get the icon/glyph strip.

const { useState: useS2 } = React;

function DetailColumn({ tek, layout, setLayout, onNav }) {
  if (!tek) return <div style={window.gx.detailCol}>No TEK selected</div>;

  return (
    <div style={window.gx.detailCol}>
      <div style={window.gx.detailToolbar}>
        <button style={window.gx.navBtn} onClick={() => onNav(-1)}>
          <iconify-icon icon="tabler:chevron-left" width="14" /> Previous
        </button>
        <button style={window.gx.navBtn} onClick={() => onNav(1)}>
          Next <iconify-icon icon="tabler:chevron-right" width="14" />
        </button>
        <span style={{
          fontFamily: '"IBM Plex Mono", monospace', fontSize: 11,
          color: '#6B5E3C', marginLeft: 12, letterSpacing: '0.1em',
        }}>{tek.code}</span>

        <div style={window.gx.layoutToggle}>
          <button
            style={layout === 'dashboard' ? window.gx.layoutBtnActive : window.gx.layoutBtn}
            onClick={() => setLayout('dashboard')}
          >Dashboard</button>
          <button
            style={layout === 'notebook' ? window.gx.layoutBtnActive : window.gx.layoutBtn}
            onClick={() => setLayout('notebook')}
          >Notebook</button>
        </div>

        <button style={{ ...window.gx.navBtn, marginLeft: 8 }}>
          <iconify-icon icon="tabler:printer" width="14" /> Print
        </button>
        <button style={{ ...window.gx.navBtn }}>
          <iconify-icon icon="tabler:bookmark" width="14" /> Save
        </button>
      </div>

      {layout === 'dashboard' ? <DashboardDetail tek={tek} /> : <NotebookDetail tek={tek} />}

      <ActionFooter tek={tek} />
    </div>
  );
}

/* ───────────── ACTIONS — "do something with this TEK" ───────────── */
function ActionFooter({ tek }) {
  const primary = {
    key: 'exit-ticket',
    icon: 'tabler:ticket',
    label: 'Build an exit ticket',
    sub: '3-question check-for-understanding',
  };
  const secondary = [
    { key: 'lesson', icon: 'tabler:notebook', label: 'Add to a lesson plan', sub: 'Attach to an existing lesson' },
    { key: 'mini', icon: 'tabler:presentation-analytics', label: 'Plan a mini-lesson', sub: '15-min opener + practice' },
    { key: 'stems', icon: 'tabler:wand', label: 'Generate question stems', sub: 'Riff beyond the canonical set' },
  ];
  const overflow = [
    { key: 'discussion', icon: 'tabler:messages', label: 'Launch a discussion prompt' },
    { key: 'pin', icon: 'tabler:pin', label: 'Pin to \u201cteaching this week\u201d' },
    { key: 'copy', icon: 'tabler:copy', label: 'Copy as markdown' },
  ];
  return (
    <section style={af.wrap}>
      <div style={af.eyebrow}>
        <iconify-icon icon="tabler:bolt" width="12" />
        <span>Do something with {tek.code}</span>
      </div>
      <div style={af.grid}>
        <button style={af.primary}>
          <div style={af.primaryIcon}>
            <iconify-icon icon={primary.icon} width="22" />
          </div>
          <div>
            <div style={af.primaryLabel}>{primary.label}</div>
            <div style={af.primarySub}>{primary.sub}</div>
          </div>
          <iconify-icon icon="tabler:arrow-right" width="16" style={{ marginLeft: 'auto' }} />
        </button>
        {secondary.map(a => (
          <button key={a.key} style={af.secondary}>
            <iconify-icon icon={a.icon} width="18" style={{ color: 'var(--accent, oklch(0.45 0.08 150))' }} />
            <div style={{ minWidth: 0 }}>
              <div style={af.secondaryLabel}>{a.label}</div>
              <div style={af.secondarySub}>{a.sub}</div>
            </div>
          </button>
        ))}
      </div>
      <div style={af.overflow}>
        {overflow.map(a => (
          <button key={a.key} style={af.overflowBtn}>
            <iconify-icon icon={a.icon} width="14" />
            <span>{a.label}</span>
          </button>
        ))}
      </div>
    </section>
  );
}

const af = {
  wrap: {
    margin: '24px 36px 56px',
    padding: '24px 28px',
    background: '#FFFDF7',
    border: '1px solid rgba(26,23,19,0.08)',
    borderRadius: 3,
  },
  eyebrow: {
    display: 'flex', alignItems: 'center', gap: 8,
    fontFamily: '"IBM Plex Mono", monospace', fontSize: 10,
    textTransform: 'uppercase', letterSpacing: '0.14em',
    color: '#6B5E3C', marginBottom: 14,
  },
  grid: {
    display: 'grid', gridTemplateColumns: '1.4fr 1fr 1fr 1fr', gap: 10,
  },
  primary: {
    display: 'flex', alignItems: 'center', gap: 14,
    padding: '16px 18px',
    background: 'var(--accent, oklch(0.45 0.08 150))',
    color: '#F6F2EC',
    border: 'none', borderRadius: 3,
    cursor: 'pointer', textAlign: 'left',
    boxShadow: '0 1px 3px rgba(26,23,19,0.1)',
  },
  primaryIcon: {
    width: 40, height: 40, borderRadius: 3,
    background: 'rgba(255,255,255,0.15)',
    display: 'grid', placeItems: 'center',
    color: '#F6F2EC', flexShrink: 0,
  },
  primaryLabel: {
    fontFamily: '"Source Serif 4", Georgia, serif',
    fontSize: 16, fontWeight: 500, letterSpacing: '-0.01em',
    marginBottom: 2,
  },
  primarySub: {
    fontFamily: '"IBM Plex Sans", sans-serif',
    fontSize: 12, opacity: 0.85,
  },
  secondary: {
    display: 'flex', alignItems: 'center', gap: 12,
    padding: '14px 16px',
    background: '#F1ECE3',
    border: '1px solid rgba(26,23,19,0.06)',
    borderRadius: 3,
    cursor: 'pointer', textAlign: 'left',
    color: '#1A1713',
  },
  secondaryLabel: {
    fontFamily: '"IBM Plex Sans", sans-serif',
    fontSize: 13, fontWeight: 500, lineHeight: 1.3,
    marginBottom: 2,
    textWrap: 'pretty',
  },
  secondarySub: {
    fontFamily: '"IBM Plex Mono", monospace',
    fontSize: 10, color: '#6B5E3C',
    textTransform: 'uppercase', letterSpacing: '0.1em',
  },
  overflow: {
    display: 'flex', gap: 6, marginTop: 14, flexWrap: 'wrap',
    paddingTop: 14, borderTop: '1px dashed rgba(26,23,19,0.12)',
  },
  overflowBtn: {
    display: 'inline-flex', alignItems: 'center', gap: 6,
    padding: '6px 10px',
    background: 'transparent',
    border: '1px solid rgba(26,23,19,0.12)',
    borderRadius: 2,
    fontFamily: '"IBM Plex Sans", sans-serif', fontSize: 12,
    color: '#3C352D', cursor: 'pointer',
  },
};

/* ───────────────── GLYPH STRIP (the visual anchor) ───────────────── */
function GlyphStrip({ glyphs, labels }) {
  return (
    <div style={dx.glyphStrip}>
      {glyphs.map((g, i) => (
        <div key={i} style={dx.glyphCell}>
          <div style={dx.glyphBox}>
            <iconify-icon icon={g} width="28" style={{ color: 'var(--accent, oklch(0.45 0.08 150))' }} />
          </div>
          {labels && labels[i] && <div style={dx.glyphLabel}>{labels[i]}</div>}
        </div>
      ))}
    </div>
  );
}

function glyphLabels(tek) {
  // derive one-word labels from the icon names, best-effort
  return tek.glyphs.map(g => {
    const name = g.split(':')[1] || g;
    const map = {
      'ear': 'Listen',
      'message-dots': 'Clarify',
      'list-numbers': 'Sequence',
      'checklist': 'Follow',
      'messages': 'Discuss',
      'users': 'Audience',
      'adjustments-horizontal': 'Adapt',
      'presentation': 'Present',
      'microphone-2': 'Voice',
      'chart-arcs': 'Structure',
      'quote': 'Rhetoric',
      'users-group': 'Team',
      'clipboard-list': 'Agenda',
      'clock': 'Time',
      'vote': 'Decide',
      'book-2': 'Reference',
      'device-desktop-search': 'Search',
      'search': 'Look up',
      'circle-check': 'Verify',
      'eye-search': 'Context',
      'masks-theater': 'Figurative',
      'contrast': 'Connotation',
      'color-picker': 'Nuance',
      'book': 'Read',
      'hourglass': 'Stamina',
      'bookmark': 'Self-select',
      'heart-handshake': 'Connect',
      'bulb': 'Reflect',
      'mood-smile': 'Response',
      'target-arrow': 'Theme',
      'user-circle': 'Character',
      'timeline': 'Plot',
      'puzzle': 'Pattern',
      'map-2': 'Plan',
      'writing': 'Draft',
      'compass': 'Purpose',
    };
    return map[name] || name.replace(/-/g, ' ');
  });
}

/* ───────────────── DASHBOARD LAYOUT ───────────────── */
function DashboardDetail({ tek }) {
  const labels = glyphLabels(tek);
  const stems = tek.questionStems || Array.from({ length: tek.stems || 5 },
    (_, i) => `Sample question stem ${i + 1} — placeholder until you author this TEK.`);
  const miscs = tek.misconceptionsDetail || Array.from({ length: tek.misconceptions || 3 },
    (_, i) => ({ title: `Misconception ${i + 1}`, body: 'Placeholder — author this misconception when you fill in this TEK.' }));

  return (
    <div style={dx.page}>
      <section style={dx.headerTile}>
        <div style={tek.explainerVideo ? dx.headerSplit : null}>
          <div style={tek.explainerVideo ? dx.headerMain : null}>
            <div style={dx.headerRow}>
              <span style={dx.codeChip}>{tek.code}</span>
              <span style={dx.metaDot}>·</span>
              <span>{tek.course}</span>
              <span style={dx.metaDot}>·</span>
              <span>{tek.strand}</span>
              <span style={dx.metaDot}>·</span>
              <span>{tek.substrand}</span>
            </div>
            <h1 style={dx.h1}>{tek.title}</h1>
            <p style={dx.expectation}>{tek.expectation}</p>

            <GlyphStrip glyphs={tek.glyphs} labels={labels} />

            <div style={dx.pillStrip}>
              <Pill label="DOK" value={`${tek.dok} · ${['','Recall','Skill','Strategic','Extended'][tek.dok]}`} />
              <Pill label="Bloom" value={tek.bloom} />
              <Pill label="Cadence" value={tek.estimatedTime} />
              {tek.tags.map(t => <Pill key={t} value={t} muted />)}
            </div>
          </div>

          {tek.explainerVideo && (
            <div style={dx.teachingTipsPanel}>
              <div style={dx.teachingTipsHead}>
                <iconify-icon icon="tabler:play-card" width="14" style={{ color: 'var(--accent, oklch(0.45 0.08 150))' }} />
                <span style={dx.teachingTipsLabel}>Teaching Tips</span>
                {tek.explainerVideo.duration && (
                  <span style={dx.teachingTipsDuration}>{tek.explainerVideo.duration}</span>
                )}
              </div>
              <div style={dx.teachingTipsEmbed}>
                <iframe
                  src={`https://www.youtube.com/embed/${tek.explainerVideo.youtubeId}`}
                  style={dx.teachingTipsIframe}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  title={tek.explainerVideo.label || 'Teaching Tips'}
                />
              </div>
            </div>
          )}
        </div>
      </section>



      <section style={dx.grid}>
        <div style={{ ...dx.tile, gridColumn: 'span 6' }}>
          <TileHead num="01" title="Overview" icon="tabler:info-circle" />
          <p style={dx.body}>{tek.overview}</p>
        </div>

        <div style={{ ...dx.tileAccent, gridColumn: 'span 6' }}>
          <TileHead num="02" title="Say it to a student" icon="tabler:quote" accent />
          <p style={dx.bodyQuote}>{tek.studentFriendly}</p>
        </div>

        <div style={{ ...dx.tile, gridColumn: 'span 7' }}>
          <TileHead num="03" title="Question stems" icon="tabler:help-circle" count={stems.length} />
          <div style={dx.stemStack}>
            {stems.slice(0, 6).map((q, i) => (
              <div key={i} style={dx.stemLine}>
                <span style={dx.stemNum}>{String(i + 1).padStart(2, '0')}</span>
                <span>{q}</span>
              </div>
            ))}
            {stems.length > 6 && (
              <div style={dx.stemMore}>+ {stems.length - 6} more</div>
            )}
          </div>
        </div>

        <div style={{ ...dx.tile, gridColumn: 'span 5' }}>
          <TileHead num="04" title="Alignment" icon="tabler:hierarchy-2" />
          <div style={dx.vAlign}>
            <VRow label="Prior" code={tek.verticalPrev} />
            <VRow label="Current" code={tek.code} active />
            <VRow label="Next" code={tek.verticalNext} />
          </div>
          {tek.related && tek.related.length > 0 && <>
            <div style={dx.subHead}>Related in strand</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {tek.related.map(r => (
                <div key={r} style={dx.relatedLine}>
                  <span style={{ fontFamily: '"IBM Plex Mono", monospace', fontSize: 11 }}>{r}</span>
                  <iconify-icon icon="tabler:arrow-up-right" width="12" style={{ color: '#8A7F73' }} />
                </div>
              ))}
            </div>
          </>}
        </div>

        <div style={{ ...dx.tile, gridColumn: 'span 12' }}>
          <TileHead num="05" title="Common misconceptions" icon="tabler:alert-triangle" count={miscs.length} />
          <div style={{
            display: 'grid', gap: 12,
            gridTemplateColumns: `repeat(${Math.min(miscs.length, 5)}, 1fr)`,
          }}>
            {miscs.map((m, i) => (
              <div key={i} style={dx.misc}>
                <div style={dx.miscHead}>
                  <span style={dx.miscNum}>{String(i + 1).padStart(2, '0')}</span>
                  <span style={dx.miscTitle}>{m.title}</span>
                </div>
                <p style={dx.miscBody}>{m.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

function TileHead({ num, title, count, icon, accent }) {
  return (
    <div style={dx.tileHead}>
      {icon && <iconify-icon icon={icon} width="16" style={{
        color: accent ? 'oklch(0.7 0.08 150)' : 'var(--accent, oklch(0.45 0.08 150))',
      }} />}
      <span style={accent ? dx.tileNumAccent : dx.tileNum}>{num}</span>
      <span style={dx.tileTitle}>{title}</span>
      {count !== undefined && <span style={dx.tileCount}>{count}</span>}
    </div>
  );
}
function Pill({ label, value, muted }) {
  return (
    <span style={muted ? dx.pillMuted : dx.pill}>
      {label && <span style={dx.pillLabel}>{label}</span>}
      <span>{value}</span>
    </span>
  );
}
function VRow({ label, code, active }) {
  return (
    <div style={active ? dx.vRowActive : dx.vRow}>
      <span style={dx.vLabel}>{label}</span>
      <span style={{ fontFamily: '"IBM Plex Mono", monospace', fontSize: 11 }}>{code}</span>
    </div>
  );
}

/* ───────────────── NOTEBOOK LAYOUT ───────────────── */
function NotebookDetail({ tek }) {
  const labels = glyphLabels(tek);
  const stems = tek.questionStems || Array.from({ length: tek.stems || 5 },
    (_, i) => `Sample question stem ${i + 1} — placeholder.`);
  const miscs = tek.misconceptionsDetail || Array.from({ length: tek.misconceptions || 3 },
    (_, i) => ({ title: `Misconception ${i + 1}`, body: 'Placeholder.' }));

  return (
    <div style={dx.sheet}>
      <div style={dx.marginRule} />
      <header style={dx.letterhead}>
        <div>
          <div style={dx.orgMark}>Kaizen.School · {tek.course}</div>
          <div style={dx.filing}>Filed under <em>{tek.strand}</em> · {tek.substrand}</div>
        </div>
        <div style={dx.stampBlock}>
          <div style={dx.stamp}>
            <div style={dx.stampCode}>{tek.code}</div>
            <div style={dx.stampLetter}>{tek.letter}</div>
          </div>
        </div>
      </header>

      <h1 style={dx.nTitle}>{tek.title}.</h1>
      <p style={dx.nExpect}>
        <span style={dx.nExpectLabel}>Expectation.</span> {tek.expectation}
      </p>

      <div style={{ marginTop: 28 }}>
        <GlyphStrip glyphs={tek.glyphs} labels={labels} />
      </div>

      <section style={dx.nFold}>
        <FoldHead num="I" title="In plain English" />
        <p style={dx.nOverview}>{tek.overview}</p>
        <div style={dx.nStudent}>
          <div style={dx.nStudentLabel}>Said back to a student —</div>
          <p style={dx.nStudentQuote}>{tek.studentFriendly}</p>
        </div>
      </section>

      <section style={dx.nFold}>
        <FoldHead num="II" title="Question stems" sub={`${stems.length} prompts`} />
        <ol style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          {stems.map((q, i) => (
            <li key={i} style={dx.nRule}>
              <span style={dx.nRuleNum}>{i + 1}.</span>
              <span>{q}</span>
            </li>
          ))}
        </ol>
      </section>

      <section style={dx.nFold}>
        <FoldHead num="III" title="Common misconceptions" />
        {miscs.map((m, i) => (
          <div key={i} style={{ marginBottom: 18 }}>
            <div style={dx.nMiscHead}>
              <span style={dx.nMiscRoman}>{['i', 'ii', 'iii', 'iv', 'v'][i]}.</span>
              <span style={dx.nMiscBelief}>Belief:</span>
              <span style={dx.nMiscBeliefText}>"{m.title}"</span>
            </div>
            <div style={dx.nMiscReality}>
              <span style={dx.nMiscRealityLabel}>Reality. </span>{m.body}
            </div>
          </div>
        ))}
      </section>

      <section style={dx.nFold}>
        <FoldHead num="IV" title="Alignment" />
        <div style={dx.nAlign}>
          <div style={dx.nAlignCol}>
            <div style={dx.nAlignLabel}>Prior</div>
            <div style={{ fontFamily: '"IBM Plex Mono", monospace', fontSize: 12 }}>{tek.verticalPrev}</div>
          </div>
          <div style={dx.nAlignArrow}>→</div>
          <div style={dx.nAlignActive}>
            <div style={dx.nAlignLabel}>This TEK</div>
            <div style={{ fontFamily: '"IBM Plex Mono", monospace', fontSize: 12 }}>{tek.code}</div>
          </div>
          <div style={dx.nAlignArrow}>→</div>
          <div style={dx.nAlignCol}>
            <div style={dx.nAlignLabel}>Next</div>
            <div style={{ fontFamily: '"IBM Plex Mono", monospace', fontSize: 12 }}>{tek.verticalNext}</div>
          </div>
        </div>
      </section>

      <footer style={dx.nFooter}>
        <span>kaizen.school / teks / {tek.code.replace(/[()]/g, '').replace(/\./g, '-')}</span>
        <span>{tek.course} · {tek.strand}</span>
      </footer>
    </div>
  );
}
function FoldHead({ num, title, sub }) {
  return (
    <div style={dx.nFoldHead}>
      <div style={dx.nFoldNum}>§ {num}</div>
      <div>
        <div style={dx.nFoldTitle}>{title}</div>
        {sub && <div style={dx.nFoldSub}>{sub}</div>}
      </div>
    </div>
  );
}

/* ───────────────── STYLES ───────────────── */
const dx = {
  page: { padding: '24px 36px 56px' },
  headerTile: {
    background: '#FFFDF7', padding: '28px 32px',
    borderRadius: 3, border: '1px solid rgba(26,23,19,0.08)', marginBottom: 16,
  },
  headerSplit: {
    display: 'flex', gap: 28, alignItems: 'flex-start',
  },
  headerMain: {
    flex: 1, minWidth: 0,
  },
  teachingTipsPanel: {
    width: 340, flexShrink: 0,
    display: 'flex', flexDirection: 'column', gap: 10,
  },
  teachingTipsHead: {
    display: 'flex', alignItems: 'center', gap: 8,
  },
  teachingTipsLabel: {
    fontFamily: '"Source Serif 4", Georgia, serif',
    fontSize: 16, fontWeight: 500, letterSpacing: '-0.01em',
    flex: 1,
  },
  teachingTipsDuration: {
    fontFamily: '"IBM Plex Mono", monospace', fontSize: 10,
    color: '#8A7F73', textTransform: 'uppercase', letterSpacing: '0.1em',
  },
  teachingTipsEmbed: {
    position: 'relative', width: '100%', paddingBottom: '56.25%',
    background: '#1A1713', borderRadius: 3, overflow: 'hidden',
  },
  teachingTipsIframe: {
    position: 'absolute', top: 0, left: 0,
    width: '100%', height: '100%',
    border: 'none', display: 'block',
  },
  headerRow: {
    display: 'flex', alignItems: 'center', gap: 10,
    fontFamily: '"IBM Plex Mono", monospace', fontSize: 11,
    textTransform: 'uppercase', letterSpacing: '0.1em',
    color: '#6B5E3C', marginBottom: 14,
  },
  codeChip: {
    padding: '3px 8px', background: '#1A1713', color: '#F6F2EC',
    borderRadius: 2, fontSize: 11,
  },
  metaDot: { opacity: 0.4 },
  h1: {
    fontFamily: '"Source Serif 4", Georgia, serif',
    fontSize: 34, lineHeight: 1.1, fontWeight: 500,
    letterSpacing: '-0.02em', margin: 0, marginBottom: 12,
    textWrap: 'balance',
  },
  expectation: {
    margin: 0,
    fontFamily: '"Source Serif 4", Georgia, serif',
    fontSize: 17, lineHeight: 1.55, color: '#3C352D',
    fontStyle: 'italic', maxWidth: 780, textWrap: 'pretty',
  },

  /* glyph strip */
  glyphStrip: {
    display: 'flex', gap: 12, marginTop: 22,
    padding: '16px 0',
    borderTop: '1px solid rgba(26,23,19,0.08)',
    borderBottom: '1px solid rgba(26,23,19,0.08)',
  },
  glyphCell: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, minWidth: 72 },
  glyphBox: {
    width: 56, height: 56, display: 'grid', placeItems: 'center',
    background: '#F1ECE3', borderRadius: 4,
    border: '1px solid rgba(26,23,19,0.06)',
  },
  glyphLabel: {
    fontFamily: '"IBM Plex Mono", monospace', fontSize: 10,
    textTransform: 'uppercase', letterSpacing: '0.12em',
    color: '#6B5E3C',
  },

  pillStrip: { display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 16 },
  pill: {
    display: 'inline-flex', gap: 6, padding: '4px 10px',
    background: '#F1ECE3', borderRadius: 2,
    fontSize: 11.5, fontFamily: '"IBM Plex Mono", monospace',
  },
  pillMuted: {
    display: 'inline-flex', gap: 6, padding: '4px 10px',
    background: 'transparent',
    border: '1px solid rgba(26,23,19,0.12)', borderRadius: 2,
    fontSize: 11.5, fontFamily: '"IBM Plex Mono", monospace', color: '#6B5E3C',
  },
  pillLabel: { color: '#8A7F73', textTransform: 'uppercase', letterSpacing: '0.1em' },

  grid: { display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: 16 },
  tile: {
    background: '#FFFDF7', padding: '22px 26px',
    borderRadius: 3, border: '1px solid rgba(26,23,19,0.08)', minWidth: 0,
  },
  tileAccent: {
    background: '#1A1713', color: '#F6F2EC',
    padding: '22px 26px', borderRadius: 3, minWidth: 0,
  },
  tileHead: { display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 },
  tileNum: { fontFamily: '"IBM Plex Mono", monospace', fontSize: 10, color: '#8A7F73' },
  tileNumAccent: { fontFamily: '"IBM Plex Mono", monospace', fontSize: 10, color: 'oklch(0.7 0.08 150)' },
  tileTitle: {
    fontFamily: '"Source Serif 4", Georgia, serif',
    fontSize: 16, fontWeight: 500, letterSpacing: '-0.01em',
  },
  tileCount: {
    fontFamily: '"IBM Plex Mono", monospace', fontSize: 10,
    color: '#8A7F73', marginLeft: 'auto',
  },
  body: {
    margin: 0, fontFamily: '"Source Serif 4", Georgia, serif',
    fontSize: 15, lineHeight: 1.6, color: '#2A241E', textWrap: 'pretty',
  },
  bodyQuote: {
    margin: 0, fontFamily: '"Source Serif 4", Georgia, serif',
    fontSize: 17, lineHeight: 1.55, color: '#F1ECE3',
    fontStyle: 'italic', textWrap: 'pretty',
  },
  stemStack: { display: 'flex', flexDirection: 'column' },
  stemLine: {
    display: 'flex', gap: 12, padding: '9px 0',
    borderBottom: '1px dotted rgba(26,23,19,0.12)',
    fontSize: 13.5, lineHeight: 1.45, color: '#2A241E',
  },
  stemNum: {
    fontFamily: '"IBM Plex Mono", monospace', fontSize: 11,
    color: '#8A7F73', flexShrink: 0, paddingTop: 1,
  },
  stemMore: {
    padding: '10px 0 0',
    fontFamily: '"IBM Plex Mono", monospace', fontSize: 11,
    color: 'var(--accent, oklch(0.45 0.08 150))',
    textTransform: 'uppercase', letterSpacing: '0.12em',
  },
  vAlign: { display: 'flex', flexDirection: 'column', gap: 4 },
  vRow: {
    display: 'flex', justifyContent: 'space-between',
    padding: '10px 12px', background: '#F1ECE3',
    borderRadius: 2, fontSize: 12,
  },
  vRowActive: {
    display: 'flex', justifyContent: 'space-between',
    padding: '10px 12px',
    background: 'var(--accent, oklch(0.45 0.08 150))', color: '#F6F2EC',
    borderRadius: 2, fontSize: 12,
  },
  vLabel: {
    fontFamily: '"IBM Plex Mono", monospace',
    textTransform: 'uppercase', letterSpacing: '0.12em',
    fontSize: 10, opacity: 0.75,
  },
  subHead: {
    fontFamily: '"IBM Plex Mono", monospace', fontSize: 10,
    textTransform: 'uppercase', letterSpacing: '0.14em',
    color: '#8A7F73', marginTop: 18, marginBottom: 8,
  },
  relatedLine: {
    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
    padding: '8px 12px', background: '#F1ECE3',
    borderRadius: 2, fontSize: 12,
  },
  misc: {
    padding: '16px 18px', background: '#F1ECE3', borderRadius: 3,
    borderTop: '2px solid var(--accent, oklch(0.45 0.08 150))',
  },
  miscHead: { display: 'flex', gap: 8, alignItems: 'baseline', marginBottom: 8 },
  miscNum: {
    fontFamily: '"IBM Plex Mono", monospace', fontSize: 11,
    color: 'var(--accent, oklch(0.45 0.08 150))', fontWeight: 500,
  },
  miscTitle: {
    fontFamily: '"Source Serif 4", Georgia, serif',
    fontSize: 14, fontWeight: 500, lineHeight: 1.3, color: '#1A1713',
  },
  miscBody: {
    margin: 0, fontSize: 12.5, lineHeight: 1.55,
    color: '#3C352D', textWrap: 'pretty',
  },

  /* notebook */
  sheet: {
    background: '#FAF6ED', padding: '52px 72px 48px 120px',
    position: 'relative', minHeight: '100%',
  },
  marginRule: {
    position: 'absolute', top: 0, bottom: 0, left: 92, width: 1,
    background: 'rgba(165,40,30,0.22)',
  },
  letterhead: {
    display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start',
    paddingBottom: 22, borderBottom: '2px solid #1A1713', marginBottom: 28,
  },
  orgMark: {
    fontFamily: '"IBM Plex Mono", monospace', fontSize: 11,
    textTransform: 'uppercase', letterSpacing: '0.18em',
    color: '#1A1713', marginBottom: 4,
  },
  filing: { fontFamily: '"IBM Plex Sans", sans-serif', fontSize: 12, color: '#5A5148' },
  stampBlock: { display: 'flex', gap: 12 },
  stamp: {
    padding: '10px 14px', textAlign: 'center',
    border: '2px solid var(--accent, oklch(0.45 0.08 150))',
    color: 'var(--accent, oklch(0.45 0.08 150))',
    transform: 'rotate(-2deg)', borderRadius: 3,
  },
  stampCode: {
    fontFamily: '"IBM Plex Mono", monospace', fontSize: 11,
    letterSpacing: '0.1em', fontWeight: 600,
  },
  stampLetter: {
    fontFamily: '"Source Serif 4", Georgia, serif',
    fontSize: 20, lineHeight: 1, marginTop: 2,
  },
  nTitle: {
    fontFamily: '"Source Serif 4", Georgia, serif',
    fontSize: 40, lineHeight: 1.08, fontWeight: 500,
    letterSpacing: '-0.025em', margin: 0, textWrap: 'balance',
  },
  nExpect: {
    marginTop: 14, fontFamily: '"Source Serif 4", Georgia, serif',
    fontSize: 16, lineHeight: 1.55, color: '#1A1713', fontStyle: 'italic',
  },
  nExpectLabel: {
    fontFamily: '"IBM Plex Mono", monospace', fontSize: 11,
    textTransform: 'uppercase', letterSpacing: '0.14em',
    color: '#6B5E3C', fontStyle: 'normal', marginRight: 6,
  },
  nFold: { marginTop: 32 },
  nFoldHead: {
    display: 'flex', gap: 18, alignItems: 'baseline',
    marginBottom: 14, paddingBottom: 6,
    borderBottom: '1px solid rgba(26,23,19,0.15)',
  },
  nFoldNum: {
    fontFamily: '"IBM Plex Mono", monospace', fontSize: 12,
    color: '#6B5E3C', letterSpacing: '0.1em', minWidth: 36,
  },
  nFoldTitle: {
    fontFamily: '"Source Serif 4", Georgia, serif',
    fontSize: 20, fontWeight: 500, letterSpacing: '-0.01em',
  },
  nFoldSub: { fontFamily: '"IBM Plex Sans", sans-serif', fontSize: 12, color: '#6B5E3C' },
  nOverview: {
    margin: 0, paddingLeft: 54,
    fontFamily: '"Source Serif 4", Georgia, serif',
    fontSize: 15, lineHeight: 1.65, color: '#2A241E', textWrap: 'pretty',
  },
  nStudent: { paddingLeft: 54, marginTop: 14 },
  nStudentLabel: {
    fontFamily: '"IBM Plex Mono", monospace', fontSize: 10,
    textTransform: 'uppercase', letterSpacing: '0.14em',
    color: '#6B5E3C', marginBottom: 4,
  },
  nStudentQuote: {
    margin: 0, fontFamily: '"Source Serif 4", Georgia, serif',
    fontSize: 15, lineHeight: 1.6, color: '#2A241E',
    fontStyle: 'italic', paddingLeft: 14,
    borderLeft: '2px solid var(--accent, oklch(0.45 0.08 150))',
    textWrap: 'pretty',
  },
  nRule: {
    display: 'flex', gap: 12, padding: '10px 0 10px 54px',
    borderBottom: '1px solid rgba(26,23,19,0.12)',
    fontFamily: '"Source Serif 4", Georgia, serif',
    fontSize: 14.5, lineHeight: 1.55, color: '#2A241E',
  },
  nRuleNum: { color: '#6B5E3C', flexShrink: 0, width: 22 },
  nMiscHead: {
    display: 'flex', gap: 6, alignItems: 'baseline',
    marginBottom: 4, paddingLeft: 54,
  },
  nMiscRoman: {
    fontFamily: '"Source Serif 4", Georgia, serif',
    fontSize: 14, color: '#6B5E3C', fontStyle: 'italic', width: 22, flexShrink: 0,
  },
  nMiscBelief: {
    fontFamily: '"IBM Plex Mono", monospace', fontSize: 10,
    textTransform: 'uppercase', letterSpacing: '0.14em',
    color: '#A24B2F', marginRight: 4,
  },
  nMiscBeliefText: {
    fontFamily: '"Source Serif 4", Georgia, serif',
    fontSize: 15, fontWeight: 500, color: '#1A1713',
  },
  nMiscReality: {
    paddingLeft: 82,
    fontFamily: '"IBM Plex Sans", sans-serif',
    fontSize: 13.5, lineHeight: 1.55, color: '#3C352D', textWrap: 'pretty',
  },
  nMiscRealityLabel: {
    fontFamily: '"IBM Plex Mono", monospace', fontSize: 10,
    textTransform: 'uppercase', letterSpacing: '0.14em',
    color: 'var(--accent, oklch(0.45 0.08 150))',
  },
  nAlign: { display: 'flex', alignItems: 'stretch', gap: 10, paddingLeft: 54 },
  nAlignCol: { flex: 1, padding: '12px 14px', background: '#F1EBDD', borderRadius: 2 },
  nAlignActive: {
    flex: 1.2, padding: '12px 14px',
    background: 'var(--accent, oklch(0.45 0.08 150))',
    color: '#FAF6ED', borderRadius: 2,
  },
  nAlignArrow: { display: 'grid', placeItems: 'center', color: '#6B5E3C' },
  nAlignLabel: {
    fontFamily: '"IBM Plex Mono", monospace', fontSize: 10,
    textTransform: 'uppercase', letterSpacing: '0.14em',
    opacity: 0.75, marginBottom: 4,
  },
  nFooter: {
    marginTop: 48, paddingTop: 14,
    borderTop: '1px solid rgba(26,23,19,0.2)',
    display: 'flex', justifyContent: 'space-between',
    fontFamily: '"IBM Plex Mono", monospace', fontSize: 10,
    textTransform: 'uppercase', letterSpacing: '0.14em', color: '#6B5E3C',
  },
};

window.DetailColumn = DetailColumn;
