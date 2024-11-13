import React, { useState, useEffect, useRef } from 'react';
import MusicPlayer from './MusicPlayer';
import VolumControl from './VolumControl';

const Player = ({ track, album, onTrackChange, playlists, addTrackToPlaylist }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.5);
  const [selectedPlaylist, setSelectedPlaylist] = useState('');
  const audioRef = useRef(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
      if (isPlaying) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, volume, track]);

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
      setDuration(audioRef.current.duration || 0);
      setProgress((audioRef.current.currentTime / (audioRef.current.duration || 1)) * 100);
    }
  };

  const handleSeek = (newProgress) => {
    if (audioRef.current) {
      const newTime = (newProgress / 100) * (audioRef.current.duration || 0);
      audioRef.current.currentTime = newTime;
      setProgress(newProgress);
    }
  };

  const nextTrack = () => {
    if (album && album.tracks) {
      const currentIndex = album.tracks.indexOf(track);
      const nextIndex = (currentIndex + 1) % album.tracks.length;
      onTrackChange(album.tracks[nextIndex]);
      setIsPlaying(true);
    }
  };

  const prevTrack = () => {
    if (album && album.tracks) {
      const currentIndex = album.tracks.indexOf(track);
      const prevIndex = (currentIndex - 1 + album.tracks.length) % album.tracks.length;
      onTrackChange(album.tracks[prevIndex]);
      setIsPlaying(true);
    }
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleVolumeChange = (newVolume) => {
    setVolume(newVolume);
  };

  const handleAddToPlaylist = () => {
    if (track && selectedPlaylist) {
      addTrackToPlaylist(track, selectedPlaylist);
    }
  };

  return (
    <div className="player">
      {track ? (
        <>
          <audio
            ref={audioRef}
            src={track.audioPath}
            onTimeUpdate={handleTimeUpdate}
            onEnded={nextTrack}
            autoPlay={isPlaying}
          />
          <div className="player-controls">
            <div className="track-info">
              <img src={album.imagePath} alt="Track Cover" className="track-cover" />
              <div className="track-details">
                <h3 className="track-title">{track.title}</h3>
                <p className="track-artist">{album.artist}</p>
              </div>
            </div>
            <div className="playlist-controls">
              <select
                value={selectedPlaylist}
                onChange={(e) => setSelectedPlaylist(e.target.value)}
              >
                <option value="">Выберите плейлист</option>
                {Object.keys(playlists).map((playlistName) => (
                  <option key={playlistName} value={playlistName}>
                    {playlistName}
                  </option>
                ))}
              </select>
              <button onClick={handleAddToPlaylist}>Добавить в плейлист</button>
            </div>
            <div className="player-container">
              <MusicPlayer
                isPlaying={isPlaying}
                onPlayPause={togglePlayPause}
                onNext={nextTrack}
                onPrev={prevTrack}
                progress={progress}
                onSeek={handleSeek}
                currentTime={currentTime}
                duration={duration}
              />
              <VolumControl volume={volume} onVolumeChange={handleVolumeChange} />
            </div>
          </div>
        </>
      ) : (
        <p>Выберите трек для воспроизведения</p>
      )}
    </div>
  );
};

export default Player;
