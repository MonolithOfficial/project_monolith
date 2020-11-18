import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"

import mono_opt from '../images/monolith.ico'
import eng_img from '../images/eng.png'
import geo_img from '../images/geo.png'

import { translate } from '../helpers/translate.js'

const Header = ({ siteTitle }) => (
  <header id="main-header">
    <div id="navbar">

      <div className="logo-holder">
        <div>
          <div href="#">
            <img width="64px" height="64px" src={mono_opt} alt="Monolith Logo"/>
            
          </div>
          <div style={{
            backgroundImage: `${(() => {
              if (localStorage.getItem("activeLang") === "GEO"){
                return `url(${geo_img})`
              }
              else {
                return `url(${eng_img})`
              }
            })()}`
          }} className="overlay" onClick={(e) => {
              if (localStorage.getItem("activeLang") === "GEO"){
                  localStorage.setItem("activeLang", "ENG")
                  e.target.style.backgroundImage = `url(${eng_img})`
                  console.log(localStorage.getItem("activeLang"))
                  window.location.reload();
              }
              else {
                  localStorage.setItem("activeLang", "GEO")
                  e.target.style.backgroundImage = `url(${geo_img})`
                  console.log(localStorage.getItem("activeLang"))
                  window.location.reload();
              }
              {/* localStorage.setItem("activeLang", "GEO");   */}
              {/* e.target.style.backgroundImage = `url(${eng_img})`    */}
            }}></div>
        </div>
        
      </div>

      <ul className="navLinks">
        <li><Link to="/">{translate("About")}</Link></li>
        <li><Link to="/">{translate("Projects")}</Link></li>
        <li><Link to="/">{translate("Contact")}</Link></li>
        <li><Link to="/">{translate("Darkroom")}</Link></li>
      </ul>
      
    </div>

    

    {/* <div id="typewrite heading">
      <div className="head_one">
        <h1>Project Monolith</h1>
      </div>
      <h1 className="head_two">is a music production, 3D modeling</h1>
      <h1 className="head_three">web development studio</h1>
    </div> */}
    
  </header>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
