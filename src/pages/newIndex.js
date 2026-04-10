import React, { useState, useEffect, useRef } from 'react'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import { useStaticQuery, graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import { useLang } from "../context/LangContext"
import CassettePlayerMobile from "../components/CassettePlayerMobile"
import CassettePlayerTablet from "../components/CassettePlayerTablet"

import '../styles/index.scss'
import "../styles/cassette.scss"
import "../styles/cassette-responsive.scss"

import translation_geo from '../translations/georgian.json'

import lamp2 from "../images/lamp_2.jpg"

import wdCover from "../images/wd_sq_1-transformed.jpeg"
import rencontreCover from "../images/Rencontre_front_cover.png"
import asmCover from "../images/a_system_message_cv_empt.png"

import wdCassetteImg from "../images/wd_cassette_min.png"
import rencontreCassetteImg from "../images/rencontre-cassette_min.png"
import asmCassetteImg from "../images/asm_cassette_min.png"

const TRACK_NAMES = {
  wd: [
    "Memories", "As Of Right Now", "Ominous", "Break Your Mind",
    "Severity Of Destiny", "Help, Kill", "Evildoer's Dance", "Prying Eyes",
    "Devil's Hand", "Collapsing Structure", "Watermelon's Symphony",
    "The Impact", "Worldline;Dead",
  ],
  rencontre: [
    "Narikala (Intro)", "Korvis the Robot", "Sarcophagus", "Monumentality",
    "Marionette", "Cryptic", "Minotaur", "Caucasus (Outro)",
  ],
  asm: [
    "Alternative Dimension (Intro)", "Kedeli", "A System Message", "Imperative",
    "Matarebeli", "Electrocuted", "Darkroom Laboratory", "Intermission (Outro)",
  ],
}

const CASSETTES = [
  {
    id: "wd",
    title: "WORLDLINE:DEAD",
    year: 2018,
    side: "SIDE A",
    cover: wdCover,
    cassetteImg: wdCassetteImg,
    bodyColor: "#060608",
    reelColor: "#0a0810",
    accentColor: "#cc44ff",
    labelText: "#ffffff",
  },
  {
    id: "rencontre",
    title: "RENCONTRE",
    year: 2023,
    side: "SIDE A",
    cover: rencontreCover,
    cassetteImg: rencontreCassetteImg,
    bodyColor: "#5a5a5a",
    reelColor: "#2a2a2a",
    accentColor: "#c0c0c0",
    labelText: "#fff",
  },
  {
    id: "asm",
    title: "A SYSTEM MESSAGE",
    year: 2023,
    side: "SIDE A",
    cover: asmCover,
    cassetteImg: asmCassetteImg,
    bodyColor: "#111",
    reelColor: "#0a0a0a",
    accentColor: "#eeeeee",
    labelText: "#eee",
  },
]

const formatTime = (totalSeconds) => {
  const s = Math.floor(Math.abs(totalSeconds))
  const mins = Math.floor(s / 60).toString().padStart(2, "0")
  const secs = (s % 60).toString().padStart(2, "0")
  return `${mins}:${secs}`
}

export default function NewIndexPage() {
  const { activeLang } = useLang()

  // ── Combined query ────────────────────────────────────────────────────────
  const data = useStaticQuery(graphql`
    query NewIndexAll {
      placeholderImage: allFile(filter: { extension: {regex: "/(png|jpg)/"}, sourceInstanceName: { eq: "images" } }) {
        edges {
          node {
            relativePath
            name
            childImageSharp {
              gatsbyImageData
            }
          }
        }
      }
      wd: allFile(
        filter: { extension: { regex: "/(mp3)/" }, relativeDirectory: { eq: "wd" } }
        sort: { name: ASC }
      ) { edges { node { id publicURL } } }
      rencontre: allFile(
        filter: { extension: { regex: "/(mp3)/" }, relativeDirectory: { eq: "rencontre" } }
        sort: { name: ASC }
      ) { edges { node { id publicURL } } }
      asm: allFile(
        filter: { extension: { regex: "/(mp3)/" }, relativeDirectory: { eq: "asm" } }
        sort: { name: ASC }
      ) { edges { node { id publicURL } } }
    }
  `)

  const images = data.placeholderImage.edges || null

  const allTracks = {
    wd:        data.wd.edges.map((e, i)        => ({ name: TRACK_NAMES.wd[i],        url: e.node.publicURL })),
    rencontre: data.rencontre.edges.map((e, i) => ({ name: TRACK_NAMES.rencontre[i], url: e.node.publicURL })),
    asm:       data.asm.edges.map((e, i)       => ({ name: TRACK_NAMES.asm[i],       url: e.node.publicURL })),
  }

  // ── Cassette player state ─────────────────────────────────────────────────
  const [isPlaying, setIsPlaying]               = useState(false)
  const [isRecording, setIsRecording]           = useState(false)
  const [isRewinding, setIsRewinding]           = useState(false)
  const [isEjected, setIsEjected]               = useState(false)
  const [displayTime, setDisplayTime]           = useState(0)
  const [loadedCassette, setLoadedCassette]     = useState(null)
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0)
  const audioRef       = useRef(null)
  const rewIntervalRef = useRef(null)

  const activeCassette = isEjected ? null : loadedCassette
  const currentTracks  = loadedCassette ? allTracks[loadedCassette.id] : []

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const onTimeUpdate = () => setDisplayTime(audio.currentTime)
    const onPlay       = () => setIsPlaying(true)
    const onPause      = () => setIsPlaying(false)
    const onEnded      = () => {
      if (!loadedCassette) return
      const list = allTracks[loadedCassette.id]
      const next = currentTrackIndex + 1
      if (next < list.length) {
        setCurrentTrackIndex(next)
        audio.src = list[next].url
        audio.play()
      } else {
        setIsPlaying(false)
        setCurrentTrackIndex(0)
      }
    }

    audio.addEventListener("timeupdate", onTimeUpdate)
    audio.addEventListener("play",       onPlay)
    audio.addEventListener("pause",      onPause)
    audio.addEventListener("ended",      onEnded)
    return () => {
      audio.removeEventListener("timeupdate", onTimeUpdate)
      audio.removeEventListener("play",       onPlay)
      audio.removeEventListener("pause",      onPause)
      audio.removeEventListener("ended",      onEnded)
    }
  }, [loadedCassette, currentTrackIndex])

  const stopRewinding = () => {
    if (rewIntervalRef.current) {
      clearInterval(rewIntervalRef.current)
      rewIntervalRef.current = null
    }
  }

  const selectTrack = (index, autoPlay = true) => {
    const audio = audioRef.current
    if (!audio || !loadedCassette) return
    const list = allTracks[loadedCassette.id]
    if (index < 0 || index >= list.length) return
    stopRewinding()
    setIsRewinding(false)
    setCurrentTrackIndex(index)
    audio.src = list[index].url
    audio.currentTime = 0
    if (autoPlay) audio.play()
  }

  const handlePlay = () => {
    if (!activeCassette) return
    stopRewinding()
    setIsRewinding(false)
    setIsRecording(false)
    audioRef.current?.play()
  }

  const handleStop = () => {
    stopRewinding()
    setIsRewinding(false)
    setIsRecording(false)
    audioRef.current?.pause()
  }

  const handleRec = () => {
    if (!activeCassette) return
    stopRewinding()
    setIsRewinding(false)
    setIsRecording(true)
    audioRef.current?.pause()
  }

  const handleRew = () => {
    if (!activeCassette) return
    const audio = audioRef.current
    if (!audio) return
    setIsRecording(false)
    audio.pause()

    if (audio.currentTime > 3 || currentTrackIndex === 0) {
      setIsRewinding(true)
      rewIntervalRef.current = setInterval(() => {
        if (audio.currentTime <= 0) {
          stopRewinding()
          setIsRewinding(false)
          audio.currentTime = 0
        } else {
          audio.currentTime = Math.max(0, audio.currentTime - 3)
        }
      }, 100)
    } else {
      selectTrack(currentTrackIndex - 1, false)
    }
  }

  const handleLoad = () => {
    const nextEjected = !isEjected
    setIsEjected(nextEjected)
    if (nextEjected) {
      stopRewinding()
      setIsRewinding(false)
      setIsRecording(false)
      audioRef.current?.pause()
    }
  }

  const handleShelfCassette = (cassette) => {
    if (loadedCassette?.id === cassette.id && !isEjected) return
    stopRewinding()
    const audio = audioRef.current
    if (audio) {
      audio.pause()
      audio.currentTime = 0
      const first = allTracks[cassette.id]?.[0]
      if (first) audio.src = first.url
    }
    setLoadedCassette(cassette)
    setIsEjected(false)
    setIsPlaying(false)
    setIsRecording(false)
    setIsRewinding(false)
    setCurrentTrackIndex(0)
    setDisplayTime(0)
  }

  const isActive = isPlaying || isRecording

  return (
    <Layout>
      <SEO title="Home" />

      {/* ── Section One ── */}
      <section className="section section-one">
        <GatsbyImage
          image={getImage(images.find(n => n.node.relativePath.includes("lamp_1.jpg")).node.childImageSharp)}
          alt=""
          className="section-one__bg"
          loading="lazy"
        />
        <div className="section-one__overlay" />
        <div className="section-one__content">
          <h1 className="section-one__title">
            {activeLang === "GEO"
              ? `${translation_geo.heading_text_ge[0]}${translation_geo.heading_text_ge[1]}`
              : "Project Monolith"}
          </h1>
          <span className="section-one__sub">{activeLang === "GEO"
              ? `${translation_geo.darkroom_geo_2}`
              : "A Darkroom Production"}</span>
        </div>
      </section>

      {/* ── Section Two: Cassette Player ── */}
      <section className="section section-two-cassette" style={{ backgroundImage: `url(${lamp2})` }}>
        {/* Shared audio element — always mounted regardless of which player is visible */}
        <audio ref={audioRef} style={{ display: "none" }} />

        {/* ── Mobile player (≤ 500px) ── */}
        <CassettePlayerMobile
          isPlaying={isPlaying}
          isRecording={isRecording}
          isRewinding={isRewinding}
          isEjected={isEjected}
          activeCassette={activeCassette}
          currentTracks={currentTracks}
          currentTrackIndex={currentTrackIndex}
          displayTime={displayTime}
          CASSETTES={CASSETTES}
          formatTime={formatTime}
          handlePlay={handlePlay}
          handleStop={handleStop}
          handleRec={handleRec}
          handleRew={handleRew}
          handleLoad={handleLoad}
          handleShelfCassette={handleShelfCassette}
          selectTrack={selectTrack}
        />

        {/* ── Tablet player (501px – 900px) ── */}
        <CassettePlayerTablet
          isPlaying={isPlaying}
          isRecording={isRecording}
          isRewinding={isRewinding}
          isEjected={isEjected}
          activeCassette={activeCassette}
          currentTracks={currentTracks}
          currentTrackIndex={currentTrackIndex}
          displayTime={displayTime}
          CASSETTES={CASSETTES}
          formatTime={formatTime}
          handlePlay={handlePlay}
          handleStop={handleStop}
          handleRec={handleRec}
          handleRew={handleRew}
          handleLoad={handleLoad}
          handleShelfCassette={handleShelfCassette}
          selectTrack={selectTrack}
        />

        {/* ── Desktop player (> 900px) ── */}
        <div className="cassette-desktop-wrapper">
        <div className="cassette-page">

          {/* ── Left column: player + tracklist ── */}
          <div className="player-column">

            <div
              className={`cassette-player ${isEjected ? "ejected" : ""}`}
              style={activeCassette ? { "--player-accent": activeCassette.accentColor } : {}}
            >

              <div className="player-topbar">
                <div className="screw" />
                <span className="brand-label">MONOTAPE</span>
                <div className="screw" />
              </div>

              <div className="player-middle">
                <div className="info-display">
                  <div className="display-screen">
                    <span className="display-label">MONO</span>
                    <span className="display-value">
                      {isRecording ? "● REC" : isRewinding ? "◀◀ REW" : isPlaying ? "▶ PLAY" : "■ STOP"}
                    </span>
                  </div>
                </div>

                <div className="cassette-window-frame">
                  <div
                    className={`cassette-body ${isEjected ? "cassette-ejected" : ""}`}
                    style={activeCassette ? { background: activeCassette.bodyColor } : {}}
                  >
                    <div className="cas-corner cas-corner-tl" />
                    <div className="cas-corner cas-corner-tr" />
                    <div className="cas-corner cas-corner-bl" />
                    <div className="cas-corner cas-corner-br" />

                    <div
                      className="cassette-label"
                      style={activeCassette ? { background: "none", border: "none", padding: 0 } : {}}
                    >
                      {activeCassette ? (
                        <div className="cassette-label-cover">
                          <img src={activeCassette.cover} alt={activeCassette.title} className="cassette-cover-img" />
                          <div className="cassette-label-stripes">
                            <div className="cls" /><div className="cls" /><div className="cls" />
                          </div>
                          <div className="cassette-label-band" style={{ background: activeCassette.accentColor }}>
                            <span className="cassette-side-badge">{activeCassette.side.replace("SIDE ", "")}</span>
                            <span className="cassette-cover-title" style={{ color: activeCassette.labelText }}>
                              {activeCassette.title}
                            </span>
                          </div>
                        </div>
                      ) : (
                        <>
                          <span className="cassette-title">SIDE A</span>
                          <div className="label-lines">
                            <div className="label-line" />
                            <div className="label-line" />
                            <div className="label-line" />
                          </div>
                        </>
                      )}
                    </div>

                    <div className="tape-area" style={activeCassette ? { background: activeCassette.bodyColor } : {}}>
                      <div className="tape-window">
                        <div className="tape-path" />
                        <div className={`reel reel-left ${isActive ? "reel-spin" : ""} ${isRewinding ? "reel-spin-reverse" : ""}`}
                          style={activeCassette ? { "--reel-color": activeCassette.reelColor } : {}}>
                          <div className="reel-hub">
                            <div className="spoke" /><div className="spoke" /><div className="spoke" />
                          </div>
                        </div>
                        <div className={`reel reel-right ${isActive ? "reel-spin reel-spin-slow" : ""} ${isRewinding ? "reel-spin-fast" : ""}`}
                          style={activeCassette ? { "--reel-color": activeCassette.reelColor } : {}}>
                          <div className="reel-hub">
                            <div className="spoke" /><div className="spoke" /><div className="spoke" />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="cas-bottom-bar">
                      <div className="cas-notch" /><div className="cas-notch" /><div className="cas-notch" />
                    </div>
                  </div>

                  <div className="window-screw window-screw-tl" />
                  <div className="window-screw window-screw-tr" />
                  <div className="window-screw window-screw-bl" />
                  <div className="window-screw window-screw-br" />
                </div>

                <div className="time-display">
                  <div className="display-screen">
                    <span className="display-label">TIME</span>
                    <span className="display-value time-value">{formatTime(displayTime)}</span>
                  </div>
                </div>
              </div>

              <div className="led-row">
                <div className={`led ${isRecording ? "led-rec" : isPlaying ? "led-play" : "led-off"}`} />
                <span className="led-label">{isRecording ? "REC" : isPlaying ? "PLAY" : ""}</span>
                {!activeCassette && <span className="no-cassette-hint">— insert a cassette</span>}
                {activeCassette && (
                  <span className="loaded-cassette-name" style={{ color: activeCassette.accentColor }}>
                    {currentTracks[currentTrackIndex]?.name || activeCassette.title}
                  </span>
                )}
              </div>

              <div className="player-buttons">
                <button className={`ctrl-btn rec-btn ${isRecording ? "btn-active" : ""}`} onClick={handleRec} title="Record">
                  <span className="btn-icon">⏺</span><span className="btn-label">REC</span>
                </button>
                <button className={`ctrl-btn play-btn ${isPlaying ? "btn-active" : ""}`} onClick={handlePlay} title="Play">
                  <span className="btn-icon">▶</span><span className="btn-label">PLAY</span>
                </button>
                <button className={`ctrl-btn stop-btn ${!isPlaying && !isRecording && !isRewinding ? "btn-active" : ""}`} onClick={handleStop} title="Stop">
                  <span className="btn-icon">■</span><span className="btn-label">STOP</span>
                </button>
                <button className={`ctrl-btn rew-btn ${isRewinding ? "btn-active" : ""}`} onClick={handleRew} title="Rewind">
                  <span className="btn-icon">⏮</span><span className="btn-label">REW</span>
                </button>
                <button className={`ctrl-btn load-btn ${isEjected ? "btn-active" : ""}`} onClick={handleLoad} title="Load / Eject">
                  <span className="btn-icon">⏏</span><span className="btn-label">LOAD</span>
                </button>
              </div>

              <div className="player-bottombar">
                <div className="screw" /><div className="screw" />
              </div>
            </div>

            {/* ── Tracklist ── */}
            {activeCassette && currentTracks.length > 0 && (
              <div className="tracklist" style={{ "--tl-accent": activeCassette.accentColor }}>
                <div className="tracklist-header">
                  <span className="tl-album">{activeCassette.title} ({activeCassette.year})</span>
                  <span className="tl-count">{currentTracks.length} TRACKS</span>
                </div>
                <div className="tracklist-items">
                  {currentTracks.map((track, index) => (
                    <button
                      key={index}
                      className={`track-item ${currentTrackIndex === index ? "track-active" : ""}`}
                      onClick={() => selectTrack(index)}
                    >
                      <span className="track-num">{String(index + 1).padStart(2, "0")}</span>
                      <span className="track-name">{track.name}</span>
                      {currentTrackIndex === index && isPlaying && (
                        <span className="track-playing-indicator">▶</span>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}

          </div>

          {/* ── Shelf cassettes ── */}
          <div className="cassette-shelf">
            <div className="shelf-cassettes">
              {(loadedCassette && !isEjected
                ? [CASSETTES.find(c => c.id === loadedCassette.id), ...CASSETTES.filter(c => c.id !== loadedCassette.id)]
                : CASSETTES
              ).map((cassette) => (
                <button
                  key={cassette.id}
                  className={`shelf-cassette shelf-cassette--${cassette.id}`}
                  onClick={() => handleShelfCassette(cassette)}
                  title={`Load ${cassette.title}`}
                  style={{ "--cas-accent": cassette.accentColor }}
                >
                  <img src={cassette.cassetteImg} alt={cassette.title} className="shelf-cassette-img" />
                </button>
              ))}
            </div>
          </div>

        </div>
        </div>{/* end cassette-desktop-wrapper */}
      </section>

    </Layout>
  )
}
