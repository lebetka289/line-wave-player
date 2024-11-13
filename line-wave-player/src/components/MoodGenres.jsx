import React from 'react';

const MoodGenres = () => {
  const genres = ['Русский хип-хоп', 'Поп', 'Танцы и электроника', 'Рок', 'Хип-хоп', 'Фолк и акустика'];

  return (
    <div className="mood-genres">
      {genres.map((genre, index) => (
        <button key={index} className="genre-button">{genre}</button>
      ))}
    </div>
  );
};

export default MoodGenres;
