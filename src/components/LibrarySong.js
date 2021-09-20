import React from 'react';

const LibrarySong = ({song, currentSong, setCurrentSong, audioRef, isPlaying}) => {
    const songSelectHandler = async () => {
         //Add active and inactive State
        currentSong.active = false;
        await setCurrentSong(song);
        song.active = true;
         //if the the player was on, continue playing
        if (isPlaying) audioRef.current.play();
    };
    return (
        <div onClick={songSelectHandler} className={`library-song ${song.active ? "selected" : ""}`}>
            <img alt={song.name} src={song.cover}></img>
            <div className="song-description">
                <h2>{song.name}</h2>
                <h3>{song.artist}</h3>
            </div>
        </div>

    );
};

 export default LibrarySong;