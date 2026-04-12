import React, { useState, useEffect } from "react"
import { Link } from "gatsby"
import translation_geo from '../translations/georgian.json'
import logo from '../images/monolith_logo_transparent.png'
import { useLang } from '../context/LangContext'
import { useTheme } from '../context/ThemeContext'

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

const Header = () => {
  const { activeLang, switchLang } = useLang()
  const { monoMusicTheme, toggleMonoMusicTheme } = useTheme()
  const [isMonoMusic, setIsMonoMusic] = useState(false)

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsMonoMusic(window.location.pathname.startsWith("/blogs"))
    }
  }, [])

  return (
    <header id="main-header">
      <div className="header-left">
        <div className="header-logo"><img src={logo} alt="Monolith logo" /></div>
        <span className="header-brand">
          <span className={activeLang !== "GEO" ? "header-brand__hidden" : ""}>{`${translation_geo.heading_text_ge[0]}${translation_geo.heading_text_ge[1]}`}</span>
          <span className={activeLang !== "ENG" ? "header-brand__hidden" : ""}>Project Monolith</span>
        </span>
      </div>

      <nav className="header-nav">
        <Link to="/" className="nav-link">{activeLang === "GEO" ? translation_geo.home_geo : "HOME"}</Link>
        <span className="nav-dot">·</span>
        <Link to="/" className="nav-link">{activeLang === "GEO" ? translation_geo.discography_geo : "DISCOGRAPHY"}</Link>
        <span className="nav-dot">·</span>
        <Link to="/blogs" className="nav-link">{activeLang === "GEO" ? translation_geo.blog_geo : "BLOG"}</Link>
        <span className="nav-dot">·</span>
        <a href="https://darkroomlab.net" target="_blank" rel="noreferrer" className="nav-link nav-link--accent">
          {activeLang === "GEO" ? translation_geo.darkroom_geo : "DARKROOM"}
        </a>
      </nav>

      <div className="header-right">
        <div className="lang-switcher">
          <button
            className={`lang-btn${activeLang === "GEO" ? " lang-btn--active" : ""}`}
            onClick={() => switchLang("GEO")}
          >GEO</button>
          <button
            className={`lang-btn${activeLang === "ENG" ? " lang-btn--active" : ""}`}
            onClick={() => switchLang("ENG")}
          >ENG</button>
        </div>
        {isMonoMusic && (
          <>
            <div className="header-divider" />
            <button
              className="theme-toggle-btn"
              onClick={toggleMonoMusicTheme}
              aria-label={monoMusicTheme === "light" ? "Switch to dark mode" : "Switch to light mode"}
              title={monoMusicTheme === "light" ? "Switch to dark mode" : "Switch to light mode"}
            >
              {monoMusicTheme === "light" ? <MoonIcon /> : <SunIcon />}
            </button>
          </>
        )}
        <div className="header-divider" />
        <div className="header-ext-links">
          <a href="https://www.youtube.com/channel/UC4IrptxENHzpZiOlIGSgPLQ" target="_blank" rel="noreferrer" className="ext-link">YOUTUBE</a>
          <a href="https://monolithworldline.bandcamp.com/" target="_blank" rel="noreferrer" className="ext-link">BANDCAMP</a>
        </div>
      </div>
    </header>
  )
}

export default Header
