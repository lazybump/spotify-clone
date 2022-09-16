import './Track.css';

export default function Track({ track, isRemoval, onAdd, onRemove }) {

    const handleClick = () => {
        isRemoval ? onRemove(track) : onAdd(track);
    }

    return (
    <div className="Track">
        <div className="Track-information">
            <h3>{track.name}</h3>
            <p>{track.artist} | {track.album}</p>
        </div>
        <button className="Track-action" onClick={handleClick}>
            { isRemoval ? '-' : '+' }
        </button>
    </div>
    );
};