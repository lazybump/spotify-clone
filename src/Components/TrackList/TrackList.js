import './TrackList.css';
import Track from '../Track/Track';

function TrackList({ tracks, isRemoval, onAdd, onRemove }) {

  return (
    <div className="TrackList">
        {tracks.map(track => <Track track={track}
                                    key={track.id}
                                    isRemoval={isRemoval}
                                    onAdd={onAdd}
                                    onRemove={onRemove} />)}
    </div>
  )
}

export default TrackList;