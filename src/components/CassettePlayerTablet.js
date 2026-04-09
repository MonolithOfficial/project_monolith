import React from 'react'

export default function CassettePlayerTablet({
  isPlaying, isRecording, isRewinding, isEjected,
  activeCassette, currentTracks, currentTrackIndex, displayTime,
  CASSETTES, formatTime,
  handlePlay, handleStop, handleRec, handleRew, handleLoad,
  handleShelfCassette, selectTrack,
}) {
  const statusLabel = isRecording ? 'REC' : isRewinding ? 'REW' : isPlaying ? 'PLAY' : 'STOP'

  return (
    <div className="tab-cassette-page">
      <div className="tab-body">

        {/* Left Column: Player + Tracklist */}
        <div className="tab-left-col">
          <div
            className="tab-player-panel"
            style={activeCassette ? { '--tab-accent': activeCassette.accentColor } : {}}
          >
            <div className="tab-panel-topbar">
              <div className="tab-dots">
                <span className="tab-dot-circle" />
                <span className="tab-dot-circle" />
              </div>
              <span className="tab-brand">MONOTAPE</span>
              <div className="tab-dots">
                <span className="tab-dot-circle" />
                <span className="tab-dot-circle" />
              </div>
            </div>

            <div className="tab-cassette-img-wrap">
              {activeCassette ? (
                <img
                  src={activeCassette.cassetteImg}
                  alt={activeCassette.title}
                  className="tab-cassette-img"
                />
              ) : (
                <div className="tab-cassette-empty" />
              )}
            </div>

            <div className="tab-status-row">
              <div className="tab-mono-group">
                <span className="tab-mono-label">MONO</span>
                <div className="tab-status-line">
                  <div className={`tab-status-indicator ${isRecording ? 'tab-si-rec' : 'tab-si-default'}`} />
                  <span className="tab-status-text">{statusLabel}</span>
                </div>
              </div>
              <div className="tab-time-group">
                <span className="tab-time-label">TIME</span>
                <span className="tab-time-value">{formatTime(displayTime)}</span>
              </div>
            </div>

            <div className="tab-track-row">
              <div className="tab-track-dot" />
              <span className="tab-track-now">
                {activeCassette
                  ? (currentTracks[currentTrackIndex]?.name || activeCassette.title).toUpperCase()
                  : '— INSERT A CASSETTE —'}
              </span>
            </div>

            <div className="tab-buttons">
              <button
                className={`tab-btn ${isRecording ? 'tab-btn-active tab-btn-rec' : ''}`}
                onClick={handleRec}
              >
                <span className="tab-btn-rec-dot" />
                <span className="tab-btn-label">REC</span>
              </button>
              <button
                className={`tab-btn ${isPlaying ? 'tab-btn-active tab-btn-play' : ''}`}
                onClick={handlePlay}
              >
                <span className="tab-btn-icon">▶</span>
                <span className="tab-btn-label">PLAY</span>
              </button>
              <button
                className={`tab-btn ${!isPlaying && !isRecording && !isRewinding ? 'tab-btn-active' : ''}`}
                onClick={handleStop}
              >
                <span className="tab-btn-stop-sq" />
                <span className="tab-btn-label">STOP</span>
              </button>
              <button
                className={`tab-btn ${isRewinding ? 'tab-btn-active' : ''}`}
                onClick={handleRew}
              >
                <span className="tab-btn-icon">⏮</span>
                <span className="tab-btn-label">REW</span>
              </button>
              <button
                className={`tab-btn ${isEjected ? 'tab-btn-active' : ''}`}
                onClick={handleLoad}
              >
                <span className="tab-btn-icon">⏏</span>
                <span className="tab-btn-label">LOAD</span>
              </button>
            </div>
          </div>

          {/* Track list */}
          {activeCassette && currentTracks.length > 0 && (
            <div
              className="tab-tracklist"
              style={{ '--tab-tl-accent': activeCassette.accentColor }}
            >
              <div className="tab-tl-header">
                <span className="tab-tl-title">{activeCassette.title}</span>
                <span className="tab-tl-count">{currentTracks.length} TRACKS</span>
              </div>
              <div className="tab-tl-divider" />
              {currentTracks.map((track, i) => (
                <button
                  key={i}
                  className={`tab-track-item ${i === currentTrackIndex ? 'tab-track-active' : ''}`}
                  onClick={() => selectTrack(i)}
                >
                  <span className="tab-track-num">{String(i + 1).padStart(2, '0')}</span>
                  <span className="tab-track-name-txt">{track.name.toUpperCase()}</span>
                  {i === currentTrackIndex && isPlaying && (
                    <span className="tab-track-playing">▶</span>
                  )}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Cassette Selector */}
        <div className="tab-right-col">
          {CASSETTES.map(cassette => (
            <button
              key={cassette.id}
              className={`tab-cass-item ${activeCassette?.id === cassette.id && !isEjected ? 'tab-cass-active' : ''}`}
              onClick={() => handleShelfCassette(cassette)}
              style={{ '--cass-accent': cassette.accentColor }}
            >
              <img
                src={cassette.cassetteImg}
                alt={cassette.title}
                className="tab-cass-img"
              />
              <span className="tab-cass-label">{cassette.title}</span>
            </button>
          ))}
        </div>

      </div>
    </div>
  )
}
