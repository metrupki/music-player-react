import React, {useRef, useState} from 'react';
//import Styles
import './styles/app.scss'
//Adding Components
import Player from './components/Player';
import Song from './components/Song';
import Library from './components/Library';
import Nav from './components/Nav'
//import song Data
import data from "./data";

function App() {
  //State
  const [songs, Setsongs] = useState(data());
  const [currentSong, setCurrentSong] = useState(songs[4])
  const [isPlaying, setIsPlaying] = useState(false);
  const [songInfo, setSongInfo] = useState({
    currentTime: 0,
    duration: 0,
    animationPercentage: 0,
  });
  //Ref
  const audioRef = useRef(null);
  const [libraryStatus, setLibraryStatus] = useState(false);
  //time Handler
  const timeUpdateHandler = (e) => {
    const current = e.target.currentTime;
    const duration = e.target.duration;
    //Calculate Percentage
    const aPercentage = Math.round((current/duration)*100);
    //add Infos to State
    setSongInfo({...songInfo, currentTime: current, duration, animationPercentage: aPercentage})
  };

  const songEndHandler = async () => {
    let currentIndex = songs.findIndex((song) => song.id === currentSong.id);
    await setCurrentSong(songs[(currentIndex + 1) % songs.length]);
    currentSong.active = false;
    songs[(currentIndex + 1) % songs.length].active = true;
    if (isPlaying) audioRef.current.play();
  }

  return (
    <div className={`App ${libraryStatus ? "library-active" : ""}`}>
      <Nav libraryStatus={libraryStatus} setLibraryStatus={setLibraryStatus}/>
      <Song currentSong={currentSong}/>
      <Player songInfo={songInfo} setSongInfo={setSongInfo} audioRef={audioRef} isPlaying={isPlaying} setIsPlaying={setIsPlaying} songs={songs} currentSong={currentSong} setCurrentSong={setCurrentSong} />
      <Library audioRef={audioRef} songs={songs} currentSong={currentSong} setCurrentSong={setCurrentSong} isPlaying={isPlaying} libraryStatus={libraryStatus} />
      <audio onTimeUpdate={timeUpdateHandler} onLoadedMetadata={timeUpdateHandler} ref={audioRef} src={currentSong.audio} onEnded={songEndHandler} ></audio>
    </div>
  );
}

export default App;
