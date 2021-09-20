import React from 'react';
import LibrarySong from './LibrarySong'

const Library = ({songs, currentSong, setCurrentSong, audioRef, isPlaying, libraryStatus}) => {
    return(
        <div className={`library ${libraryStatus ? 'active-library' : '' }`}>
            <h1>Library</h1>
            <div className="library-songs">
                {songs.map(song => (
                    <LibrarySong audioRef={audioRef} currentSong={currentSong} setCurrentSong={setCurrentSong} song={song} key={song.id} isPlaying={isPlaying} />
                ))}
            </div>
        </div>
    );
}

export default Library;