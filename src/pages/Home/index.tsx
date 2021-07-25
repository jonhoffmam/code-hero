import { useEffect, useState } from 'react';

import useWindowSize from '../../utils';
import PageDefault from '../../components/PageDefault';
import Search from '../../components/Search';
import CardHero from '../../components/CardHero';
import Footer from '../../components/Footer';
import Loader from '../../components/Loader';

import './home.css';

interface DataHeroes {
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
  events: {
    items: [{
      name: string;
    }]
  };
}

interface Data {
  data: {
    results: []
  }
}

const Home = () => {

  const [data, setData] = useState<DataHeroes[]>([]);
  const [response, setResponse] = useState<Data>({data: {results: []}});
  const [loader, setLoader] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState<string>('');

  const { width } = useWindowSize();

  const [displayLabelSeries, setDisplaySeries] = useState<boolean>(true);
  const [displayLabelEvents, setDisplayEvents] = useState<boolean>(true);

  useEffect(() => {
    setData(response.data.results);
  }, [response]);

  useEffect(() => {
    const displayEvents = width < 720 ? false : true;
    const displaySeries = width < 576 ? false : true;
    setDisplayEvents(displayEvents);
    setDisplaySeries(displaySeries);
  }, [width]);
  
  return (
    <>
      <PageDefault>

          <article className={'body__code__hero'}>
            <section className="section__search">
              <h1>Busca de personagens</h1>
              <Search getInputValue={setSearchValue}/>
            </section>

            <div className="card__header">
              <span>Personagem</span>
              {displayLabelSeries && (
                <span>Séries</span>
              )}
              {displayLabelEvents && (
                <span>Eventos</span>
              )}
            </div>

            <section className="container__cards">
              {loader && <Loader/>}
              {data.map(item => (
                <CardHero 
                  key={item.id}
                  id={item.id}
                  name={item.name} 
                  image={`${item.thumbnail.path}/standard_medium.${item.thumbnail.extension}`}
                  series={item.series.items}
                  seriesAmount={3}
                  events={item.events.items}
                  eventsAmount={3}/>
              ))}
            </section>


          </article>

      </PageDefault>
      <Footer getResponse={setResponse} getLoader={setLoader} sendSearchValue={searchValue}/>
    </>
  )
}

export default Home;
