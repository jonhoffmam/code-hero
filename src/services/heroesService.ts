import md5 from 'crypto-js/md5';

interface Data {
  readonly limitItemsPage: number;
  readonly pageOffset: number;
  readonly searchName?: string;
}

const URL_BASE = 'https://gateway.marvel.com/v1/public/characters'
const API_KEY_PRIV = process.env.REACT_APP_API_KEY_PRIV;
const API_KEY_PUB = process.env.REACT_APP_API_KEY_PUB;

const parameters = {
  timeStamp() {
    return Number(new Date());
  },
  hash(timeStamp: number) {
    return md5(`${timeStamp}${API_KEY_PRIV}${API_KEY_PUB}`).toString();
  }
}

export const requestHeroes = async (props: Data) => {
  const {limitItemsPage, pageOffset, searchName} = props;
  const nameStartsWith = (searchName && `&nameStartsWith=${searchName}`) || '';

  const timeStamp = parameters.timeStamp();
  const hash = parameters.hash(timeStamp);

  const url = `${URL_BASE}?ts=${timeStamp}${nameStartsWith}&orderBy=name&offset=${pageOffset}&limit=${limitItemsPage}&apikey=${API_KEY_PUB}&hash=${hash}`;

  const request = await fetch(url);
  
  return request.json();

}

export const requestHero = async (id: number) => {

  const timeStamp = parameters.timeStamp();
  const hash = parameters.hash(timeStamp);

  const url = `${URL_BASE}/${id}?ts=${timeStamp}&apikey=${API_KEY_PUB}&hash=${hash}`;
  
  const request = await fetch(url);
  
  return request.json();  
}
