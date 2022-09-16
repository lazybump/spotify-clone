import './Playlist.css';
import TrackList from '../TrackList/TrackList';

const Playlist = ({ PLAYLISTNAME, PLAYLISTTRACKS, onRemove, onNameChange, onSave }) => {

    const handleNameChange = ({ target }) => {
        onNameChange(target.value);
    }

    return (
        <div className="Playlist">
            <input placeholder="Name your playlist" value={PLAYLISTNAME} onChange={handleNameChange}/>
            <TrackList tracks={PLAYLISTTRACKS} isRemoval={true} onRemove={onRemove} />
            <button className="Playlist-save" onClick={onSave}>SAVE TO SPOTIFY</button>
        </div>
    )
}

export default Playlist;