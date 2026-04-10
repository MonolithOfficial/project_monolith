import React from 'react'

export default function CassettePlayerMobile({
  isPlaying, isRecording, isRewinding, isEjected,
  activeCassette, currentTracks, currentTrackIndex, displayTime,
  CASSETTES, formatTime,
  handlePlay, handleStop, handleRec, handleRew, handleLoad,
  handleShelfCassette, selectTrack,
}) {
  const statusLabel = isRecording ? 'REC' : isRewinding ? 'REW' : isPlaying ? 'PLAY' : 'STOP'

  return (
    <div className="mob-cassette-page">

      {/* Player Panel */}
      <div
        className="mob-player-panel"
        style={activeCassette ? { '--mob-accent': activeCassette.accentColor } : {}}
      >
        <div className="mob-panel-topbar">
          <div className="mob-dots">
            <span className="mob-dot-circle" />
            <span className="mob-dot-circle" />
          </div>
          <span className="mob-brand">MONOTAPE</span>
          <div className="mob-dots">
            <span className="mob-dot-circle" />
            <span className="mob-dot-circle" />
          </div>
        </div>

        <div className="mob-cassette-img-wrap">
          {activeCassette ? (
            <img
              src={activeCassette.cassetteImg}
              alt={activeCassette.title}
              className="mob-cassette-img"
            />
          ) : (
            <div className="mob-cassette-empty" />
          )}
        </div>

        <div className="mob-status-row">
          <div className="mob-mono-group">
            <span className="mob-mono-label">MONO</span>
            <div className="mob-status-line">
              <div className={`mob-status-indicator ${isRecording ? 'mob-si-rec' : 'mob-si-default'}`} />
              <span className="mob-status-text">{statusLabel}</span>
            </div>
          </div>
          <div className="mob-time-group">
            <span className="mob-time-label">TIME</span>
            <span className="mob-time-value">{formatTime(displayTime)}</span>
          </div>
        </div>

        <div className="mob-track-row">
          <div className="mob-track-dot" />
          <span className="mob-track-now">
            {activeCassette
              ? (currentTracks[currentTrackIndex]?.name || activeCassette.title).toUpperCase()
              : '— INSERT A CASSETTE —'}
          </span>
        </div>

        <div className="mob-buttons">
          <button
            className={`mob-btn ${isRecording ? 'mob-btn-active mob-btn-rec' : ''}`}
            onClick={handleRec}
          >
            <span className="mob-btn-rec-dot" />
            <span className="mob-btn-label">REC</span>
          </button>
          <button
            className={`mob-btn ${isPlaying ? 'mob-btn-active mob-btn-play' : ''}`}
            onClick={handlePlay}
          >
            <span className="mob-btn-icon">▶</span>
            <span className="mob-btn-label">PLAY</span>
          </button>
          <button
            className={`mob-btn ${!isPlaying && !isRecording && !isRewinding ? 'mob-btn-active' : ''}`}
            onClick={handleStop}
          >
            <span className="mob-btn-stop-sq" />
            <span className="mob-btn-label">STOP</span>
          </button>
          <button
            className={`mob-btn ${isRewinding ? 'mob-btn-active' : ''}`}
            onClick={handleRew}
          >
            <span className="mob-btn-icon">⏮</span>
            <span className="mob-btn-label">REW</span>
          </button>
          <button
            className={`mob-btn ${isEjected ? 'mob-btn-active' : ''}`}
            onClick={handleLoad}
          >
            <span className="mob-btn-icon">⏏</span>
            <span className="mob-btn-label">LOAD</span>
          </button>
        </div>
      </div>

      {/* Track List */}
      {activeCassette && currentTracks.length > 0 && (
        <div
          className="mob-tracklist"
          style={{ '--mob-tl-accent': activeCassette.accentColor }}
        >
          <div className="mob-tl-header">
            <span className="mob-tl-title">{activeCassette.title} ({activeCassette.year})</span>
            <span className="mob-tl-count">{currentTracks.length} TRACKS</span>
          </div>
          <div className="mob-tl-divider" />
          {currentTracks.map((track, i) => (
            <button
              key={i}
              className={`mob-track-item ${i === currentTrackIndex ? 'mob-track-active' : ''}`}
              onClick={() => selectTrack(i)}
            >
              <span className="mob-track-num">{String(i + 1).padStart(2, '0')}</span>
              <span className="mob-track-name-txt">{track.name.toUpperCase()}</span>
              {i === currentTrackIndex && isPlaying && (
                <span className="mob-track-playing">▶</span>
              )}
            </button>
          ))}
        </div>
      )}

      {/* Cassette Selector */}
      <div className="mob-cass-selector">
        {CASSETTES.map(cassette => (
          <button
            key={cassette.id}
            className={`mob-cass-item ${activeCassette?.id === cassette.id && !isEjected ? 'mob-cass-active' : ''}`}
            onClick={() => handleShelfCassette(cassette)}
            style={{ '--cass-accent': cassette.accentColor }}
          >
            <img
              src={cassette.cassetteImg}
              alt={cassette.title}
              className="mob-cass-img"
            />
            <span className="mob-cass-label">{cassette.title}</span>
          </button>
        ))}
      </div>

    </div>
  )
}
