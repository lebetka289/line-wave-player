import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Sidebar = ({ playlists, addPlaylist, addTrackToPlaylist }) => {
  const [newPlaylistName, setNewPlaylistName] = useState('');
  const [isCreatingPlaylist, setIsCreatingPlaylist] = useState(false);

  const handleCreatePlaylist = () => {
    if (newPlaylistName) {
      addPlaylist(newPlaylistName);
      setNewPlaylistName('');
      setIsCreatingPlaylist(false);
    }
  };

  return (
    <div className="sidebar">
      <h2>Мои Плейлисты</h2>
      <div className="create-playlist-container">
        <h3>Создать свой первый плейлист</h3>
        <p>Это хороший способ слушать свою любимую музыку</p>
        {isCreatingPlaylist ? (
          <div className="create-playlist-form">
            <input
              type="text"
              placeholder="Название плейлиста"
              value={newPlaylistName}
              onChange={(e) => setNewPlaylistName(e.target.value)}
            />
            <button onClick={handleCreatePlaylist}>Создать</button>
            <button onClick={() => setIsCreatingPlaylist(false)}>Отмена</button>
          </div>
        ) : (
          <button
            className="create-playlist-btn"
            onClick={() => setIsCreatingPlaylist(true)}
          >
            Создать плейлист
          </button>
        )}
      </div>
      <div className="playlists-list">
        {Object.keys(playlists).map((playlistName) => (
          <Link key={playlistName} to={`/playlist/${playlistName}`} className="playlist-card">
            <div className="playlist-cover">
              <img src="./src/assets/image-list.svg" alt="лого" style={{ width: '50px', height: '50px' }} />
            </div>
            <h3 className="playlist-name">{playlistName}</h3>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
