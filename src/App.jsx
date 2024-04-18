import { useState } from 'react'
import './App.css'
import data from '../public/klimadata.json'

function App() {
  const containers = Array.from({ length: 50 }, (_, index) => index + 1);
  const mediaBlocks = ["Tagesschau", "Spiegel", "Zeit", "taz", "FAZ"]

  return (
    <>
      <h1>Klimamonitor</h1>
      <div style={{display: 'flex', width: '700px'}}>
      {mediaBlocks.map(media => {
        const filteredData = data.filter(d => d.name === media);
        return (
        <div key={media} className='mediaBlock'>
          <h2>{media}</h2>
          {containers.map(container => {
            const isRed = filteredData.map(data => data.position).includes(container);
            return (
            <div 
            key={container} 
            style={{
              backgroundColor: isRed ? 'red' : 'lightgrey',
              padding: '10px',
            }}
          />
        );
        })}
        </div>
        );
        })}
      </div>
    </>
  )
}

export default App
