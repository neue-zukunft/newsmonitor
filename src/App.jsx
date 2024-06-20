import './App.css'
import data from '../public/klimadata.json'
import logoUrl from '../public/NZ-LOGO-RGB-bw.png'
import logoNMUrl from '../public/logo_newsm.png'
import { Tooltip } from 'react-tooltip'

function App() {
  const containers = Array.from({ length: 50 }, (_, index) => index + 1);

  const mediaBlocks = ["Tagesschau", "heute", "Spiegel", "Zeit", "SZ", "taz", "FAZ", "rnd", "Welt"].sort(() => Math.random()-0.5)

const latestTimestamp = data.reduce((latest, item) => {
  const timestamp = new Date(item.date).getTime();
  return timestamp > latest ? timestamp : latest;
}, 0);

const lastDate = new Date(latestTimestamp-7200000).toLocaleString('de-DE', {
  day: '2-digit',
  month: '2-digit',
  year: '2-digit',
});

const lastTime = new Date(latestTimestamp-7200000).toLocaleString('de-DE', {
  hour: '2-digit',
  minute: '2-digit'
});

const formattedDataLength = (data.length / 450 * 100).toFixed(1) + '%';

const positions = Array.from({ length: 50 }, (_, index) => {
  if ((index + 1) % 5 === 0) {
    return (index + 1).toString();
  } else {
    return "";
  }
});

const handleClick = (myLink) => () => {
  window.open(myLink, '_blank');
  
  //window.location.target="_blank";
  //window.location.href=myLink;
}


  return (
    <>
    <div class='vw-100 container'>
    <div class="row">
    <div class='headlineblockLeft col-12 col-xs-12 col-sm-12 col-md-7 col-lg-7 col-xl-7'>
    <img 
        src={logoNMUrl}
        alt='Logo'
        className='logoNM'
      ></img>
    </div>

    <div class='
      d-flex 
      justify-content-start 
      col-12 
      justify-content-xs-start 
      col-xs-12 
      justify-content-sm-end 
      col-sm-12 
      justify-content-md-end 
      col-md-5 
      justify-content-lg-end 
      col-lg-5'
      >
      <div class='angebotRight d-none d-lg-block'>
        Ein&nbsp;Angebot&nbsp;von&nbsp;&nbsp;
      </div>
      <a href="https://www.neuezukunft.info" 
        target="_blank"><img 
        src={logoUrl}
        alt='Logo'
        className='logo d-none d-lg-block'
      ></img></a>
    </div>
    </div>

    <div class='row'>
      <div class='col-12 col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12'>
      <p class='firstBlock'>
        Erläuterung siehe <a href='#'>unten</a>.</p>

      {/* 
      Wieviele Artikel zur Klimakrise finden sich derzeit auf den ersten 50 Positionen der Startseiten von Nachrichtenwebsites? 

      // Hier werden auf den angegeben Medienprotalen in absteigender Reihung die ersten fünfzig Artikelpositionen angezeigt. 
      // Die grünen Positionen markieren die Artikel, bei denen die Buchstabenfolge "Klima" im Titel oder im Text vorkommt. Das können 
      // zum Beispiel die Wörter "Klimakrise" oder "Weltklimarat" sein. Gängige falsch-positive 
      // Begriffe wie "Familienklima" oder "Betriebsklima" werden dabei rausgefiltert. Sollte 
      // die ganze Anzeige grau sein, so finden sich gerade keine entsprechenden Artikel auf 
      // den Medienportalen, ein Beispiel findet man <a href={exampleUrl}> hier</a>. Die Anzeige wird alle dreißig Minuten automatisch aktualisiert. 
      // Die letzte Aktualisierung war .</p> */}
      </div>
      </div>
   
      <div class='row'>
      <div style={{display:'inline'}}>
        <p class='secondBlock col-12 col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12'>
        Zur Zeit handeln {formattedDataLength} der Beiträge auf {mediaBlocks.length} News-Startseiten von der Klimakrise --- Stand {lastDate} - {lastTime} Uhr
        </p>
      </div>
      </div>
     
      <div class='row'>
      <div class='overflow-auto col-12 col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12'>
      <div class='tableBlock'>
        
            {mediaBlocks.map(media => {
        const filteredData = data.filter(d => d.name === media);

        const filledContainers = Array.from({ length: 50 }, (_, index) => {
          const item = filteredData.find(data => data.position === index + 1);
          return item ? item : null;
        });
        
        

        return (
        <div key={media} className='mediaBlock' >
          <p className='mediaTitle'>{media}</p>
 
          {containers.map(container => {
            const isRed = filteredData.map(data => data.position).includes(container);
            
            //const links = filteredData.map(data => data.url);

            //const initialLinks = filteredData.map(data => data.url);
            //const [links, setLinks] = useState(filteredData.map((data) => data.url));
            //links.shift()
            return (

              <div 
                key={`${media}-${container}`}
                data-tooltip-id={isRed ? `${media}-${container}` : null}
                data-tooltip-content={isRed ? filledContainers[container-1].title : null}
                //onMouseEnter={isRed ? () => console.log('Test') : null}
                onClick={isRed ? handleClick(filledContainers[container-1].url) : null}
                style={{
                  backgroundColor: isRed ? 'rgb(255,100,0)' : 'rgb(234,232,228)',
                  paddingTop: '4.5px',
                  paddingBottom: '4.5px',
                  margin: '2px',
                  width: '90px',
                }}>
                  <Tooltip id={`${media}-${container}`} 
                  style={{
                    width: '200px',
                    backgroundColor: 'rgb(219,191,255)',
                    color: 'black',
                  }}/>
              </div>
      
   
            );

        })
        }
        </div>
        );
        })}
      </div>
      </div>
      </div>
      </div>

    </>
  )
}

export default App
