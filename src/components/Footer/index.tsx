import { useEffect, useState } from 'react';

import Pagination from '../Pagination';
import './footer.css';

interface PropHome {
  readonly getResponse: React.Dispatch<React.SetStateAction<Data>>;
  readonly getLoader: React.Dispatch<React.SetStateAction<boolean>>;
  readonly sendSearchValue: string;
}

interface Data {
  readonly data: {
    results: []
  };
}

const Footer = (props: PropHome) => {

  const sendResponse = props.getResponse;
  const sendLoader = props.getLoader;
  const searchValue = props.sendSearchValue;

  const [response, setResponse] = useState<Data>({data: {results: []}});
  const [loader, setLoader] = useState<boolean>(false);

  useEffect(() => {
    sendResponse(response);
    sendLoader(loader);
  }, [response, sendResponse, loader, sendLoader]);

	return (
    <>
      <footer className="footer__base">			
        <Pagination getResponse={setResponse} getLoader={setLoader} sendSearchValue={searchValue} />
      </footer>
    </>
	);
}

export default Footer;