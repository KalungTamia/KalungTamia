import { createContext, useEffect, useRef, useState } from "react";
import { songsData } from "../assets/assets";

export const PlayerContext = createContext();

const PlayerContextProvider = (props)=>{

  const audioRef = useRef();
  const seekBg = useRef();
  const seekBar = useRef();

  const [track, setTrack] = useState(songsData[0]);
  const [playStatus, setPlayStatus] = useState(false);
  const [time, setTime] = useState({
    currentTime:{
      second:0,
      minute:0
    },
    totalTime:{
      second:0,
      minute:0
    }
  })

  const play = () => {
    audioRef.current.play();
    setPlayStatus(true);
  }

  const pause = () => {
    audioRef.current.pause();
    setPlayStatus(false);
  }

  const playWithId = async (id) => {
    await setTrack(songsData[id]);
    await audioRef.current.play();
    setPlayStatus(true);
  } // 'await' ensures that setTrack completes before proceeding to the next line.
  /*
    Why use async await in this case?
    Even though setTrack (from useState) itself is not asynchronous, if setTrack involves any asynchronous operations (like fetching additional data or performing side effects), making the function async allows you to ensure that these operations complete before proceeding.
    
    The await keyword pauses the execution of the function until the awaited promise is resolved. This ensures that each step is completed before moving to the next. Here’s why it’s important:

    Setting the Track: await setTrack(songsData[id]) ensures the track is set before trying to play it.
    Playing the Track: await audioRef.current.play() ensures that the play action is completed or started before updating the play status.
    Updating the Play Status: setPlayStatus(true) ensures the play status is updated only after the track starts playing.
  */

  
  const previous = async ()=>{
    if (track.id > 0){
      await setTrack(songsData[track.id-1]);
      await audioRef.ref.current.play();
      setPlayStatus(true);
    }
  }

  const next = async ()=>{
    if (track.id < songsData.length-1){
      await setTrack(songsData[track.id+1]);
      await audioRef.ref.current.play();
      setPlayStatus(true);
    }
  }

  const seekSong = async (e)=> {
    //console.log(e);
    audioRef.current.currentTime = ((e.nativeEvent.offsetX / seekBg.current.offsetWidth)*audioRef.current.duration)
  }
  /*
  (e.nativeEvent.offsetX / seekBg.current.offsetWidth) calculates the proportion of the seek bar that was clicked (a value between 0 and 1).
  Multiplying this proportion by audioRef.current.duration converts it to the corresponding time position in the audio track.
  */

  useEffect(()=>{
    setTimeout(()=>{
      audioRef.current.ontimeupdate = () => {
        seekBar.current.style.width = (Math.floor(audioRef.current.currentTime/audioRef.current.duration*100)) + "%";
        setTime({
          currentTime:{
            second: Math.floor(audioRef.current.currentTime%60),
            minute: Math.floor(audioRef.current.currentTime/60)
          }, // The currentTime property returns the current position of the audio/video playback
          totalTime:{
            second: Math.floor(audioRef.current.duration%60),
            minute: Math.floor(audioRef.current.duration/60)
          } //The duration property returns the length of an audio, in seconds.
        })
      }
    }, 1000)
  }, [audioRef, seekBar])


  const contextValue = {
    audioRef,
    seekBg,
    seekBar,
    track, setTrack,
    playStatus, setPlayStatus,
    time, setTime,
    play, pause,
    playWithId,
    previous, next,
    seekSong
  }

  return(
    <PlayerContext.Provider value={contextValue}>
      {props.children}
    </PlayerContext.Provider>
  )
}

export default PlayerContextProvider;



/*
  The 'props.children' represents any content or components nested inside the PlayerContextProvider. It allows any components rendered within PlayerContextProvider to be included as children and thus have access to the player context.

  const contextValue = { audioRef };
  Creates an object named contextValue that contains the audioRef. This object will be provided as the value for the PlayerContext.
*/