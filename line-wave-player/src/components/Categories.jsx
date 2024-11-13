import React, { useState, useEffect, useRef } from 'react';
import { albumDatabase } from '../data/albumDatabase';

const Categories = ({ onTrackClick }) => {
  const [shuffledAlbums, setShuffledAlbums] = useState([]);

  const shuffleAlbums = () => {
    return albumDatabase.sort(() => Math.random() - 0.5);
  };

  useEffect(() => {
    const albums = shuffleAlbums();
    setShuffledAlbums(albums);
  }, []);

  const scrollRef = useRef(null);

  const scrollLeft = () => {
    scrollRef.current.scrollBy({
      top: 0,
      left: -300,
      behavior: 'smooth'
    });
  };

  const scrollRight = () => {
    scrollRef.current.scrollBy({
      top: 0,
      left: 300,
      behavior: 'smooth'
    });
  };

  return (
    <div className="categories-section">
      <h2 className="categories-title">Новые релизы</h2>
      <button className="scroll-button left" onClick={scrollLeft}><img src="./src/assets/more-1.svg" alt="Назад" style={{ width: '50px', height: '50px' }} /></button>
      <div className="categories" ref={scrollRef}>
        {shuffledAlbums.map((album) => (
          <div key={album.id} className="album">
            <img src={album.imagePath} alt={album.title} className="album-cover" />
            <div className="play-btn" onClick={() => onTrackClick(album.tracks[0], album)}>
            <img src="./src/assets/play.svg" alt="запуск" style={{ width: '50px', height: '50px' }} />
            </div>
            <div className="album-info">
              <h3>{album.title}</h3>
              <p>{album.artist}</p>
            </div>
          </div>
        ))}
      </div>
      <button className="scroll-button right" onClick={scrollRight}><img src="./src/assets/more.svg" alt="Вперед" style={{ width: '50px', height: '50px' }} /></button>
    </div>
  );
};

export default Categories;
