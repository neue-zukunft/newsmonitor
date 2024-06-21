import './App.css'
import data from '../public/klimadata.json'
import logoUrl from '../public/NZ-LOGO-RGB-bw.png'
import logoNMUrl from '../public/logo_newsm.png'
import { Tooltip } from 'react-tooltip'

function App() {
  const containers = Array.from({ length: 50 }, (_, index) => index + 1);

  const mediaBlocks = ["Tagesschau", "heute", "Spiegel", "Zeit", "SZ", "taz", "FAZ", "rnd", "Welt"]
  
  const mediaBlocksP = [...mediaBlocks, "Position"].sort(() => Math.random() - 0.5);
  const positionIndex = mediaBlocksP.indexOf("Position");
  if (positionIndex !== -1) {
    mediaBlocksP.splice(positionIndex, 1);
    mediaBlocksP.unshift("Position");
  }

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

const refAssignCallback = (ref) => {
  if (ref) {
    //ref available = mounted.
    var element = ref;
    //var scrollWidth = element.scrollWidth;
    //var clientWidth = element.getBoundingClientRect().width;

    //explicitly set the scrollTop position of the scrollContainer
    element.scrollLeft = 1000;
    element.scroll({ left: -1000, behavior: 'smooth' });
  } 
}; 

const handleClick = (myLink) => () => {
  window.open(myLink, '_blank');
  
  //window.location.target="_blank";
  //window.location.href=myLink;
}


  return (
    <>
    <div className='container'>
    <div className="row">
    <div className='headlineblockLeft col-12 col-xs-12 col-sm-12 col-md-7 col-lg-7 col-xl-7'>
    <img 
        src={logoNMUrl}
        alt='Logo'
        className='logoNM'
      ></img>
    </div>

    <div className='
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
      <div className='angebotRight d-none d-lg-block'>
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

    <div className='row'>
      <div className='col-12 col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12'>
      <p className='firstBlock'>
        Erläuterung siehe <a href='#about'>unten</a>.</p>

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
   
      <div className='row'>
      <div style={{display:'inline'}}>
        <p className='secondBlock col-12 col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12'>
        Zur Zeit handeln {formattedDataLength} der ersten 50 Artikel auf {mediaBlocks.length} News-Startseiten von der Klimakrise --- Stand {lastDate} - {lastTime} Uhr
        </p>
      </div>
      </div>
     
      <div className='row'>
      <div className='overflow-auto col-12 col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12'>
      <div className='tableBlock' ref={refAssignCallback}>
        
            {mediaBlocksP.map(media => {
        const filteredData = data.filter(d => d.name === media);

        const filledContainers = Array.from({ length: 50 }, (_, index) => {
          const item = filteredData.find(data => data.position === index + 1);
          return item ? item : null;
        });

        return (
        
        <div key={media} className='mediaBlock' >

          {media === "Position" ? <p className='mediaTitleP'>&nbsp;</p> : <p className='mediaTitle'>{media}</p>}
 
          {containers.map(container => {
            const isRed = filteredData.map(data => data.position).includes(container);

            const title = filteredData.map(data => data.title);
            const datePublished = Math.max(...filteredData.map(data => data.date_published-7200000));

            //const latestPosition = filteredData.find(data => data.date === latestTimestamp)?.position;
            const highestPosition = Math.min(...filteredData.map(data => data.position));
            const highestPositiondata = Math.min(filteredData.map(data => data.highest_position));

            const now = new Date();
            const timeDiff = now - new Date(datePublished);
            const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
            const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));

            const timeDiffString = `${days} Tage ${hours} Stunden ${minutes} Minuten`;

            return (
              media === "Position" ? <div className='position align-middle'>{container}</div> :
              <div 
                className='mediaContainer'
                key={`${media}-${container}`}
                data-tooltip-id={isRed ? `${media}-${container}` : null}
                onClick={isRed ? handleClick(filledContainers[container-1].url) : null}
                style={{
                  backgroundColor: isRed ? 'rgb(255,100,0)' : 'rgb(234,232,228)'
                }}>
                  <div className='d-none d-lg-block'>
                  <Tooltip id={`${media}-${container}`} 
                  style={{
                    width: '200px',
                    //backgroundColor: 'rgb(219,191,255)',
                    //color: 'black',
                  }}
                  > 
                    {media}: {title}<br/>
                    Artikel erschienen vor: {timeDiffString}<br/>
                    Höchste Position: {highestPosition}<br/>
                    Position aktuell: {container}
                  </Tooltip>
                  </div>
              </div>
            );

        })
        }
        </div>
        );
        })}
      </div>
      <div className="linebeforeabout" />
      </div>

      </div>
      <div className='row'>
      <div className='abouttext'>
        <div className='row' id='about'>
      <div style={{display:'inline'}}>
      </div>
      </div>
<h2>Was ist hier zu sehen?</h2>

Wir von NEUE ZUKUNFT denken, dass die Klimakrise vielen journalistischen Medien deutlich zu wenig Aufmerksamkeit erfährt. Das wollen wir mit dem Newsmonitor sichtbar machen. Er zeigt, wieviele der ersten 50 Beiträge auf den Startseiten von deutschsprachigen Nachrichten-Websites von der Klimakrise handeln. 

Die Seiten werden alle 30 Minuten ausgewertet. Der Titel und Vorspann jedes Artikels werden nach Begriffen, die “Klima” enthalten, gescannt; bestimmte Begriffe wie “Klimaanlage” oder “akklimatisieren” werden nicht berücksichtig.

Per mouseover/touch ist der Titel entsprechender Beiträge abrufbar - per Klick/weiterer touch wird er im Browser geöffnet.
<br/>
<br/>
<h2>Woher stammen die Daten?</h2>

Wir holen die Daten über die Beiträge bei <a href="https://ueberblick.news/" target="_blank">https://ueberblick.news/</a> ab. Danke dafür, Marvin!
<br/>
<br/>
<h2>Mitmachen</h2>

Wenn Du die Entwicklung dieses Tools mitunterstützen willst, findest Du hier den Code (Github). Wir möchten das Tool weiter ausbauen, um noch weitere Visualisierungen und Auswertungen zeigen. Auch wollen wir die Daten als Open Data zur Verfügung zu stellen.

Generell suchen wir nach Menschen, die bei NEUE ZUKUNFT in unterschiedlichen Rollen mitwirken; Du kannst uns auch finanziell unterstützen.
<br/>
<br/>
<h2>Mitwirkende</h2>

Norman Schumann, Ina Schieferdecker, Marvin Mai, Felix Michel, Lorenz Matzat
      </div>
      </div>
      </div>

    </>
  )
}

export default App
