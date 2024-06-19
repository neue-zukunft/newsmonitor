import { useState } from 'react'
import './App.css'
import data from '../public/klimadata.json'
import exampleUrl from '../public/beispiel.png'
import logoUrl from '../public/NZ-LOGO-RGB-bw.png'
import { Tooltip } from 'react-tooltip'

function App() {
  const containers = Array.from({ length: 50 }, (_, index) => index + 1);
  const mediaBlocks = ["Tagesschau", "heute", "Spiegel", "Zeit", "SZ", "taz", "FAZ", "rnd", "Welt"].sort(() => Math.random()-0.5)
  
  const handleClick = (myLink) => () => {
    window.location.href=myLink;
  }

const latestTimestamp = data.reduce((latest, item) => {
  const timestamp = new Date(item.date).getTime();
  return timestamp > latest ? timestamp : latest;
}, 0);

const formattedTimestamp = new Date(latestTimestamp-7200000).toLocaleString('de-DE', {
  day: '2-digit',
  month: '2-digit',
  year: '2-digit',
  hour: '2-digit',
  minute: '2-digit'
});

const formattedDataLength = (data.length / 450 * 100).toFixed(1) + '%';

  return (
    <>
    <div className='headlineblockLeft'>
      <h1 className='h1Left'>
        Newsmonitor
      </h1>
      
      <h2 className='h2Left'>
        alpha
      </h2>
    </div>

    <div className='headlineblockRight'>
      <div className='angebotRight'>
        Ein&nbsp;Angebot&nbsp;von&nbsp;&nbsp;</div>
      <img 
        src={logoUrl}
        alt='Logo'
        className='logo'
      ></img>
    </div>

      <div style={{display:'inline-block'}}>
      <p className='fristBlock'>
        Wieviel News zur Klimakrise finden sich jetzt gerade auf den ersten 50 Positionen der Startseiten von Nachrichtenwebsites? Mehr zum Hintergrund und Methodik unterhalb. Letzte Aktualisierung: {formattedTimestamp}.</p>
      {/* // Hier werden auf den angegeben Medienprotalen in absteigender Reihung die ersten fünfzig Artikelpositionen angezeigt. 
      // Die grünen Positionen markieren die Artikel, bei denen die Buchstabenfolge "Klima" im Titel oder im Text vorkommt. Das können 
      // zum Beispiel die Wörter "Klimakrise" oder "Weltklimarat" sein. Gängige falsch-positive 
      // Begriffe wie "Familienklima" oder "Betriebsklima" werden dabei rausgefiltert. Sollte 
      // die ganze Anzeige grau sein, so finden sich gerade keine entsprechenden Artikel auf 
      // den Medienportalen, ein Beispiel findet man <a href={exampleUrl}> hier</a>. Die Anzeige wird alle dreißig Minuten automatisch aktualisiert. 
      // Die letzte Aktualisierung war .</p> */}
      </div>

      <div style={{display:'inline'}}>
        <p className='secondBlock'>
          Zur Zeit handeln {formattedDataLength} der Beiträge auf {mediaBlocks.length} News-Starseiten von der Klimakrise.
        </p>
      </div>

      <div className='tableBlock'>

            {mediaBlocks.map(media => {
        const filteredData = data.filter(d => d.name === media);

        const filledContainers = Array.from({ length: 50 }, (_, index) => {
          const item = filteredData.find(data => data.position === index + 1);
          return item ? item : null;
        });

        console.log(filledContainers);

        return (

        <div key={media} className='mediaBlock'>
          <p className='mediaTitle'>{media}</p>
          {containers.map(container => {
            const isRed = filteredData.map(data => data.position).includes(container);
            //const links = filteredData.map(data => data.url);

            //const initialLinks = filteredData.map(data => data.url);
            //const [links, setLinks] = useState(filteredData.map((data) => data.url));
            //links.shift()
            return (


              <div 
                key={container}
                data-tooltip-id={isRed ? "my-tooltip" : null}
                data-tooltip-content={isRed ? filledContainers[container-1].title : null}
                //onMouseEnter={isRed ? () => console.log('Test') : null}
                //onClick={isRed ? handleClners[container-1].url) : null}
                style={{
                  backgroundColor: isRed ? 'rgb(255,100,0)' : 'rgb(234,232,228)',
                  padding: '10px',
                  margin: '0.5px',
                  width: '70px',
                  height: '0.5px',
                }}>
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
