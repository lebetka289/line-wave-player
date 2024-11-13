import React from 'react';

const MusicPlayer = ({
  isPlaying,
  onPlayPause,
  progress,
  onSeek,
  onPrev,
  onNext,
  currentTime,
  duration,
}) => {
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  return (
    <div className="music-player">
      <div className="controls">
        <button className="prev-button" onClick={onPrev}>
          <img src="./src/assets/back.svg" alt="назад" style={{ width: '24px', height: '24px' }} />
        </button>
        <button className="play-pause-button" onClick={onPlayPause}>
          {isPlaying ? (
            <img
              src="./src/assets/pause.svg"
              alt="пауза"
              style={{ width: '40px', height: '40px' }}
            />
          ) : (
            <img
              src="./src/assets/play.svg"
              alt="запуск"
              style={{ width: '40px', height: '40px' }}
            />
          )}
        </button>
        <button className="next-button" onClick={onNext}>
          <img src="./src/assets/next.svg" alt="запуск" style={{ width: '24px', height: '24px' }} />
        </button>
      </div>

      {/* Прогресс Бар */}
      <div
        className="progress-bar-container"
        onClick={(e) => {
          const newProgress = (e.nativeEvent.offsetX / e.target.clientWidth) * 100;
          onSeek(newProgress);
        }}
      >
        <div className="progress-bar">
          <div className="progress" style={{ width: `${progress}%` }}></div>
        </div>
      </div>

      {/* Отображение Времени */}
      <div className="time-display">
        <span>
          {formatTime(currentTime)} / {formatTime(duration)}
        </span>
      </div>
    </div>
  );
};

export default MusicPlayer;
