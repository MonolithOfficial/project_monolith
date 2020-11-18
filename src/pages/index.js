import React, { useEffect, useState } from 'react';
import Img from 'gatsby-image'
import { useStaticQuery, graphql } from "gatsby"


import Layout from "../components/layout"
import SEO from "../components/seo"
import CustomAudioPlayer from "../components/customaudioplayer"
// import '../styles/swiper.scss'
import '../styles/index.scss'
import 'react-h5-audio-player/src/styles.scss';

import translation_geo from '../translations/georgian.json'

// import {translate} from '../helpers/translate.js'


// import mono_opt from '../images/sepia_two.jpg'
// import sec_two_bg from '../images/wd_black_white.jpg'
// import wd_cd_front2 from '../images/wd_cd_front2.png'
// import wd_cd_hd_back from '../images/wd_cd_hd_back.png'



export default function IndexPage() {
  const [activeLang, setActiveLang] = useState(localStorage.getItem("activeLang"))
  useEffect(() => {

    setActiveLang(localStorage.getItem("activeLang"))

  }, [])
  // translate("Darkroom")

  const data = useStaticQuery(graphql`
  query {
    placeholderImage: allFile(filter: { sourceInstanceName: { eq: "images" } }) {
      edges {
        node {
            relativePath
            name
            childImageSharp {
                fluid {
                    ...GatsbyImageSharpFluid
                }
            }
        }
      }
    }
  }
`)
  // console.log(data)
  const images = data.placeholderImage.edges? (
    data.placeholderImage.edges
  ) : (
    null
  )
  console.log(images);
  console.log(translation_geo.heading_text_ge);
  
  return (
    <Layout>
      <SEO title="Home" />
      <section className="section section-one">

      {/* <Parallax blur={0} bgImage={mono_opt} bgImageAlt="WD" strength={500} style={{overflow: "visible"}}> */}
          
          <div id="extended-header-holder">

            
            <div className="heading-text">
                {/* <h1><span>Project </span><span>Monolith </span><br/>
                <span>is </span><span>a </span>
                <span>music </span><span>production, </span><br/>
                <span>3D modeling </span>
                <span>& web </span><br/><span>development </span>
                <span>studio</span>

                </h1> */}
                <h1>
                  {
                    (() => {
                      if (activeLang === "GEO"){
                        return <div>
                           {/* {translation_geo.heading_text_ge} */}
                            <span>{translation_geo.heading_text_ge[0]}</span><span>{translation_geo.heading_text_ge[1]}</span><br/>
                            <span>{translation_geo.heading_text_ge[2]} </span><span>{translation_geo.heading_text_ge[3]}</span>
                            <span>{translation_geo.heading_text_ge[4]} </span><br /><span>{translation_geo.heading_text_ge[5]}</span><br/>
                            <span>{translation_geo.heading_text_ge[6]}</span>
                            <span>{translation_geo.heading_text_ge[7]}</span><br/><span>{translation_geo.heading_text_ge[8]}</span>
                            <span>{translation_geo.heading_text_ge[9]}</span>
                        </div>
                      }
                      else {
                        return (
                          <div>
                            <span>Project </span><span>Monolith </span><br/>
                            <span>is </span><span>a </span>
                            <span>music </span><span>production, </span><br/>
                            <span>3D modeling </span>
                            <span>& web </span><br/><span>development </span>
                            <span>studio</span>
                          </div>
                          
                        )
                      }
                    })()
                  }
                </h1>
            </div>
          </div>
        {/* </Parallax> */}
        
      </section>

      {/* <Parallax blur={0} bgImage={sec_two_bg} bgImageAlt="WD" strength={500} style={{zIndex: "0"}}> */}
        <div id="section-two-wrapper">
          <section className="section section-two">
            
            {/* <h1>{localStorage.getItem("activeLang")}</h1> */}
            <div className="sec-two-photo wd-1">
              {/* <Img fluid={images.find(n => {
                return n.node.relativePath.includes("wd_cd_out.png")
              }).node.childImageSharp.fluid}/> */}
            </div>

            

            <div className="sec-two-photo wd-2">
            {/* <Img fluid={images.find(n => {
                return n.node.relativePath.includes("wd_cd_hd_back.png")
              }).node.childImageSharp.fluid}/> */}
            </div>


            <div className="sec-two-photo wd-4">
            {/* <Img fluid={images.find(n => {
                return n.node.relativePath.includes("wd_cd_front2.png")
              }).node.childImageSharp.fluid}/> */}
            </div>

            <div className="sec-two-text wd-text">
            <h1>Worldline;Dead</h1>

              <div className="wd-paragraph">

                <p style={{marginBottom: "0px"}}>
                  {(() => {
                      if (activeLang === "GEO") {
                        return translation_geo.wd_p_1_geo.toString()
                      }
                      else {
                        return (
                          `This album was originally planned to be released under the title of “85” somewhere around January 2017,
                          but it was halted due to the lack of production value. Some tracks including
                          “Blood”, “Fg_32”, “Don’t Belong”, “Dirt” and “If I Disappear” were dropped
                          from the album never to be recovered. ‘Less? `
                        )
                      }
                  })()}
                </p>
                <p style={{marginTop: "0px", marginBottom: "0px"}}>
                  {(() => {
                      if (activeLang === "GEO") {
                        return translation_geo.wd_p_2_geo.toString()
                      }
                      else {
                        return (
                          `The intro to “Severity of Destiny” is a reference to a 1997 anime adaptation of Kentaro 
                          Miura’s “Berserk” manga series.
                          “The Impact” title refers to an event similar to an armageddon that’s described in “Neon
                          Genesis: Evangelion” which is also referred
                          to as “the impact”. `
                        )
                      }
                  })()}
                </p>
                <p style={{marginTop: "0px"}}>
                  {(() => {
                      if (activeLang === "GEO") {
                        return translation_geo.wd_p_3_geo.toString()
                      }
                      else {
                        return (
                          `It 
                          happened more than once in the anime, so it’d only be logical to expect a sequel to this track.
                          Some guitars on the album are real, some are not. `
                        )
                      }
                  })()}
                </p>

                <button onClick={(e) => {
                    let collapsible = e.target.nextElementSibling
                    let arrow = e.target.firstChild
                    console.log(collapsible)
                    if (collapsible.style.maxHeight !== "1000px") {
                        collapsible.style.maxHeight = "1000px"
                        arrow.style.transform = "rotate(90deg)"
                    }
                    else {
                      collapsible.style.maxHeight = "0px"
                      arrow.style.transform = "rotate(-90deg)"
                    }

                  
                  }}>
                  <svg width="50px" height="40px" viewBox="0 0 50 80" xml-space="preserve">
                    <polyline fill="none" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" points="
                  45.63,75.8 0.375,38.087 45.63,0.375 "/>
                  </svg> 
                </button>

                <div id="wd-text-collapsible">
                  <p>
                    {(() => {
                      if (activeLang === "GEO") {
                        return translation_geo.wd_p_4_geo.toString()
                      }
                      else {
                        return (
                          `Project Monolith was initially named “Webcrawler Torso”. The name change happened in 2014. 
                          “Watermelon’s Symphony” is a story about a man who
                          liked to
                          water
                          watermelons. `
                        )
                      }
                    })()}
                  </p>
                  
                  <p>
                    {(() => {
                        if (activeLang === "GEO") {
                          return translation_geo.wd_p_5_geo.toString()
                        }
                        else {
                          return (
                            `The first ever track produced by Monolith is actually the last track on this album - “Worldline;Dead”. 
                            It was recorded in late 2013. At the time I had’t yet watched it, but I still like to cite Steins;Gate 
                            as the main influence. The track was originally titled “Prologue One”, but after watchingSteins;Gate in 
                            2015, it sort of gained a new purpose and the meaning behind it changed. I substituted the title for 
                            “Worldline;Dead”, hence the album title.

                            At the time of creating this album, I wasn’t really in the know on a lot of things both musically
                            and structurally. Just
                            a newb. I like to thank Yesswear and Tsuki, fellow Darkroom members, for they’ve 
                            helped me develop as a producer and composer. Their styles are far from similar to 
                            mine, but there’s nothing better than to have peers criticize your work in an 
                            honest and unbiased way. I want to thank JustVasili for designing the front 
                            cover of “Worldline;Dead” and for being a major chess piece in the Dlab game. 

                            Anyway, I hope you like this, just a chat, truly yours, this is the 02, this is Monolith. `
                          )
                        }
                    })()}
                  </p>

                  
                </div>
                
              </div>  

            </div>

            <CustomAudioPlayer />

            <div className="sec-two-photo wd-3">
            {/* <Img fluid={images.find(n => {
                return n.node.relativePath.includes("wd_cd_layered.png")
              }).node.childImageSharp.fluid}/> */}
            </div>
          </section>

          <section className="section section-three">
              
          </section>
        </div>
        
      {/* </Parallax> */}


    </Layout>
  )
  
}

