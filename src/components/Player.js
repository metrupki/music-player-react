import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faPlay, faAngleLeft, faAngleRight, faPause} from '@fortawesome/free-solid-svg-icons'


const Player = ({audioRef, currentSong, setCurrentSong, isPlaying, setIsPlaying, songs, songInfo, setSongInfo}) => {
    //Event Handlers
    const playSongHandler = () => {
        if (isPlaying) {
            audioRef.current.pause();
            setIsPlaying(!isPlaying);
        } else {
            audioRef.current.play();
            setIsPlaying(!isPlaying);
        }
    };
    const getTime = (time) => {
        return(
            Math.floor(time/60) + ":" + ("0" + Math.floor(time%60)).slice(-2)
        )
    };
    const dragHandler = (e) => {
        audioRef.current.currentTime = e.target.value;
        setSongInfo({ ...songInfo, currentTime: e.target.value})
    };
    const skipTrackHandler = async (direction) => {
        //then change the currentSong to the one selected
        let currentIndex = songs.findIndex((song) => song.id === currentSong.id);
        if (direction === 'skip-forward') {
            await setCurrentSong(songs[(currentIndex + 1) % songs.length])
            songs[(currentIndex + 1) % songs.length].active = true
        }
        if (direction === 'skip-back') {
            if (currentIndex === 0) {
                await setCurrentSong(songs[songs.length -1])
                songs[songs.length -1].active = true
            } else {
            await setCurrentSong(songs[(currentIndex - 1) % songs.length])
            songs[(currentIndex - 1) % songs.length].active = true
            }
        }
        currentSong.active = false;
        //if the song was playing keep playing
        if (isPlaying) audioRef.current.play();
    };
    //add style for input bar
    const trackAnim = {
        transform: `translateX(${songInfo.animationPercentage}%)`
    };
    return (
        <div className="player">
            <div className="time-control">
                <p>{getTime(songInfo.currentTime)}</p>
                <div className="track" style={{background: `linear-gradient(to right, ${currentSong.color[0]}, ${currentSong.color[1]})`}}>
                    <input min={0} max={songInfo.duration || 0} value={songInfo.currentTime} onChange={dragHandler} type="range"/>
                    <div style={trackAnim} className="animate-track"></div>
                </div>
                <p>{songInfo.duration ? getTime(songInfo.duration) : "0:00"}</p>
            </div>
            <div className="play-control">
                <FontAwesomeIcon onClick={() => skipTrackHandler('skip-back')} className="skip-back" size="2x" icon={faAngleLeft} />
                <FontAwesomeIcon onClick={playSongHandler} className="play" size="2x" icon={isPlaying ? faPause : faPlay} />
                <FontAwesomeIcon onClick={() => skipTrackHandler('skip-forward')} className="skip-forward" size="2x" icon={faAngleRight} />
            </div>
        </div>

    );
};

export default Player;