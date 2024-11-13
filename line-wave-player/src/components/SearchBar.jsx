import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const newQuery = e.target.value;
    setQuery(newQuery);
    onSearch(newQuery); // Вызываем функцию поиска при каждом изменении ввода
  };

  return (
    <div className="search-bar-container">
      <div className="logo">
        <img src="./src/assets/logo.svg" alt="лого" style={{ width: '240px', height: '60px' }} />
      </div>
      <div className="search-controls">
        <button onClick={() => navigate('/')} className="return-button">
          <img src="./src/assets/home.svg" alt="лого" style={{ width: '40px', height: '40px' }} />
        </button>
        <input
          type="text"
          placeholder="Найти исполнителя"
          className="search-input"
          value={query}
          onChange={handleInputChange}
        />
      </div>
    </div>
  );
};

export default SearchBar;
