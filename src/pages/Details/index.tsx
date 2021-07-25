import { useEffect, useState } from 'react';
import { FaAngleRight, FaArrowLeft } from 'react-icons/fa';
import { Link, useParams } from 'react-router-dom';
import PageDefault from '../../components/PageDefault';

import { requestHero } from '../../services/heroesService';
import './details.css';

interface Params {
  readonly id: string;
}

interface DataHero {
  id: number;
  thumbnail: {
    path: string;
    extension: string;
  };
  name: string;
  series: {
    items: [{
      name: string;
    }]
  };
  comics: {
    items: [{
      name: string;
    }]
  };
  events: {
    items: [{
      name: string;
    }]
  };
  stories: {
    items: [{
      name: string;
    }]
  };
}

const DetailsHero = () => {

  const {id} = useParams<Params>();

  const [data, setData] = useState<DataHero[]>([]);
  const [clicked, setClicked] = useState<boolean>(true);
  const [element, setElement] = useState<string>('');

  useEffect(() => {
    async function rquestAPI(id: number) {
  
      const dataResponse = await requestHero(id);

      setData(dataResponse.data.results);
  
    }
  
    rquestAPI(parseInt(id));
  }, [id]);

  function handleClicked(elem: string) {
    const isClicked = !clicked;

    setElement(elem);
    setClicked(isClicked);

  }


  return (
    <PageDefault>

      {data.map((hero) => (
        <div key={hero.id} className="body__details">

          <div className="btn__voltar">
            <Link to={'/'}>
              <FaArrowLeft/>
              <span>Voltar</span>
            </Link>
          </div>

          <header className="title__hero">
            <h2>{hero.name}</h2>
          </header>

          <div className="container__hero">
            <div className="container__image__hero">
                <img 
                  key={hero.id}
                  src={`${hero.thumbnail.path}.${hero.thumbnail.extension}`}
                  alt={hero.name}
                  className="image__hero"/>
            </div>

            <div className="container__details">
              <div className={`container ${!clicked && element === 'series' ? 'active' : 'deactive'}`}>
                <div className="title__card" onClick={() => handleClicked('series')}>
                  <h3>Series</h3>
                  <FaAngleRight/>
                </div>

                {(!clicked && element === 'series') && (
                  <ul>
                    {hero.series.items.map((serie) => (
                      <li key={`${hero.id}${serie.name}`}>{serie.name}</li>
                    ))}
                    {!hero.series.items?.length && (
                      <li key={`${hero.id}_Not_found`}>Não há registros!</li>
                    )}
                  </ul>
                )}
              </div>

              <div className={`container ${!clicked && element === 'comics' ? 'active' : 'deactive'}`}>
                <div className="title__card" onClick={() => handleClicked('comics')}>
                  <h3>Comics</h3>
                  <FaAngleRight/>
                </div>

                {(!clicked && element === 'comics') && (
                  <ul>
                    {hero.comics.items.map((comic) => (
                      <li key={`${hero.id}${comic.name}`}>{comic.name}</li>
                    ))}
                    {!hero.comics.items?.length && (
                      <li key={`${hero.id}_Not_found`}>Não há registros!</li>
                    )}
                  </ul>
                )}
              </div>

              <div className={`container ${!clicked && element === 'events' ? 'active' : 'deactive'}`}>
                <div className="title__card" onClick={() => handleClicked('events')}>
                  <h3>Events</h3>
                  <FaAngleRight/>
                </div>

                {(!clicked && element === 'events') && (
                  <ul>
                    {hero.events.items.map((event) => (
                      <li key={`${hero.id}${event.name}`}>{event.name}</li>
                    ))}
                    {!hero.events.items?.length && (
                      <li key={`${hero.id}_Not_found`}>Não há registros!</li>
                    )}
                  </ul>
                )}
              </div>

              <div className={`container ${!clicked && element === 'stories' ? 'active' : 'deactive'}`}>
                <div className="title__card" onClick={() => handleClicked('stories')}>
                  <h3>Stories</h3>
                  <FaAngleRight/>
                </div>

                {(!clicked && element === 'stories') && (
                  <ul>
                    {hero.stories.items.map((story) => (
                      <li key={`${hero.id}${story.name}`}>{story.name}</li>
                    ))}
                    {!hero.stories.items?.length && (
                      <li key={`${hero.id}_Not_found`}>Não há registros!</li>
                    )}
                  </ul>
                )}
              </div>
            </div>
          </div>

        </div>
      ))}

      <footer className="footer__details">
        <span>Desenvolvido com</span>
        <div className="heart"> ❤ </div>
        <span>por<a href="https://www.linkedin.com/in/jonhoffmam/">Jon Hoffmam!</a></span>
      </footer>
    </PageDefault>
  )
}

export default DetailsHero;
