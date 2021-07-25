import React, { ChangeEvent, useEffect, useState } from 'react';
import { BsSearch } from 'react-icons/bs';
import './search.css';

interface InputValue {
  readonly getInputValue: React.Dispatch<React.SetStateAction<string>>
}

const Search = (props: InputValue) => {

  const sendSearchValue = props.getInputValue;

  const [timer, setTimer] = useState<NodeJS.Timeout>();
  const [heroName, setHeroName] = useState('');

  useEffect(() => {
    const timerNow = setTimeout(() => {sendSearchValue(heroName)}, 1000);

    setTimer(timerNow);
  }, [heroName, sendSearchValue]);

  
  function handleInputHeroName(event: ChangeEvent<HTMLInputElement>) {
    const name = event.target.value;

    setHeroName(name);
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    clearTimer();

    if (event.key === 'Enter' || event.key === 'Tab') {
      sendSearchValue(heroName);
    }
  }

  function clearTimer() {
    timer && clearTimeout(timer);
  }

  return (
    <>
      <label className="label__search" htmlFor="search">Nome do personagem</label>
      <div className="search">
        <BsSearch className="icon__search"/>
        <input
          type="text"
          name="search"
          placeholder="Search"
          value={heroName}
          onBeforeInput={clearTimer}
          onKeyDown={handleKeyDown}
          onChange={handleInputHeroName} />
      </div>
    </>
  )
}

export default Search;
