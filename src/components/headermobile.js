import React, { useState } from "react"
import { Link } from "gatsby"
import { useLang } from '../context/LangContext'

function HeaderMobile() {
  const [open, setOpen] = useState(false)
  const { activeLang, switchLang } = useLang()

  return (
    <div id="mobile-topnav">
      <div className="mobile-topbar">
        <div className="mobile-logo" />
        <span className="mobile-brand">PROJECT MONOLITH</span>
        <button
          className={`burger-btn${open ? " burger-btn--open" : ""}`}
          onClick={() => setOpen(o => !o)}
          aria-label="Toggle menu"
        >
          <span /><span /><span />
        </button>
      </div>

      <div className={`mobile-menu${open ? " mobile-menu--open" : ""}`}>
        <Link to="/" className="mobile-nav-link" onClick={() => setOpen(false)}>HOME</Link>
        <Link to="/" className="mobile-nav-link" onClick={() => setOpen(false)}>DISCOGRAPHY</Link>
        <Link to="/cassette" className="mobile-nav-link" onClick={() => setOpen(false)}>CASSETTE</Link>
        <a href="https://darkroomlab.net" target="_blank" rel="noreferrer" className="mobile-nav-link mobile-nav-link--accent" onClick={e => e.currentTarget.blur()}>DARKROOM</a>
        <a href="https://www.youtube.com/channel/UC4IrptxENHzpZiOlIGSgPLQ" target="_blank" rel="noreferrer" className="mobile-nav-link mobile-nav-link--muted">YOUTUBE</a>
        <a href="https://monolithworldline.bandcamp.com/" target="_blank" rel="noreferrer" className="mobile-nav-link mobile-nav-link--muted">BANDCAMP</a>
        <div className="mobile-lang">
          <button className={`lang-btn${activeLang === "GEO" ? " lang-btn--active" : ""}`} onClick={() => switchLang("GEO")}>GEO</button>
          <button className={`lang-btn${activeLang === "ENG" ? " lang-btn--active" : ""}`} onClick={() => switchLang("ENG")}>ENG</button>
        </div>
      </div>
    </div>
  )
}

export default HeaderMobile
