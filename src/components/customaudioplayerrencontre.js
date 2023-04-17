import React, { useState } from 'react';
import AudioPlayer from 'react-h5-audio-player';
import { useStaticQuery, graphql } from "gatsby";
import Img from 'gatsby-image';

// Styles
import '../styles/audioplayer.scss';

import {translate} from '../helpers/translate.js'

// WORLDLINE;DEAD tracks
import narikala from '../audio/rencontre/narikala.mp3';
// import as_of_right_now from '../audio/as_of_right_now.mp3';
// import ominous from '../audio/ominous.mp3';
// import break_your_mind from '../audio/break_your_mind.mp3';
// import severity_of_destiny from '../audio/severity_of_destiny.mp3';
// import help_kill from '../audio/help_kill.mp3';
// import evildoers_dance from '../audio/evildoers_dance.mp3';
// import prying_eyes from '../audio/prying_eyes.mp3';
// import devils_hand from '../audio/devils_hand.mp3';
// import collapsing_structure from '../audio/collapsing_structure.mp3';
// import watermelons_symphony from '../audio/watermelons_symphony.mp3';
// import the_impact from '../audio/the_impact.mp3';
// import worldline_dead from '../audio/worldline_dead.mp3';

// Images


function CustomAudioPlayerRencontre() {

    // const [track, setTrack] = useState("/static/7a83b3ca96831316584345facca20b11/1_memories.mp3")
    const [track, setTrack] = useState(narikala)
    const [currentTrack, setCurrentTrack] = useState("Narikala");
    const [trackState, setTrackState] = useState(`${translate("Paused")} - `);
    

    const query = useStaticQuery(graphql`
        query {
            wd: allFile(filter: {extension: {regex: "/(mp3)/"}, relativeDirectory: {eq: "rencontre"}}, sort: {fields: name}) {
            edges {
                node {
                id
                relativePath
                publicURL
                }
            }
            
            }
            bg: file(relativePath: {eq: "Rencontre_front_cover.png"}) {
                id
                childImageSharp {
                    fluid {
                        ...GatsbyImageSharpFluid
                    }
                }
            }
            
        }
        
    `)

    // const image = useStaticQuery(graphql`
    //     query image {
            
    //     }
    // `)
    console.log(query)
    // console.log(query.allFile.edges[0].node);
    const nameArray = ["Narikala (Intro)", "Korvis the Robot", "Sarcophagus", "Monumentality", "Marionette", "Cryptic",
    "Minotaur", "Caucasus (Outro)"];
    // console.log(nameArray);
    const renderedAudioPlayer = query.wd.edges.length? (
        query.wd.edges.map((track, index) => {
            return ( 
                <div key={track.node.id} className="player-option" onClick={(e) => {
                    setTrack(track.node.publicURL)
                    const playerOptions = document.getElementsByClassName('player-option')
                    for (let i = 0; i < playerOptions.length; i++){
                        playerOptions[i].classList.remove('current-play')
                    }
                    setCurrentTrack(e.target.childNodes[1].innerText)
                    e.target.classList.add('current-play')
                    }}>
                    <div className="playlist-option-img-holder">
                        <Img fluid={query.bg.childImageSharp.fluid}/>
                    </div>
                    <p>{nameArray[index]}</p>
                </div>
            )
            
        })
    ) : (
        <h4>Loading, please stand by...</h4>
    )


    // const [isActive, setIsActive] = useState(document.getElementsByClassName('player-option')[0])
    // console.log(isActive)

    // isActive.classList.add('current-play')
    return (
        <div>
            
            {/* <p>{nameArray[0]}</p> */}
            <h3 className="now-playing-text">{trackState}{currentTrack}</h3>
            <AudioPlayer
                
                src={track}
                onPlay={e => setTrackState(`${translate("Playing")} - `)}
                onPause={e => setTrackState(`${translate("Paused")} - `)}
                // other props here
            />
            {/* <button onClick={() => {setTrack("/static/aacba67aef3763991af86a609e8326ff/2_as_of_right_now.mp3")}}>CHANGE TRACK</button> */}
            <div id="playlist">
                {renderedAudioPlayer}
            </div>
        </div>
    )
}

export default CustomAudioPlayerRencontre;
