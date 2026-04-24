// Styles for the glossary shell + detail view. Broken out so the
// component files stay readable. Lives on window.gx.

window.gx = {
  shell: {
    background: '#F6F2EC',
    color: '#1A1713',
    fontFamily: '"IBM Plex Sans", system-ui, sans-serif',
    minHeight: '100vh',
    width: '100%',
  },
  /* topbar */
  topbar: {
    display: 'flex', alignItems: 'center', gap: 24,
    padding: '14px 28px',
    borderBottom: '1px solid rgba(26,23,19,0.1)',
    background: '#FFFDF7',
    position: 'sticky', top: 0, zIndex: 10,
  },
  brand: { display: 'flex', alignItems: 'center', gap: 10 },
  brandMark: { color: 'var(--accent, oklch(0.45 0.08 150))', display: 'inline-flex' },
  brandDivider: { color: '#BFB4A3', fontSize: 14 },
  search: {
    flex: 1, maxWidth: 520,
    display: 'flex', alignItems: 'center', gap: 10,
    padding: '8px 14px',
    background: '#F1ECE3',
    border: '1px solid rgba(26,23,19,0.08)',
    borderRadius: 2,
  },
  searchInput: {
    flex: 1, border: 'none', outline: 'none', background: 'transparent',
    fontFamily: '"IBM Plex Sans", sans-serif',
    fontSize: 13, color: '#1A1713',
  },
  searchKbd: {
    fontFamily: '"IBM Plex Mono", monospace', fontSize: 11,
    padding: '2px 6px',
    border: '1px solid rgba(26,23,19,0.15)',
    borderRadius: 2, color: '#6B5E3C',
  },
  topRight: { display: 'flex', alignItems: 'center', gap: 18 },
  topLink: { fontSize: 13, color: '#5A5148', cursor: 'pointer' },
  topLinkActive: { fontSize: 13, color: '#1A1713', fontWeight: 600, cursor: 'pointer' },
  avatar: {
    fontFamily: '"IBM Plex Mono", monospace', fontSize: 11,
    width: 28, height: 28, borderRadius: '50%',
    background: 'var(--accent, oklch(0.45 0.08 150))', color: '#F6F2EC',
    display: 'grid', placeItems: 'center', fontWeight: 500,
  },

  /* body */
  body: {
    display: 'grid',
    gridTemplateColumns: '240px 360px 1fr',
    minHeight: 'calc(100vh - 57px)',
  },

  /* sidebar */
  sidebar: {
    borderRight: '1px solid rgba(26,23,19,0.1)',
    padding: '22px 18px',
    background: '#F1ECE3',
    display: 'flex', flexDirection: 'column', gap: 4,
  },
  sideSection: { marginBottom: 28 },
  sideLabel: {
    fontFamily: '"IBM Plex Mono", monospace', fontSize: 10,
    textTransform: 'uppercase', letterSpacing: '0.14em',
    color: '#8A7F73', marginBottom: 10, paddingLeft: 4,
  },
  course: {
    display: 'grid', gridTemplateColumns: '58px 1fr auto', alignItems: 'center', gap: 10,
    padding: '8px 10px', borderRadius: 2,
    background: 'transparent', border: 'none',
    fontFamily: '"IBM Plex Sans", sans-serif', fontSize: 13,
    color: '#3C352D', cursor: 'pointer', textAlign: 'left',
  },
  courseActive: {
    display: 'grid', gridTemplateColumns: '58px 1fr auto', alignItems: 'center', gap: 10,
    padding: '8px 10px', borderRadius: 2,
    background: '#FFFDF7', border: 'none',
    fontFamily: '"IBM Plex Sans", sans-serif', fontSize: 13,
    color: '#1A1713', cursor: 'pointer', textAlign: 'left', fontWeight: 500,
    boxShadow: 'inset 2px 0 0 var(--accent, oklch(0.45 0.08 150))',
  },
  courseCode: { fontFamily: '"IBM Plex Mono", monospace', fontSize: 11, color: '#8A7F73' },
  courseCount: { fontFamily: '"IBM Plex Mono", monospace', fontSize: 11, color: '#8A7F73' },
  strand: {
    display: 'flex', alignItems: 'center', gap: 10,
    padding: '8px 10px', borderRadius: 2,
    background: 'transparent', border: 'none',
    fontFamily: '"IBM Plex Sans", sans-serif', fontSize: 12.5,
    color: '#3C352D', cursor: 'pointer', textAlign: 'left',
    lineHeight: 1.3,
  },
  strandActive: {
    display: 'flex', alignItems: 'center', gap: 10,
    padding: '8px 10px', borderRadius: 2,
    background: '#FFFDF7', border: 'none',
    fontFamily: '"IBM Plex Sans", sans-serif', fontSize: 12.5,
    color: '#1A1713', cursor: 'pointer', textAlign: 'left',
    fontWeight: 500, lineHeight: 1.3,
    boxShadow: 'inset 2px 0 0 var(--accent, oklch(0.45 0.08 150))',
  },
  sideFootnote: {
    marginTop: 'auto', padding: '10px 4px',
    fontFamily: '"IBM Plex Mono", monospace', fontSize: 10,
    textTransform: 'uppercase', letterSpacing: '0.1em',
    color: '#8A7F73', display: 'flex', alignItems: 'center', gap: 6,
  },

  /* list column */
  listCol: {
    borderRight: '1px solid rgba(26,23,19,0.1)',
    background: '#FAF6ED',
    display: 'flex', flexDirection: 'column',
    maxHeight: 'calc(100vh - 57px)', minWidth: 0,
  },
  listHead: {
    padding: '14px 18px',
    borderBottom: '1px solid rgba(26,23,19,0.08)',
    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
  },
  listHeadTitle: {
    fontFamily: '"IBM Plex Mono", monospace', fontSize: 10,
    textTransform: 'uppercase', letterSpacing: '0.14em',
    color: '#6B5E3C',
  },
  listHeadHint: {
    fontFamily: '"IBM Plex Mono", monospace', fontSize: 10,
    color: '#8A7F73', letterSpacing: '0.1em',
  },
  listScroll: { overflowY: 'auto', flex: 1 },
  listGroup: { paddingBottom: 8 },
  listGroupHead: {
    padding: '16px 18px 8px',
    fontFamily: '"IBM Plex Mono", monospace', fontSize: 10,
    textTransform: 'uppercase', letterSpacing: '0.14em',
    color: '#8A7F73',
    position: 'sticky', top: 0, background: '#FAF6ED',
  },
  listItem: {
    display: 'grid', gridTemplateColumns: '36px 1fr auto',
    gap: 12, alignItems: 'center',
    padding: '12px 18px',
    width: '100%', border: 'none', background: 'transparent',
    textAlign: 'left', cursor: 'pointer',
    borderBottom: '1px solid rgba(26,23,19,0.05)',
  },
  listItemActive: {
    display: 'grid', gridTemplateColumns: '36px 1fr auto',
    gap: 12, alignItems: 'center',
    padding: '12px 18px',
    width: '100%', border: 'none',
    background: '#F1E9D6',
    textAlign: 'left', cursor: 'pointer',
    borderBottom: '1px solid rgba(26,23,19,0.05)',
    boxShadow: 'inset 3px 0 0 var(--accent, oklch(0.45 0.08 150))',
  },
  listItemCode: {
    fontFamily: '"Source Serif 4", Georgia, serif',
    fontSize: 18, fontWeight: 500, color: 'var(--accent, oklch(0.45 0.08 150))',
    lineHeight: 1,
  },
  listItemBody: { minWidth: 0 },
  listItemTitle: {
    fontFamily: '"IBM Plex Sans", sans-serif',
    fontSize: 13, fontWeight: 500, color: '#1A1713',
    lineHeight: 1.35, marginBottom: 3,
    textWrap: 'pretty',
  },
  listItemMeta: {
    display: 'flex', gap: 6,
    fontFamily: '"IBM Plex Mono", monospace', fontSize: 10,
    color: '#8A7F73', textTransform: 'uppercase', letterSpacing: '0.08em',
  },
  listItemGlyphs: {
    display: 'flex', gap: 4, alignItems: 'center',
  },

  /* detail column */
  detailCol: {
    overflowY: 'auto',
    maxHeight: 'calc(100vh - 57px)',
    background: '#F6F2EC',
    minWidth: 0,
  },
  detailToolbar: {
    position: 'sticky', top: 0,
    display: 'flex', alignItems: 'center', gap: 10,
    padding: '10px 36px',
    background: 'rgba(246, 242, 236, 0.95)',
    backdropFilter: 'blur(8px)',
    borderBottom: '1px solid rgba(26,23,19,0.08)',
    zIndex: 5,
  },
  navBtn: {
    display: 'inline-flex', alignItems: 'center', gap: 6,
    padding: '6px 10px',
    background: '#FFFDF7',
    border: '1px solid rgba(26,23,19,0.12)',
    borderRadius: 2, cursor: 'pointer',
    fontSize: 12, color: '#3C352D',
  },
  layoutToggle: {
    marginLeft: 'auto',
    display: 'inline-flex',
    background: '#F1ECE3',
    borderRadius: 2,
    padding: 2,
  },
  layoutBtn: {
    padding: '5px 12px', border: 'none', background: 'transparent',
    fontFamily: '"IBM Plex Mono", monospace', fontSize: 10,
    textTransform: 'uppercase', letterSpacing: '0.12em',
    color: '#6B5E3C', cursor: 'pointer', borderRadius: 2,
  },
  layoutBtnActive: {
    padding: '5px 12px', border: 'none',
    background: '#FFFDF7',
    fontFamily: '"IBM Plex Mono", monospace', fontSize: 10,
    textTransform: 'uppercase', letterSpacing: '0.12em',
    color: '#1A1713', cursor: 'pointer', borderRadius: 2,
    fontWeight: 600,
  },
};
