
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import useWindowSize from '../../utils';
import './cardHero.css';

interface PropCard {
  readonly id: number;
  readonly image?: string;
  readonly name?: string;
  readonly series?: [{name: string}];
  readonly seriesAmount?: number;
  readonly events?: [{name: string}];
  readonly eventsAmount?: number;
}

const CardHero = (props: PropCard) => {
  const {id, image, name, seriesAmount, eventsAmount} = props;
  const series = props.series || [];
  const events = props.events || [];

  const finalSeries = series.length > seriesAmount! ? series.slice(0,seriesAmount) : series;
  const finalEvents = events.length > eventsAmount! ? events.slice(0,eventsAmount) : events;

  const { width } = useWindowSize();

  const [displaySeries, setDisplaySeries] = useState<boolean>(true);
  const [displayEvents, setDisplayEvents] = useState<boolean>(true);

  const history = useHistory();

  useEffect(() => {
    const displayColumEvents = width < 720 ? false : true;
    const displayColumSeries = width < 576 ? false : true;
    setDisplayEvents(displayColumEvents);
    setDisplaySeries(displayColumSeries);
  }, [width]);

  function handleOpenDetails() {
    history.push(`/detalhes/${id}`);
  }

  return (

    <div className="card" onClick={handleOpenDetails}>
      <div className="character">
        {image && <img src={image} alt={name} />}
        <span title={name}>{name}</span>
      </div>

      {displaySeries && (
        <ul className="series">
          {finalSeries.map(serie => {
            const seriesName = serie.name;
            return <li key={`${seriesName}${id}`} title={seriesName}>{seriesName}</li>
          })}
        </ul>
      )}

      {displayEvents && (
        <ul className="events">
          {finalEvents.map(event => {
            const eventName = event.name;
            return <li key={`${eventName}${id}`} title={eventName}>{eventName}</li>
          })}
        </ul>
      )}
    </div>

  );
}

export default CardHero;