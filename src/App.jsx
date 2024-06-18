import { useState } from 'react'
import './App.css'
import data from '../public/klimadata.json'
import { Tooltip } from 'react-tooltip'

function App() {
  const containers = Array.from({ length: 50 }, (_, index) => index + 1);
  const mediaBlocks = ["Tagesschau", "heute", "Spiegel", "Zeit", "SZ", "taz", "FAZ", "rnd", "Welt"]
  
  const handleClick = (myLink) => () => {
    window.location.href=myLink;
  }
  

  return (
    <>
      <h1>Newsmonitor</h1>
      <p
      style={{
        width: '90vw',
        border: '1px solid black',
        backgroundColor: 'lightgrey',
      }}
      >Hier werden auf den angegeben Medienprotalen die Positionen der Artikel angezeigt, 
      bei welchen die Buchstabenfolge "Klima" im Titel oder im Artikel vorkommt. Das können 
      zum Beispiel die Wörter "Klimakrise" oder "Weltklimarat" sein. Gängige falsch-positive 
      Begriffe wie "Familienklima" oder "Betriebsklima" werden dabei rausgefiltert. Sollte 
      die ganze Anzeige grau sein, so finden sich gerade keine entsprechenden Artikel auf 
      den Medienportalen, ein Beispiel findet man <a href="#"> hier</a>. Die Anzeige wird alle dreißig Minuten automatisch aktualisiert. 
      Die letzte Aktualisierung war XXX.</p>
      
      <div style={{
        display: 'flex',
        //width: '100%',
        width: '90vw',
        border: '1px solid black',
        overflow: 'auto'
            }}>

            {mediaBlocks.map(media => {
        const filteredData = data.filter(d => d.name === media);

        const filledContainers = Array.from({ length: 50 }, (_, index) => {
          const item = filteredData.find(data => data.position === index + 1);
          return item ? item : null;
        });

        console.log(filledContainers);

        return (

        <div key={media} className='mediaBlock'
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100px',
          padding: '10px',
          margin: '10px',
          border: '1px solid black',
          
        }}
        >
          <h2>{media}</h2>
          {containers.map(container => {
            const isRed = filteredData.map(data => data.position).includes(container);
            const links = filteredData.map(data => data.url);

            //const initialLinks = filteredData.map(data => data.url);
            //const [links, setLinks] = useState(filteredData.map((data) => data.url));
            //links.shift()
            return (

              <div 
                key={container}
                data-tooltip-id={isRed ? "my-tooltip" : null}
                data-tooltip-content={isRed ? filledContainers[container-1].title : null}
                onMouseEnter={isRed ? () => console.log('Test')
                 : null}
                //onClick={isRed ? handleClick(filledContainers[container-1].url) : null}
                style={{
                  backgroundColor: isRed ? 'green' : 'lightgrey',
                  padding: '10px',
                  margin: '0.5px',
                  width: '70px'
                }}
              >
                <Tooltip id="my-tooltip" />
              </div>
            );

        })
        }
        </div>
        );
        })}
      </div>
    </>
  )
}

export default App
