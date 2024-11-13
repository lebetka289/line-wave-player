import React from 'react';
import Categories from './Categories';
import CustomCategory from './CustomCategory';
import MoodGenres from './MoodGenres';

const MainContent = ({ searchResults, onTrackClick }) => {
  return (
    <div className="main-content">
      {searchResults.length > 0 ? (
        <>
          <h2>Search Results:</h2>
          <div className="track-list">
            {searchResults.map((album) => (
              <div key={album.id}>
                <h3>{album.title} - {album.artist}</h3>
                <div className="tracks">
                  {album.tracks.map((track) => (
                    <div
                      key={track.id}
                      className="track-item"
                      onClick={() => onTrackClick(track, album)}
                    >
                      <img src={album.imagePath} alt={album.title} className="track-cover" />
                      <div className="track-info">
                        <h4>{track.title}</h4>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <>
          {/* Категории отображаются, если пользователь не ищет ничего конкретного */}
          <Categories onTrackClick={onTrackClick} />
          <MoodGenres />
          <CustomCategory onTrackClick={onTrackClick} />
        </>
      )}
      <footer className="footer">
        <div className="footer-container">
          <div className="footer-section">
            <h3>Компания</h3>
            <ul>
              <li><a href="#">О нас</a></li>
              <li><a href="#">Справка</a></li>
              <li><a href="#">Для исполнителей</a></li>
            </ul>
          </div>
          <div className="footer-section">
            <h3>Сообщества</h3>
            <ul>
              <li><a href="#">Реклама</a></li>
              <li><a href="#">Для инвесторов</a></li>
              <li><a href="#">Для разработчиков</a></li>
              <li><a href="#">Для вендоров</a></li>
            </ul>
          </div>
          <div className="footer-section">
            <h3>Полезные ссылки</h3>
            <ul>
              <li><a href="#">Бесплатное мобильное приложение</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <div className="footer-bottom-links">
            <ul>
              <li><a href="#">Юридическая информация</a></li>
              <li><a href="#">Специальные возможности</a></li>
              <li><a href="#">Настройка файлов cookie</a></li>
              <li><a href="#">О рекламе</a></li>
              <li><a href="#">Политика конфиденциальности</a></li>
            </ul>
          </div>
          <div className="footer-social">
            <a href="#"><img src="./src/assets/vk.svg" alt="vk" /></a>
            <a href="#"><img src="./src/assets/telegram.svg" alt="telegram" /></a>
            <a href="#"><img src="./src/assets/youtube.svg" alt="youtube" /></a>
          </div>
        </div>
      </footer >
    </div>
  );
};

export default MainContent;
