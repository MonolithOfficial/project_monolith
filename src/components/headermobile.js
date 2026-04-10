import React, { useState } from "react"
import { Link } from "gatsby"
import { useLang } from '../context/LangContext'
import translation_geo from '../translations/georgian.json'
import logo from '../images/monolith_logo_transparent.png'

function HeaderMobile() {
  const [open, setOpen] = useState(false)
  const { activeLang, switchLang } = useLang()
  const geo = activeLang === "GEO"

  return (
    <div id="mobile-topnav">
      <div className="mobile-topbar">
        <div className="mobile-logo"><img src={logo} alt="Monolith logo" /></div>
        <span className="mobile-brand">
          {geo
            ? `${translation_geo.heading_text_ge[0]}${translation_geo.heading_text_ge[1]}`
            : "Project Monolith"}
        </span>
        <button
          className={`burger-btn${open ? " burger-btn--open" : ""}`}
          onClick={() => setOpen(o => !o)}
          aria-label="Toggle menu"
        >
          <span /><span /><span />
        </button>
      </div>

      <div className={`mobile-menu${open ? " mobile-menu--open" : ""}`}>
        <Link to="/" className="mobile-nav-link" onClick={() => setOpen(false)}>
          {geo ? translation_geo.home_geo : "HOME"}
        </Link>
        <Link to="/" className="mobile-nav-link" onClick={() => setOpen(false)}>
          {geo ? translation_geo.discography_geo : "DISCOGRAPHY"}
        </Link>
        <Link to="/blogs" className="mobile-nav-link" onClick={() => setOpen(false)}>
          {geo ? translation_geo.blog_geo : "BLOG"}
        </Link>
        <a href="https://darkroomlab.net" target="_blank" rel="noreferrer" className="mobile-nav-link mobile-nav-link--accent">
          {geo ? translation_geo.darkroom_geo : "DARKROOM"}
        </a>
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
