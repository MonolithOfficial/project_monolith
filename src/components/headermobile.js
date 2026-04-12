import React, { useState, useEffect } from "react"
import { Link } from "gatsby"
import { useLang } from '../context/LangContext'
import { useTheme } from '../context/ThemeContext'
import translation_geo from '../translations/georgian.json'
import logo from '../images/monolith_logo_transparent.png'

const SunIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="7" cy="7" r="2.5" stroke="currentColor" strokeWidth="1.2"/>
    <line x1="7" y1="1" x2="7" y2="2.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
    <line x1="7" y1="11.5" x2="7" y2="13" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
    <line x1="1" y1="7" x2="2.5" y2="7" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
    <line x1="11.5" y1="7" x2="13" y2="7" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
    <line x1="2.75" y1="2.75" x2="3.8" y2="3.8" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
    <line x1="10.2" y1="10.2" x2="11.25" y2="11.25" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
    <line x1="11.25" y1="2.75" x2="10.2" y2="3.8" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
    <line x1="3.8" y1="10.2" x2="2.75" y2="11.25" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
  </svg>
)

const MoonIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 9A6 6 0 104.5 1.5a4.5 4.5 0 007.5 7.5z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

function HeaderMobile() {
  const [open, setOpen] = useState(false)
  const { activeLang, switchLang } = useLang()
  const { monoMusicTheme, toggleMonoMusicTheme } = useTheme()
  const [isMonoMusic, setIsMonoMusic] = useState(false)
  const geo = activeLang === "GEO"

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsMonoMusic(window.location.pathname.startsWith("/blogs"))
    }
  }, [])

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
          {isMonoMusic && (
            <button
              className="theme-toggle-btn theme-toggle-btn--mobile"
              onClick={toggleMonoMusicTheme}
              aria-label={monoMusicTheme === "light" ? "Switch to dark mode" : "Switch to light mode"}
            >
              {monoMusicTheme === "light" ? <MoonIcon /> : <SunIcon />}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default HeaderMobile
