import React, { useState, useEffect } from "react"
import { Link } from "gatsby"
import translation_geo from '../translations/georgian.json'
import logo from '../images/monolith_logo_transparent.png'

const Header = () => {
  const [activeLang, setActiveLang] = useState("GEO")

  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("activeLang")
      if (stored) setActiveLang(stored)
    }
  }, [])

  const switchLang = (lang) => {
    if (typeof window !== "undefined" && localStorage.getItem("activeLang") !== lang) {
      localStorage.setItem("activeLang", lang)
      window.location.reload()
    }
  }

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
        <Link to="/" className="nav-link">{(() => {
                        if (activeLang === "GEO") {
                          return `${translation_geo.home_geo}`
                        }
                        else {
                          return (
                            `HOME`
                          )
                        }
                    })()}</Link>
        <span className="nav-dot">·</span>
        <Link to="/" className="nav-link">{(() => {
                        if (activeLang === "GEO") {
                          return `${translation_geo.discography_geo}`
                        }
                        else {
                          return (
                            `DISCOGRAPHY`
                          )
                        }
                    })()}</Link>
        <span className="nav-dot">·</span>
        <Link to="/cassette" className="nav-link">{(() => {
                        if (activeLang === "GEO") {
                          return `${translation_geo.blog_geo}`
                        }
                        else {
                          return (
                            `BLOG`
                          )
                        }
                    })()}</Link>
        <span className="nav-dot">·</span>
        <a href="https://darkroomlab.net" target="_blank" rel="noreferrer" className="nav-link nav-link--accent">{(() => {
                        if (activeLang === "GEO") {
                          return `${translation_geo.darkroom_geo}`
                        }
                        else {
                          return (
                            `DARKROOM`
                          )
                        }
                    })()}</a>
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
