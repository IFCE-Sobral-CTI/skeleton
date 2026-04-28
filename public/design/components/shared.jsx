/* global React */

const I = ({ d, size = 18, fill = 'none', stroke = 'currentColor', sw = 1.75 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={fill} stroke={stroke}
       strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">{d}</svg>
);

const Icon = {
  home:(p)=><I {...p} d={<><path d="M3 11l9-8 9 8"/><path d="M5 10v10h14V10"/></>}/>,
  book:(p)=><I {...p} d={<><path d="M4 4h9a3 3 0 0 1 3 3v13H7a3 3 0 0 1-3-3V4z"/><path d="M16 4h4v13h-4"/></>}/>,
  file:(p)=><I {...p} d={<><path d="M14 3H6v18h12V7z"/><path d="M14 3v4h4"/></>}/>,
  calendar:(p)=><I {...p} d={<><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M8 3v4M16 3v4M3 10h18"/></>}/>,
  users:(p)=><I {...p} d={<><circle cx="9" cy="8" r="4"/><path d="M2 21a7 7 0 0 1 14 0"/><circle cx="17" cy="7" r="3"/><path d="M22 19a5 5 0 0 0-6-5"/></>}/>,
  bell:(p)=><I {...p} d={<><path d="M6 8a6 6 0 0 1 12 0c0 7 3 8 3 8H3s3-1 3-8z"/><path d="M10 21a2 2 0 0 0 4 0"/></>}/>,
  search:(p)=><I {...p} d={<><circle cx="11" cy="11" r="7"/><path d="M20 20l-3.5-3.5"/></>}/>,
  check:(p)=><I {...p} d={<path d="M5 12l5 5L20 7"/>}/>,
  alert:(p)=><I {...p} d={<><circle cx="12" cy="12" r="9"/><path d="M12 7v5M12 16h.01"/></>}/>,
  info:(p)=><I {...p} d={<><circle cx="12" cy="12" r="9"/><path d="M12 16V11M12 8h.01"/></>}/>,
  x:(p)=><I {...p} d={<><path d="M6 6l12 12M18 6l-12 12"/></>}/>,
  plus:(p)=><I {...p} d={<><path d="M12 5v14M5 12h14"/></>}/>,
  settings:(p)=><I {...p} d={<><circle cx="12" cy="12" r="3"/><path d="M12 3v2M12 19v2M5 12H3M21 12h-2M5.6 5.6l1.4 1.4M17 17l1.4 1.4M5.6 18.4L7 17M17 7l1.4-1.4"/></>}/>,
  clip:(p)=><I {...p} d={<><rect x="4" y="6" width="16" height="14" rx="2"/><path d="M8 6V4h8v2"/><path d="M8 12h8M8 16h5"/></>}/>,
  building:(p)=><I {...p} d={<><rect x="4" y="3" width="16" height="18"/><path d="M8 7h.01M12 7h.01M16 7h.01M8 11h.01M12 11h.01M16 11h.01M8 15h.01M12 15h.01M16 15h.01"/></>}/>,
  money:(p)=><I {...p} d={<><rect x="2" y="6" width="20" height="12" rx="2"/><circle cx="12" cy="12" r="3"/></>}/>,
  graduation:(p)=><I {...p} d={<><path d="M2 9l10-5 10 5-10 5z"/><path d="M6 11v5a6 6 0 0 0 12 0v-5"/></>}/>,
  chevronDown:(p)=><I {...p} d={<path d="M6 9l6 6 6-6"/>}/>,
  chevronLeft:(p)=><I {...p} d={<path d="M15 18l-6-6 6-6"/>}/>,
  chevronRight:(p)=><I {...p} d={<path d="M9 6l6 6-6 6"/>}/>,
  mountain:(p)=><I {...p} d={<path d="M3 20l6-10 4 6 3-4 5 8z"/>}/>,
  download:(p)=><I {...p} d={<><path d="M12 3v12"/><path d="M7 10l5 5 5-5"/><path d="M4 21h16"/></>}/>,
  filter:(p)=><I {...p} d={<path d="M4 4h16l-6 8v6l-4 2v-8z"/>}/>,
  more:(p)=><I {...p} d={<><circle cx="5" cy="12" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/></>}/>,
  upload:(p)=><I {...p} d={<><path d="M12 19V7"/><path d="M7 12l5-5 5 5"/><path d="M4 21h16"/></>}/>,
  mail:(p)=><I {...p} d={<><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 7 9-7"/></>}/>,
  atom:(p)=><I {...p} d={<><circle cx="12" cy="12" r="1.5"/><ellipse cx="12" cy="12" rx="10" ry="4"/><ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(60 12 12)"/><ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(120 12 12)"/></>}/>,
  molecule:(p)=><I {...p} d={<><circle cx="6" cy="18" r="3"/><circle cx="18" cy="6" r="3"/><circle cx="6" cy="6" r="2"/><path d="M8 16l8-8M7 8v7M8 6h8"/></>}/>,
  organism:(p)=><I {...p} d={<><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 9v12"/></>}/>,
  template:(p)=><I {...p} d={<><rect x="3" y="3" width="18" height="4" rx="1"/><rect x="3" y="10" width="8" height="11" rx="1"/><rect x="13" y="10" width="8" height="11" rx="1"/></>}/>,
  page:(p)=><I {...p} d={<><rect x="4" y="3" width="16" height="18" rx="2"/><path d="M8 8h8M8 12h8M8 16h5"/></>}/>,
};

function BrandSymbol({ inverse = false, size = 28 }) {
  const fg = inverse ? '#fff' : 'var(--green-500)';
  const accent = 'var(--red-500)';
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" aria-hidden="true">
      <circle cx="16" cy="16" r="15" fill="none" stroke={fg} strokeWidth="2"/>
      <rect x="9" y="9" width="5" height="5" rx="1" fill={fg}/>
      <rect x="15.5" y="9" width="5" height="5" rx="1" fill={fg}/>
      <rect x="9" y="15.5" width="5" height="5" rx="1" fill={fg}/>
      <rect x="15.5" y="15.5" width="5" height="5" rx="1" fill={accent}/>
      <rect x="9" y="22" width="5" height="2.5" rx="1" fill={fg}/>
    </svg>
  );
}

function BrandLockup({ compact = false, inverse = false }) {
  const color = inverse ? '#fff' : 'var(--neutral-900)';
  const sub = inverse ? 'rgba(255,255,255,0.85)' : 'var(--neutral-600)';
  return (
    <div style={{display:'flex', alignItems:'center', gap: 10}}>
      <BrandSymbol inverse={inverse}/>
      <div style={{display:'flex', flexDirection:'column', lineHeight:1.05}}>
        <span style={{fontSize: compact ? 10 : 11, fontWeight: 800, letterSpacing:'0.14em', color, textTransform:'uppercase'}}>Instituto Federal</span>
        <span style={{fontSize: compact ? 12 : 13, fontWeight: 700, color, marginTop: 2}}>Ceará</span>
        {!compact && <span style={{fontSize: 10, color: sub, marginTop: 3, letterSpacing:'0.04em'}}>Campus Sobral</span>}
      </div>
    </div>
  );
}

function AtomicNav({ active }) {
  const items = [
    ['index.html', 'home', 'Visão geral', Icon.home],
    ['atoms.html', 'atoms', 'Átomos', Icon.atom],
    ['molecules.html', 'molecules', 'Moléculas', Icon.molecule],
    ['organisms.html', 'organisms', 'Organismos', Icon.organism],
    ['templates.html', 'templates', 'Templates', Icon.template],
    ['pages.html', 'pages', 'Páginas', Icon.page],
  ];
  return (
    <nav className="ds-nav">
      <div className="brand-block">
        <BrandSymbol size={34}/>
        <div className="sig">
          <strong>IFCE · Sobral</strong>
          <span>Design System</span>
        </div>
      </div>
      <h1>Atomic Design</h1>
      <ul>
        {items.map(([href, id, label, Ic]) => (
          <li key={id}>
            <a href={href} className={active===id?'active':''}>
              <Ic size={16}/> {label}
            </a>
          </li>
        ))}
      </ul>

      <div className="nav-section">Fundamentos</div>
      <ul>
        <li><a href="atoms.html#cores">Cores</a></li>
        <li><a href="atoms.html#tipografia">Tipografia</a></li>
        <li><a href="atoms.html#espacamento">Espaçamento</a></li>
        <li><a href="atoms.html#elevacao">Elevação</a></li>
        <li><a href="atoms.html#sobral">Sotaque Sobral</a></li>
      </ul>

      <div style={{marginTop:40, paddingTop:20, borderTop:'1px solid var(--border-subtle)',
                   fontSize:11, color:'var(--text-tertiary)', lineHeight:1.5}}>
        v2.0 · Atomic Design<br/>
        Manual IF 2015 · Guia Rede Federal 2024
      </div>
    </nav>
  );
}

function PageHero({ eyebrow, title, lead, meta }) {
  return (
    <header className="ds-hero">
      <span className="eyebrow"><BrandSymbol size={14}/> {eyebrow}</span>
      <h1>{title}</h1>
      <p className="lead">{lead}</p>
      {meta && (
        <div className="meta-row">
          {meta.map(([k,v]) => (
            <div key={k} className="meta"><strong>{k}</strong><span>{v}</span></div>
          ))}
        </div>
      )}
    </header>
  );
}

function PageFooterNav({ prev, next }) {
  return (
    <div style={{
      display:'grid', gridTemplateColumns:'1fr 1fr', gap:16,
      padding:'48px var(--space-12)', borderTop:'1px solid var(--border-subtle)',
      background:'var(--neutral-0)'
    }}>
      {prev ? (
        <a href={prev[0]} style={{display:'flex', flexDirection:'column', padding:20,
          border:'1px solid var(--border-subtle)', borderRadius:8, textDecoration:'none'}}>
          <span style={{fontSize:11, letterSpacing:'0.08em', textTransform:'uppercase',
                        color:'var(--text-tertiary)', fontWeight:700}}>← Anterior</span>
          <span style={{fontSize:16, fontWeight:700, color:'var(--neutral-900)', marginTop:4}}>{prev[1]}</span>
        </a>
      ) : <div/>}
      {next ? (
        <a href={next[0]} style={{display:'flex', flexDirection:'column', padding:20, textAlign:'right',
          border:'1px solid var(--border-subtle)', borderRadius:8, textDecoration:'none'}}>
          <span style={{fontSize:11, letterSpacing:'0.08em', textTransform:'uppercase',
                        color:'var(--text-tertiary)', fontWeight:700}}>Próximo →</span>
          <span style={{fontSize:16, fontWeight:700, color:'var(--green-700)', marginTop:4}}>{next[1]}</span>
        </a>
      ) : <div/>}
    </div>
  );
}

function Block({ title, description, code, children, plain = true }) {
  return (
    <div style={{marginBottom: 40}}>
      <div style={{marginBottom: 12}}>
        <div className="ds-sub" style={{margin:0}}>{title}</div>
        {description && <p className="muted" style={{fontSize:13, marginTop:4, maxWidth:680}}>{description}</p>}
      </div>
      <div className="example">
        <div className={`example-body ${plain?'plain':''}`}>{children}</div>
        {code && <div className="example-footer">{code}</div>}
      </div>
    </div>
  );
}

function SectionHead({ num, title, desc }) {
  return (
    <div style={{marginBottom: 32}}>
      <div className="ds-section-head">
        <span className="num">{num}</span>
        <h2>{title}</h2>
        <div className="rule"/>
      </div>
      {desc && <p className="ds-section-intro">{desc}</p>}
    </div>
  );
}

window.Icon = Icon;
window.BrandSymbol = BrandSymbol;
window.BrandLockup = BrandLockup;
window.AtomicNav = AtomicNav;
window.PageHero = PageHero;
window.PageFooterNav = PageFooterNav;
window.Block = Block;
window.SectionHead = SectionHead;
