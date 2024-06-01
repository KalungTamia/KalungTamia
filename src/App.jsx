import React, { useContext } from "react"
import Player from "./Components/Player"
import Sidebar from "./Components/Sidebar"
import Display from "./Components/Display"
import { PlayerContext } from "./Context/PlayerContext"

function App() {

  const {audioRef, track} = useContext(PlayerContext)

  return (
    <>
      <div className='h-screen bg-black'>
        <div className='h-[90%] flex'>
          <Sidebar />
          <Display />
        </div>
        <Player />
        <audio src={track.file} ref={audioRef} preload="auto"></audio>
      </div>
    </>
  )
}

export default App


