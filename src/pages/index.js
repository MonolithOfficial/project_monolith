import React, { useEffect, useState } from 'react';
import Img from 'gatsby-image'
import { useStaticQuery, graphql } from "gatsby"


import Layout from "../components/layout"
import SEO from "../components/seo"
import CustomAudioPlayer from "../components/customaudioplayer"
import CustomAudioPlayerRencontre from "../components/customaudioplayerrencontre"
import CustomAudioPlayerASM from "../components/customaudioplayerasm"

// import '../styles/swiper.scss'
import '../styles/index.scss'
// import 'react-h5-audio-player/src/styles.scss';

import translation_geo from '../translations/georgian.json'

// import {translate} from '../helpers/translate.js'


// import mono_opt from '../images/sepia_two.jpg'
// import sec_two_bg from '../images/wd_black_white.jpg'
// import wd_cd_front2 from '../images/wd_cd_front2.png'
// import wd_cd_hd_back from '../images/wd_cd_hd_back.png'



export default function IndexPage() {
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const [activeLang, setActiveLang] = useState(() => {
    if (typeof window !== 'undefined'){
      return (
        localStorage.getItem("activeLang")
      )
    }
    else {
      if (!(timezone == "Asia/Baku")){
        return "ENG"
      }
      else {
        return "GEO"
      }
    }
  })
  useEffect(() => {

    if (typeof window !== 'undefined') {
        setActiveLang(localStorage.getItem("activeLang"))
    } else {
        console.log('we are running on the server');
    }
    

  }, [])
  // translate("Darkroom")

  const data = useStaticQuery(graphql`
  query {
    placeholderImage: allFile(filter: { extension: {regex: "/(png)/"}, sourceInstanceName: { eq: "images" } }) {
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
  // console.log(images);
  // console.log(translation_geo.heading_text_ge);
  
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
                            <span>{translation_geo.heading_text_ge[0]}</span><span>{translation_geo.heading_text_ge[1]}</span><hr/>

                            {/* <span>{translation_geo.heading_text_ge[2]} </span><span>{translation_geo.heading_text_ge[3]}</span>
                            <span>{translation_geo.heading_text_ge[4]} </span><br /><span>{translation_geo.heading_text_ge[5]}</span><br/>
                            <span>{translation_geo.heading_text_ge[6]}</span>
                            <span>{translation_geo.heading_text_ge[7]}</span><br/><span>{translation_geo.heading_text_ge[8]}</span>
                            <span>{translation_geo.heading_text_ge[9]}</span> */}
                        </div>
                      }
                      else {
                        return (
                          <div>
                            <span>Project </span><span>Monolith </span><hr/>
                            {/* <span style={{lineHeight: "2rem"}}>Presented By<br/>Darkroom Member 002</span> */}
                            {/* <span>is </span><span>a </span>
                            <span>music </span><span>production, </span><br/>
                            <span>3D modeling </span>
                            <span>& web </span><br/><span>development </span>
                            <span>vault</span> */}
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
              <Img fluid={images.find(n => {
                return n.node.relativePath.includes("wd_cd_out.png")
              }).node.childImageSharp.fluid}/>
            </div>

            

            <div className="sec-two-photo wd-2">
            <Img fluid={images.find(n => {
                return n.node.relativePath.includes("wd_cd_hd_back.png")
              }).node.childImageSharp.fluid}/>
            </div>


            <div className="sec-two-photo wd-4">
            <Img fluid={images.find(n => {
                return n.node.relativePath.includes("wd_cd_front2.png")
              }).node.childImageSharp.fluid}/>
            </div>

            <div className="sec-two-text wd-text">
            <h1>Worldline;Dead<span className='releaseDate'> 31/07/2018</span></h1>

              <div className="wd-paragraph">

                <p style={{marginBottom: "0px"}}>
                  {(() => {
                      if (activeLang === "GEO") {
                        return translation_geo.wd_p_1_geo.toString()
                      }
                      else {
                        return (
                          `“Worldline;Dead” started out as an individual track, “Prologue One” in late 2013. The last track heard on this album is that very recording. A halt then followed, leaving the album shelved until early 2017. `
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
                          `A sunny view of a cloud hanging over a mountain seen on the back of “Worldline;Dead” CD signifies a feeling specific to anyone hearing the tracks. A darkened space with a ray of light in the distance is seen differently by everyone. Both sides of the CD have been altered for this site.`
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
                          `Why do things that happen, happen? “Worldline;Dead” just happened and its signature sound was lost forever. The very first track published by Monolith after the release of “Worldline;Dead” sounded nothing like the first album. Nothing published ever since did.`
                        )
                      }
                  })()}
                </p>

                <button onClick={(e) => {
                    let collapsible = e.target.nextElementSibling
                    let arrow = e.target.firstChild
                    // console.log(collapsible)
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
                  <p style={{marginTop: "0px"}}>
                    {(() => {
                        if (activeLang === "GEO") {
                          return translation_geo.wd_p_4_geo.toString()
                        }
                        else {
                          return (
                            `It's been said that Worldline;Dead has a secret 14th track.`
                          )
                        }
                    })()}
                  </p>
                </div>
                
              </div>  

            </div>

            <CustomAudioPlayer />

            <div className="sec-two-photo wd-3">
            <Img fluid={images.find(n => {
                return n.node.relativePath.includes("wd_cd_layered.png")
              }).node.childImageSharp.fluid}/>
            </div>
          </section>
        </div>
        <div id="section-three-wrapper">
          <section className="section section-three">
            <div className='rencontreBanner'>
            {/* <Img fluid={images.find(n => {
                return n.node.relativePath.includes("Rencontre_front_cover.png")
              }).node.childImageSharp.fluid}/> */}
            </div>
            <div className="sec-three-text rencontre-text">
              <div className="rencontre-paragraph">
                <h1>Rencontre<span className='releaseDate'> 23/03/2023</span></h1>
                <p style={{marginBottom: "0px"}}>
                    {(() => {
                        if (activeLang === "GEO") {
                          return translation_geo.renc_p1_geo.toString()
                        }
                        else {
                          return (
                            `"Rencontre" resembles an encouter with someone or something, be it familiar or not. What is a minotaur, or a marionette if not associations in our minds. What does Korvis even stand for? The listener holds the power not to guess, but to connect. What would a sarcophagus mean to you?`
                          )
                        }
                    })()}
                  </p>

                  <p style={{marginBottom: "0px"}}>
                    {(() => {
                        if (activeLang === "GEO") {
                          return translation_geo.renc_p2_geo.toString()
                        }
                        else {
                          return (
                            `Moving on from "Worldline;Dead", this album proceeds to savagely stab its past into inexistence. Rising up from the flames of over 2 hours worth of demos, whilst being only 23 minutes long, roughly 3 times shorter than its predecessor, "Rencontre" sets out for a faster impression.`
                          )
                        }
                    })()}
                  </p>

                  {/* <p style={{marginBottom: "0px"}}>
                    {(() => {
                        if (activeLang === "GEO") {
                          return translation_geo.renc_p3_geo.toString()
                        }
                        else {
                          return (
                            `Narikala and Caucasus are two real locations giving "Rencontre" a sense of confinement, its home. That which is the origin of power.`
                          )
                        }
                    })()}
                  </p> */}
              </div>
            </div>
            
            <CustomAudioPlayerRencontre />
                {/* <div className="imageHolder pillarImgLeft">
                  <Img fluid={images.find(n => {
                    return n.node.relativePath.includes("dlab_logo_render_orange.png")
                  }).node.childImageSharp.fluid}/>
                </div>
                <div className="imageHolder pillarImgRight">
                  <Img fluid={images.find(n => {
                    return n.node.relativePath.includes("dlab_logo_render_orange_flp.png")
                  }).node.childImageSharp.fluid}/>
                </div> */}
          </section>
        </div>
        <div id="section-four-wrapper">
          <section className="section section-four">
            <div className='asmBanner'>
            {/* <Img fluid={images.find(n => {
                return n.node.relativePath.includes("Rencontre_front_cover.png")
              }).node.childImageSharp.fluid}/> */}
            </div>
            <div className="sec-three-text asm-text">
              <div className="asm-paragraph">
                <h1>A System Message<span className='releaseDate'> 23/04/2023</span></h1>
                <p style={{marginBottom: "0px"}}>
                    {(() => {
                        if (activeLang === "GEO") {
                          return translation_geo.asm_p1_geo.toString()
                        }
                        else {
                          return (
                            `"A System Message" can be an system update notification that you receive on your smartphone. Usually it's formatted in a way so that you cannot unsee it. What if the content of this notification isn't exaclty about an update, a bit more ominous than that, it is a WARNING.`
                          )
                        }
                    })()}
                  </p>

                  <p style={{marginBottom: "0px"}}>
                    {(() => {
                        if (activeLang === "GEO") {
                          return translation_geo.asm_p2_geo.toString()
                        }
                        else {
                          return (
                            `Be sure to check your System Messages.`
                          )
                        }
                    })()}
                  </p>

                  {/* <p style={{marginBottom: "0px"}}>
                    {(() => {
                        if (activeLang === "GEO") {
                          return translation_geo.renc_p3_geo.toString()
                        }
                        else {
                          return (
                            `Narikala and Caucasus are two real locations giving "Rencontre" a sense of confinement, its home. That which is the origin of power.`
                          )
                        }
                    })()}
                  </p> */}
              </div>
            </div>
            
            <CustomAudioPlayerASM />
                {/* <div className="imageHolder pillarImgLeft">
                  <Img fluid={images.find(n => {
                    return n.node.relativePath.includes("dlab_logo_render_orange.png")
                  }).node.childImageSharp.fluid}/>
                </div>
                <div className="imageHolder pillarImgRight">
                  <Img fluid={images.find(n => {
                    return n.node.relativePath.includes("dlab_logo_render_orange_flp.png")
                  }).node.childImageSharp.fluid}/>
                </div> */}
          </section>
          <footer id='footer'>
            <p>Created by Darkroom | Project Monolith</p>
          </footer>
        </div>
        
      {/* </Parallax> */}


    </Layout>
  )
  
}

