import { useState } from 'react';
import './App.css';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
import Spotify from '../../util/Spotify';

function App() {
  const [searchResults, setSearchResults] = useState([]);

  const [playlistTracks, setPlaylistTracks] = useState([]);
  
  const [playlistName, setPlaylistName] = useState('');

  const addTrack = track => {
    if (playlistTracks.some(savedTrack => savedTrack.id === track.id)) {
      return;
    };
    setPlaylistTracks(prev => [...prev, track]);
  }

  const removeTrack = track => {
    setPlaylistTracks(prev => {
      return prev.filter(playlistTrack => playlistTrack.id !== track.id)
    });
  }

  const updatePlaylistName = newName => {
    setPlaylistName(newName);
  }

  const savePlaylist = () => {
    const trackURIs = playlistTracks.map(track => track.uri);
    Spotify.savePlaylist(playlistName, trackURIs);
    setPlaylistName('');
    setPlaylistTracks([]);
  }

  const search = ({ tracks: { items } }) => {
    const newResults = items.map(item => ({
      name: item.name,
      artist: item.artists[0].name,
      album: item.album.name,
      id: item.id,
      uri: item.uri,
    }))
    setSearchResults(newResults);
  }

  return (
    <div>
      <h1><span className="highlight">Sym</span>phony</h1>
      <div className="App">
        <SearchBar onSearch={search} />
        <div className="App-playlist">
          <SearchResults  searchResults={searchResults}
                          onAdd={addTrack} />
          <Playlist PLAYLISTNAME={playlistName} 
                    PLAYLISTTRACKS={playlistTracks} 
                    onRemove={removeTrack}
                    onNameChange={updatePlaylistName}
                    onSave={savePlaylist} />
        </div>
      </div>
    </div>
  );
}

export default App;
