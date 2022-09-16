import { useState } from 'react';
import './SearchBar.css'
import Spotify from '../../util/Spotify';


const SearchBar = ({ onSearch }) => {    
    const [term, setTerm] = useState('');

    Spotify.getAccessToken();

    const handleTermChange = ({ target }) => {
        setTerm(target.value);
    }
    
    const handleSearch = () => {
        Spotify.searchLibrary(term)
        .then(resolvedValue => {
            onSearch(resolvedValue)
        })
        setTerm('');
    }

    return (
        <div className="SearchBar">
            <a href={Spotify.authorizationURL}>LOGIN</a>
            <input placeholder="Enter A Song, Album, or Artist" value={term} onChange={handleTermChange}/>
            <button className="SearchButton" onClick={handleSearch}>SEARCH</button>
        </div>
)};

export default SearchBar;