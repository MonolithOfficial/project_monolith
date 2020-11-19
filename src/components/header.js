import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"

import mono_opt from '../images/monolith.jpg'
import eng_img from '../images/eng.png'
import geo_img from '../images/geo.png'

import { translate } from '../helpers/translate.js'

const Header = ({ siteTitle }) => (
  <header id="main-header">
    <div id="navbar">
    <div className="language-dropdown">
        <div className="logo-holder">
            <div>
              <img width="64px" height="64px" src={mono_opt} alt="Monolith Logo"/>
              
            </div>
            {/* <div className="overlay" onClick={(e) => { */}
                {/* if (typeof window !== 'undefined') {
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
                } else {
                    console.log('we are running on the server');
                } */}
                {/* console.log("ey, im deprecated") */}
                
              {/* }}></div> */}
              
                <div class="dropdown-content">
                  <img src={geo_img} alt="GEO"
                  onClick={(e) => {
                      if (typeof window !== 'undefined') {
                        if (localStorage.getItem("activeLang") !== "GEO"){
                            localStorage.setItem("activeLang", "GEO")
                            console.log(localStorage.getItem("activeLang"))
                            window.location.reload();
                          }
                      } else {
                          console.log('we are running on the server');
                      }
                  }}
                  
                  />
                  <img src={eng_img} alt="ENG"
                  onClick={(e) => {
                      if (typeof window !== 'undefined') {
                        if (localStorage.getItem("activeLang") !== "ENG"){
                            localStorage.setItem("activeLang", "ENG")
                            console.log(localStorage.getItem("activeLang"))
                            window.location.reload();
                          }
                      } else {
                          console.log('we are running on the server');
                      }
                  }}
                  
                  />
                </div>
              
          
        </div>
      </div>

      <ul className="navLinks">
        <li><Link to="/">{translate("About")}</Link></li>
        <li><Link to="/">{translate("Projects")}</Link></li>
        <li><Link to="/">{translate("Contact")}</Link></li>
        <li><Link to="/">{translate("Darkroom")}</Link></li>
      </ul>
      
    </div>

  
    
  </header>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
