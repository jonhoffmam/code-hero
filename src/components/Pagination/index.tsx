import React, { useEffect, useState } from 'react';
import { FaAngleDoubleLeft, FaAngleDoubleRight, FaAngleLeft, FaAngleRight } from 'react-icons/fa';

import useWindowSize from '../../utils';
import { requestHeroes } from '../../services/heroesService';
import './pagination.css';

interface Data {
  data: {
    results: []
  };
}

interface PropFooter {
  readonly getResponse: React.Dispatch<React.SetStateAction<Data>>;
  readonly getLoader: React.Dispatch<React.SetStateAction<boolean>>;
  readonly sendSearchValue: string;
}

const Pagination = (props: PropFooter) => {
  
  const sendResponse = props.getResponse;
  const sendLoader = props.getLoader;
  const searchValue = props.sendSearchValue || '';
  
  const itemsPerPage = 4;
  
  const { width } = useWindowSize();
  
  const [maxVisibleButtons, setMaxVisibleButtons] = useState<number>(5);
  const [totalPages, setTotalPages] = useState<number>(maxVisibleButtons);
  const [page, setPage] = useState<number>(1);
  const [maxLeft, setMaxLeft] = useState<number>(1);
  const [maxRight, setMaxRight] = useState<number>(maxVisibleButtons);
  const [buttons, setButtons] = useState<number[]>([]);

  useEffect(() => {
    const visibleButtons = width < 576 ? 3 : 5;
    setMaxVisibleButtons(visibleButtons);
  }, [width])

  useEffect(() => {

    async function rquestAPI(pageNumber: number) {

      sendLoader(true);

      const offset = ((pageNumber - 1) * itemsPerPage);
      const dataResponse = await requestHeroes({pageOffset: offset, limitItemsPage: itemsPerPage, searchName: searchValue});
  
      const getTotalPages = Math.ceil(dataResponse.data.total/itemsPerPage);
      
      try {
        setTotalPages(getTotalPages);
        sendResponse(dataResponse);
      } catch (err) {
        return err;
      } finally {
        sendLoader(false);
      }
  
    }

    rquestAPI(page);
  }, [page, sendResponse, sendLoader, searchValue])

  useEffect(() => {
    function maxButtons() {
    
      const setMaxValue = (pos: string) => {
        const checkPositionNegative = (page - Math.floor(maxVisibleButtons/2)) < 1;
        const checkPositionExceeds = (page + Math.floor(maxVisibleButtons/2)) > totalPages;
  
        if (checkPositionNegative && pos === 'left') {
          return 1;
        } else if (checkPositionNegative && pos === 'right') {
          return totalPages > maxVisibleButtons ? maxVisibleButtons : totalPages ;
        }
  
        if (checkPositionExceeds && pos === 'left') {
          return totalPages > maxVisibleButtons ? (totalPages - (maxVisibleButtons - 1)) : (totalPages - (totalPages - 1));
        } else if (checkPositionExceeds && pos === 'right') {
          return totalPages;
        }
  
        return pos === 'left' ? (page - Math.floor(maxVisibleButtons/2)) : (page + Math.floor(maxVisibleButtons/2));
      }
  
      const maxLeftValue = setMaxValue('left');
      const maxRightValue = setMaxValue('right');
  
      setMaxLeft(maxLeftValue);
      setMaxRight(maxRightValue);
    }

    maxButtons();

  }, [page, totalPages, maxVisibleButtons])

  useEffect(() => {
    function createButtons() {
      let buttonsCreated = [];
  
      for (let pageNow = maxLeft; pageNow <= maxRight; pageNow++) {
        buttonsCreated.push(pageNow);
      }
  
      setButtons(buttonsCreated);
    }
    createButtons();
  }, [maxLeft, maxRight]);

  const controls = {
    nextPage() {
      if (page >= totalPages) return;

      const pageNumber = page + 1;

      setPage(pageNumber);
    },
    previousPage() {
      if (page <= 1) return

      const pageNumber = page - 1;

      setPage(pageNumber);
    },
    goToPage(pageNow: number) {
      setPage(pageNow);
    }
  }

  return (
    <ul className="pagination">
      {maxLeft > 1 &&
        <>
          <span className="controls" onClick={() => controls.goToPage(1)}><FaAngleDoubleLeft/></span>
          <span className="controls" onClick={controls.previousPage}><FaAngleLeft/></span>
        </>
      }

      {buttons.map(numberPage => (
        <li key={numberPage} 
            className={`page ${numberPage === page ? 'active' : 'default'}`}
            onClick={() => controls.goToPage(numberPage)}>
          <span>{numberPage}</span>
        </li>
      ))}

      {maxRight < totalPages && 
        <>
          <span className="controls" onClick={controls.nextPage}><FaAngleRight/></span>
          <span className="controls" onClick={() => controls.goToPage(totalPages)}><FaAngleDoubleRight/></span>
        </>
      }
    </ul>
  )
}

export default Pagination;
