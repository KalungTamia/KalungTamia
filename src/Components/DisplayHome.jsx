import React from 'react'
import Navbar from './Navbar'
import { albumsData, songsData } from '../assets/assets'
import AlbumItem from './AlbumItem'
import SongItem from './SongItem'

const DisplayHome = () => {
  return (
    <>
      <Navbar />
      <div className='mb-4'>
        <h1 className='my-5 font-bold text-2xl'>Featured Charts</h1>
        <div className='flex overflow-auto'>
          {albumsData.map((item, index)=>(<AlbumItem key={index} name={item.name} desc={item.desc} id={item.id} image={item.image} />))}
        </div>
      </div>
      <div className='mb-4'>
        <h1 className='my-5 font-bold text-2xl'>Today's biggest hits</h1>
        <div className='flex overflow-auto'>
          {songsData.map((item, index)=>(<SongItem key={index} name={item.name} desc={item.desc} id={item.id} image={item.image} />))}
        </div>
      </div>
    </>
  )
}

export default DisplayHome




/*

The code snippet {albumsData.map((item, index)=>(<AlbumItem />))} is a piece of React JSX code that iterates over an array albumsData and renders a component <AlbumItem /> for each element in the array. Here's a detailed explanation:

Breakdown
albumsData.map:

albumsData is an array containing data related to albums.
The map function is a built-in JavaScript array method that creates a new array by calling a provided function on every element in the calling array.
Callback Function:

The map function takes a callback function as an argument. In this case, the callback function is (item, index) => (<AlbumItem />).
item is the current element being processed in the array.
index is the index of the current element being processed.
Rendering <AlbumItem />:

For each element in albumsData, the callback function returns a new <AlbumItem /> component.
This means that for every album in albumsData, an <AlbumItem /> component is rendered.
*/