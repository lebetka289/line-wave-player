import React from 'react';
import { useParams } from 'react-router-dom';

const PlaylistPage = ({ playlists, removeTrackFromPlaylist, onTrackClick }) => {
  const { playlistName } = useParams();
  const playlistTracks = playlists[playlistName] || [];

  return (
    <div className="playlist-page">
      <h2>{playlistName}</h2>
      {playlistTracks.length > 0 ? (
        <ul className="playlist-tracks">
          {playlistTracks.map((track) => (
            <li key={track.id} className="playlist-track-item">
              <div className="track-cover">
                <img src={track.albumImage} alt={track.title} />
              </div>
              <div className="track-info">
                <span>{track.title} - {track.artist}</span>
                <span>{track.duration}</span>
              </div>
              <button className="play-button" onClick={() => onTrackClick(track)}>Play</button>
              <button onClick={() => removeTrackFromPlaylist(track.id, playlistName)}>Удалить</button>
            </li>
          ))}
        </ul>
      ) : (
        <p>Плейлист пуст. Добавьте треки через плеер.</p>
      )}
    </div>
  );
};

export default PlaylistPage;
