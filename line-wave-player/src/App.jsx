import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import MainContent from './components/MainContent';
import Player from './components/Player';
import PlaylistPage from './components/PlaylistPage';
import SearchBar from './components/SearchBar';
import { albumDatabase } from './data/albumDatabase';
import './App.css';

const App = () => {
  const [currentTrack, setCurrentTrack] = useState(null);
  const [currentAlbum, setCurrentAlbum] = useState(null);
  const [playlists, setPlaylists] = useState({});
  const [searchResults, setSearchResults] = useState([]);

  const handleTrackClick = (track, album = null) => {
    setCurrentTrack(track);
    setCurrentAlbum(album);
  };

  const handleSearch = (query) => {
    if (query === '') {
      setSearchResults([]);
      return;
    }
    const results = [];
    albumDatabase.forEach((album) => {
      const filteredTracks = album.tracks.filter(track =>
        track.title.toLowerCase().includes(query.toLowerCase())
      );
      if (filteredTracks.length > 0) {
        results.push({ ...album, tracks: filteredTracks });
      }
    });
    setSearchResults(results);
  };

  const addPlaylist = (playlistName) => {
    if (playlistName && !playlists[playlistName]) {
      setPlaylists((prevPlaylists) => ({
        ...prevPlaylists,
        [playlistName]: [],
      }));
    }
  };

  const addTrackToPlaylist = (track, playlistName) => {
    const albumImage = albumDatabase.find(album => album.tracks.includes(track)).imagePath;
    setPlaylists((prevPlaylists) => ({
      ...prevPlaylists,
      [playlistName]: [...prevPlaylists[playlistName], { ...track, albumImage }],
    }));
  };

  const removeTrackFromPlaylist = (trackId, playlistName) => {
    setPlaylists((prevPlaylists) => ({
      ...prevPlaylists,
      [playlistName]: prevPlaylists[playlistName].filter(track => track.id !== trackId),
    }));
  };

  return (
    <Router>
      <div className="app-container">
        <SearchBar onSearch={handleSearch} />
        <div className="content-wrapper">
          <Sidebar playlists={playlists} addPlaylist={addPlaylist} addTrackToPlaylist={addTrackToPlaylist} />
          <Routes>
            <Route
              path="/"
              element={
                <MainContent
                  searchResults={searchResults}
                  onTrackClick={handleTrackClick}
                />
              }
            />
            <Route
              path="/playlist/:playlistName"
              element={
                <PlaylistPage
                  playlists={playlists}
                  removeTrackFromPlaylist={removeTrackFromPlaylist}
                  onTrackClick={handleTrackClick}
                />
              }
            />
          </Routes>
          <Player
            track={currentTrack}
            album={currentAlbum}
            onTrackChange={setCurrentTrack}
            playlists={playlists}
            addTrackToPlaylist={addTrackToPlaylist}
          />
        </div>
      </div>
    </Router>
  );
};

export default App;
