// Glossary shell — browse + search + detail. One page, route-by-state.
// Uses iconify-icon web component for glyphs; replace tags with <img> later
// if you want to sub in Noun Project SVGs 1:1.

const { useState, useMemo, useEffect, useRef } = React;

function Glossary() {
  const [selectedCode, setSelectedCode] = useState(window.TEKS[1].code); // 1B default
  const [query, setQuery] = useState('');
  const [courseFilter, setCourseFilter] = useState('110.36');
  const [strandFilter, setStrandFilter] = useState(null);
  const [detailLayout, setDetailLayout] = useState('dashboard'); // or 'notebook'

  const tekMap = useMemo(() => Object.fromEntries(window.TEKS.map(t => [t.code, t])), []);
  const current = tekMap[selectedCode];

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return window.TEKS.filter(t => {
      if (courseFilter && t.courseCode !== courseFilter) return false;
      if (strandFilter && t.strand !== strandFilter) return false;
      if (!q) return true;
      return (
        t.code.toLowerCase().includes(q) ||
        t.title.toLowerCase().includes(q) ||
        t.expectation.toLowerCase().includes(q) ||
        t.tags.some(x => x.toLowerCase().includes(q))
      );
    });
  }, [query, courseFilter, strandFilter]);

  // keyboard nav: ↑/↓ between filtered TEKs, / to focus search
  const searchRef = useRef(null);
  useEffect(() => {
    const onKey = (e) => {
      if (e.target.tagName === 'INPUT') {
        if (e.key === 'Escape') { e.target.blur(); }
        return;
      }
      if (e.key === '/') { e.preventDefault(); searchRef.current?.focus(); return; }
      if (e.key === 'ArrowDown' || e.key === 'j') {
        e.preventDefault();
        const i = filtered.findIndex(t => t.code === selectedCode);
        const next = filtered[Math.min(filtered.length - 1, i + 1)];
        if (next) setSelectedCode(next.code);
      }
      if (e.key === 'ArrowUp' || e.key === 'k') {
        e.preventDefault();
        const i = filtered.findIndex(t => t.code === selectedCode);
        const next = filtered[Math.max(0, i - 1)];
        if (next) setSelectedCode(next.code);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [filtered, selectedCode]);

  return (
    <div style={gx.shell}>
      <TopBar query={query} setQuery={setQuery} searchRef={searchRef} />
      <div style={gx.body}>
        <SideBar
          courseFilter={courseFilter}
          setCourseFilter={setCourseFilter}
          strandFilter={strandFilter}
          setStrandFilter={setStrandFilter}
          count={filtered.length}
        />
        <ListColumn
          list={filtered}
          selectedCode={selectedCode}
          onSelect={setSelectedCode}
        />
        <DetailColumn
          tek={current}
          layout={detailLayout}
          setLayout={setDetailLayout}
          allCodes={filtered.map(t => t.code)}
          onNav={(dir) => {
            const i = filtered.findIndex(t => t.code === selectedCode);
            const next = filtered[Math.max(0, Math.min(filtered.length - 1, i + dir))];
            if (next) setSelectedCode(next.code);
          }}
        />
      </div>
    </div>
  );
}

/* ──────────────────────────── TOP BAR ──────────────────────────── */
function TopBar({ query, setQuery, searchRef }) {
  return (
    <header style={gx.topbar}>
      <div style={gx.brand}>
        <span style={gx.brandMark}><iconify-icon icon="tabler:diamond" width="14" /></span>
        <span style={{ fontFamily: '"Source Serif 4", Georgia, serif', fontSize: 16, fontWeight: 500 }}>
          Kaizen.School
        </span>
        <span style={gx.brandDivider}>/</span>
        <span style={{ fontSize: 13, color: '#6B5E3C' }}>Texas TEKS · Glossary</span>
      </div>
      <div style={gx.search}>
        <iconify-icon icon="tabler:search" width="14" style={{ color: '#8A7F73' }} />
        <input
          ref={searchRef}
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Search by code, title, or keyword…"
          style={gx.searchInput}
        />
        <span style={gx.searchKbd}>/</span>
      </div>
      <div style={gx.topRight}>
        <a style={gx.topLink}>Planner</a>
        <a style={gx.topLink}>Assessments</a>
        <a style={gx.topLinkActive}>Glossary</a>
        <span style={gx.avatar}>MB</span>
      </div>
    </header>
  );
}

/* ──────────────────────────── SIDEBAR ──────────────────────────── */
function SideBar({ courseFilter, setCourseFilter, strandFilter, setStrandFilter, count }) {
  const courses = [
    ['110.36', 'English I', 36],
    ['110.37', 'English II', 36],
    ['110.38', 'English III', 36],
    ['110.39', 'English IV', 36],
  ];
  return (
    <aside style={gx.sidebar}>
      <div style={gx.sideSection}>
        <div style={gx.sideLabel}>Course</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {courses.map(([code, name, n]) => {
            const active = code === courseFilter;
            return (
              <button
                key={code}
                onClick={() => setCourseFilter(active ? null : code)}
                style={active ? gx.courseActive : gx.course}
              >
                <span style={gx.courseCode}>{code}</span>
                <span>{name}</span>
                <span style={gx.courseCount}>{n}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div style={gx.sideSection}>
        <div style={gx.sideLabel}>Strand</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <button
            onClick={() => setStrandFilter(null)}
            style={!strandFilter ? gx.strandActive : gx.strand}
          >
            <iconify-icon icon="tabler:layout-grid" width="14" />
            <span>All strands</span>
            <span style={gx.courseCount}>{count}</span>
          </button>
          {window.STRANDS.map(s => {
            const active = strandFilter === s.name;
            return (
              <button
                key={s.name}
                onClick={() => setStrandFilter(active ? null : s.name)}
                style={active ? gx.strandActive : gx.strand}
              >
                <iconify-icon icon={s.icon} width="14" />
                <span style={{ textAlign: 'left', flex: 1, lineHeight: 1.3 }}>{s.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div style={gx.sideFootnote}>
        <iconify-icon icon="tabler:keyboard" width="12" />
        <span>↑↓ navigate · / search · 1–4 tabs</span>
      </div>
    </aside>
  );
}

/* ──────────────────────────── LIST COLUMN ──────────────────────────── */
function ListColumn({ list, selectedCode, onSelect }) {
  // group by strand to create a clear index feel
  const groups = useMemo(() => {
    const g = {};
    list.forEach(t => { (g[t.strand] ||= []).push(t); });
    return g;
  }, [list]);

  return (
    <div style={gx.listCol}>
      <div style={gx.listHead}>
        <span style={gx.listHeadTitle}>{list.length} TEKs</span>
        <span style={gx.listHeadHint}>click or ↑↓</span>
      </div>
      <div style={gx.listScroll}>
        {Object.entries(groups).map(([strand, items]) => (
          <div key={strand} style={gx.listGroup}>
            <div style={gx.listGroupHead}>{strand}</div>
            {items.map(t => (
              <button
                key={t.code}
                onClick={() => onSelect(t.code)}
                style={t.code === selectedCode ? gx.listItemActive : gx.listItem}
              >
                <span style={gx.listItemCode}>{t.letter}</span>
                <div style={gx.listItemBody}>
                  <div style={gx.listItemTitle}>{t.title}</div>
                  <div style={gx.listItemMeta}>
                    <span>DOK {t.dok}</span>
                    <span style={{ opacity: 0.35 }}>·</span>
                    <span>{t.substrand}</span>
                  </div>
                </div>
                <div style={gx.listItemGlyphs}>
                  {t.glyphs.slice(0, 2).map((g, i) => (
                    <iconify-icon key={i} icon={g} width="14" style={{ color: '#8A7F73' }} />
                  ))}
                </div>
              </button>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

window.Glossary = Glossary;
