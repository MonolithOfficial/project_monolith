import React, { useState } from 'react';
import AudioPlayer from 'react-h5-audio-player';
import { useStaticQuery, graphql } from "gatsby";
import Image from '../components/image';

// Styles
import 'react-h5-audio-player/src/styles.scss';

import {translate} from '../helpers/translate.js'

// WORLDLINE;DEAD tracks
// import memories from '../audio/1_memories.mp3';
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


function CustomAudioPlayer() {

    const [track, setTrack] = useState("/static/7a83b3ca96831316584345facca20b11/1_memories.mp3")
    const [currentTrack, setCurrentTrack] = useState("Memories");
    const [trackState, setTrackState] = useState(`${translate("Paused")} - `);
    

    const query = useStaticQuery(graphql`
        query {
            wd: allFile(filter: {extension: {regex: "/(mp3)/"}, relativeDirectory: {eq: "wd"}}, sort: {fields: name}) {
            edges {
                node {
                id
                relativePath
                publicURL
                }
            }
            
            }
            bg: file(relativePath: {eq: "wd_rgb.jpg"}) {
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
    const nameArray = ["Memories", "As Of Right Now", "Ominous", "Break Your Mind", "Severity Of Destiny", "Help, Kill",
    "Evildoer's Dance", "Prying Eyes", "Devil's Hand", "Collapsing Structure", "Watermelon's Symphony", "The Impact",
    "Worldline;Dead"];
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
                    {/* console.log(e.target.childNodes[0].innerText) */}
                    setCurrentTrack(e.target.childNodes[1].innerText)
                    e.target.classList.add('current-play')
                    }}>
                    <div className="playlist-option-img-holder">
                        {/* <Img fluid={query.file.childImageSharp.fluid}></Img> */}
                        <Image imageName={"wd_rgb.jpg"}/>
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

export default CustomAudioPlayer;
