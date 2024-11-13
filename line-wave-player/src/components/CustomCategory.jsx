import React, { useState, useEffect } from 'react';
import { albumDatabase } from '../data/albumDatabase';

const CustomCategory = ({ onTrackClick, addToFavorites }) => {
  const [customAlbums, setCustomAlbums] = useState([]);

  useEffect(() => {
    const shuffled = [...albumDatabase].sort(() => Math.random() - 0.5);
    setCustomAlbums(shuffled);
  }, []);

  return (
    <div className="categories-section">
      <h2 className="categories-title">В вашем стиле</h2>
      
      <div className="categories">
        {customAlbums.map((album) => (
          <div key={album.id} className="album">
            <img src={album.imagePath} alt={album.title} className="album-cover" />
            <div className="play-btn" onClick={() => onTrackClick(album.tracks[0], album)}>
            <img src="./src/assets/play.svg" alt="запуск" style={{ width: '50px', height: '50px' }} />
            </div>
            <div className="album-info">
              <h3>{album.title}</h3>
              <p>{album.artist}</p>
              <button onClick={() => addToFavorites(album.tracks[0])}>Добавить в любимые</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CustomCategory;
