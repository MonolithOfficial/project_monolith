import React from "react"
import PropTypes from "prop-types"

import Header from "../components/header"
import HeaderMobile from "../components/headermobile"
import { useLang } from "../context/LangContext"

import "../styles/layout.scss"

function LayoutInner({ children }) {
  const { transitioning } = useLang()
  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Anton&family=Inter:wght@400;700&family=Nanum+Gothic:wght@400;700&display=swap"
        rel="stylesheet"
      />
      <div>
        <Header />
        <HeaderMobile />
        <main className={transitioning ? "lang-fade" : ""}>{children}</main>
        <footer id="site-footer">
          <div className="footer-main">
            <div className="footer-col footer-col--brand">
              <div className="footer-brand-row">
                <div className="footer-logo" />
                <span className="footer-brand-name">PROJECT MONOLITH</span>
              </div>
              <span className="footer-sub">A DARKROOM PRODUCTION</span>
              <span className="footer-tagline">Music · Design · Experience</span>
              <div className="footer-yellow-rule" />
              <span className="footer-est">EST. 2013 · TBILISI</span>
            </div>

            <div className="footer-col footer-col--disc">
              <span className="footer-col-label">DISCOGRAPHY</span>
              <div className="footer-col-rule" />
              <span className="footer-album">Worldline;Dead <span className="footer-year">2018</span></span>
              <span className="footer-album">Rencontre <span className="footer-year">2023</span></span>
              <span className="footer-album">A System Message <span className="footer-year">2023</span></span>
            </div>

            <div className="footer-col footer-col--links">
              <span className="footer-col-label">LINKS</span>
              <div className="footer-col-rule" />
              <a href="https://www.youtube.com/channel/UC4IrptxENHzpZiOlIGSgPLQ" target="_blank" rel="noreferrer" className="footer-link">YouTube →</a>
              <a href="https://monolithworldline.bandcamp.com/" target="_blank" rel="noreferrer" className="footer-link">Bandcamp →</a>
              <a href="https://darkroomlab.net" target="_blank" rel="noreferrer" className="footer-link footer-link--accent">Darkroom →</a>
            </div>
          </div>

          <div className="footer-bottom">
            <span>© 2024 DARKROOM · PROJECT MONOLITH</span>
            <span>ALL RIGHTS RESERVED</span>
          </div>
        </footer>
      </div>
    </>
  )
}

const Layout = ({ children }) => <LayoutInner>{children}</LayoutInner>

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
