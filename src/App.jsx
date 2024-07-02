import './App.css'
import rawData from '../public/klimadata.json'
import logoUrl from '../public/NZ-LOGO-RGB-bw.png'
import logoNMUrl from '../public/logo_newsm.png'
import { Tooltip } from 'react-tooltip'

function App() {
  const containers = Array.from({ length: 50 }, (_, index) => index + 1);

  const mediaBlocks = ["Tagesschau", "Spiegel", "Zeit", "SZ", "taz", "FAZ", "Welt", "SRF", "NZZ", "Tagesanzeiger", "nd", "heute", "Die Presse "]

  const data = rawData.filter(d => mediaBlocks.includes(d.name));

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

  const lastDate = new Date(latestTimestamp - 7200000).toLocaleString('de-DE', {
    day: '2-digit',
    month: '2-digit',
    year: '2-digit',
  });

  const lastTime = new Date(latestTimestamp - 7200000).toLocaleString('de-DE', {
    hour: '2-digit',
    minute: '2-digit'
  });

  const formattedDataLength = (data.length / (mediaBlocks.length * 50) * 100).toFixed(1) + '%';

  const refAssignCallback = (ref) => {
    if (ref) {
      var element = ref;
      element.scrollLeft = 1000;
      element.scroll({ left: -1000, behavior: 'smooth' });
    }
  };

  const handleClick = (myLink) => () => {
    window.open(myLink, '_blank');
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
          <div style={{ display: 'inline' }}>
            <p className='secondBlock col-12 col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12'>
              Zur Zeit handeln {formattedDataLength} der jeweils ersten 50 Artikel auf {mediaBlocks.length} News-Startseiten von der Klimakrise --- Stand {lastDate} - {lastTime} Uhr
            </p>
          </div>
        </div>

        <div className='row'>
          <div className='overflow-auto col-12 col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12'>
            <div className='tableBlock' ref={refAssignCallback}>

              {mediaBlocksP.map(media => {
                const filteredData = data.filter(d => d.name === media);

                var filledContainers = Array.from({ length: 50 }, (_, index) => {
                  const item = filteredData.find(data => data.position === index + 1);
                  return item ? item : null;
                });

                return (

                  <div key={media} className='mediaBlock' >

                    {media === "Position" ? <p className='mediaTitleP'>&nbsp;</p> : <p className='mediaTitle'>{media}</p>}

                    {containers.map(container => {
                      const isRed = filteredData.map(data => data.position).includes(container);

                      const now = new Date();
                      for (let i = 0; i < filledContainers.length; i++) {
                        if (filledContainers[i]) {
                          //console.log(filledContainers[i].date_published);
                          var timeDiff = now - new Date(filledContainers[i].date_published - 7200000);

                          var days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
                          var hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                          var minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));

                          var timeDiffString = ''
                          if (days > 0) {
                            var timeDiffString = `${days} d ${hours} h ${minutes} m`;
                          } else if (hours > 0) {
                            var timeDiffString = `${hours} h ${minutes} m`;
                          }
                          else {
                            var timeDiffString = `${minutes} m`;
                          }
                          filledContainers[i].publish_string = timeDiffString
                        }
                      }

                      return (
                        media === "Position" ? <div className='position'><span>{container === 1 ? container : container % 5 ? '' : container}</span></div> :
                          <div
                            className='mediaContainer'
                            key={`${media}-${container}`}
                            data-tooltip-id={isRed ? `${media}-${container}` : null}
                            onClick={isRed ? handleClick(filledContainers[container - 1].url) : null}
                            style={{
                              backgroundColor: isRed ? 'rgb(255,100,0)' : 'rgb(234,232,228)'
                            }}>
                            <div className='d-none d-lg-block'>
                              <Tooltip id={`${media}-${container}`}
                                style={{
                                  width: '200px'
                                }}
                              >
                                {media}: {isRed ? filledContainers[container - 1].title : ""}<br /><br />
                                Artikel erschienen vor: <br /> {isRed ? filledContainers[container - 1].publish_string : ""}<br />
                                Höchste Position: {isRed ? (filledContainers[container - 1].highest_position ? (filledContainers[container - 1].highest_position < container ? filledContainers[container - 1].highest_position : container) : container) : ""}<br />
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
              <div style={{ display: 'inline' }}>
              </div>
            </div>
            <h2>Was ist hier zu sehen?</h2>

            Wir von <a href="https://www.neuezukunft.info" target="_blank">NEUE ZUKUNFT</a> denken, dass die Klimakrise in vielen journalistischen Medien in Österreich, Deutschland und der Schweiz deutlich zu wenig Aufmerksamkeit erfährt.
            Das wollen wir mit dem Newsmonitor sichtbar machen. Er zeigt, wie viele der jeweils ersten 50 Beiträge auf den Startseiten Nachrichten-Websites von der Klimakrise handeln. Die Seiten werden alle 30 Minuten ausgewertet.
            Der Titel und Vorspann jedes Artikels werden nach Begriffen, die “Klima” enthalten, gescannt; bestimmte Begriffe wie “Arbeitsklima” oder “akklimatisieren” werden nicht berücksichtigt. Per Mouseover/Touch ist der Titel entsprechender
            Beiträge abrufbar – per Klick wird er im Browser geöffnet.

            <br />
            <br />
            <h2>Woher stammen die Daten?</h2>

            Wir holen die Daten über die Artikel bei <a href="https://ueberblick.news/" target="_blank">ueberblick.news</a> ab. Danke dafür, Marvin!
            <br />
            <br />
            <h2>Mitmachen</h2>

            Wenn Du die Entwicklung dieses Tools mit unterstützen willst, findest Du hier den Code (<a href="https://github.com/neue-zukunft/newsmonitor" target="_blank">Github</a>). Wir möchten das Tool weiter ausbauen, um noch mehr
            Visualisierungen und Auswertungen zu zeigen. Auch wollen wir die Daten als Open Data zur Verfügung stellen. Generell suchen wir nach Menschen, die bei NEUE ZUKUNFT in unterschiedlichen Rollen <a href="https://www.neuezukunft.info/wen-wir-suchen/" target="_blank">mitwirken</a>;
            Du kannst uns auch finanziell <a href="https://www.neuezukunft.info/unterstuetzen/" target="_blank">unterstützen</a>.
            <br />
            <br />
            <h2>Mitwirkende</h2>

            Norman Schumann, Ina Schieferdecker, Marvin Mai, Felix Michel, Lorenz Matzat
          </div>
        </div>
      </div>

    </>
  )
}

export default App
