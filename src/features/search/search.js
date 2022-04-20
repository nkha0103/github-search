import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addSearchOwners, resetSearchOwenrs } from './searchSlide';
import { selectSearchOwners } from './searchSlide';

import rateLimitApi from '../../app/api/rateLimitApi';

function Search() {
  const [inputValue, setInputValue] = useState('');
  const dispatch = useDispatch();
  const owners = useSelector(selectSearchOwners);

  const handleSearchSubmit = async (e) => {
    e.preventDefault()
    if (owners.length > 0) {
      dispatch(resetSearchOwenrs())
    };

    const searchOwners = inputValue.split(',');

    // Alert if API rate limit is exceeded
    const rateLimit = await rateLimitApi.getRateLimit();
    console.log('API rate limit remaining is ', rateLimit.rate.remaining)
    if (rateLimit.rate.remaining === 0) {
      const nextTime = new Date(rateLimit.rate.reset * 1000);
      const message = `Sorry!!! Rate limit exceeded. Try again after ${nextTime.toLocaleTimeString()}`;
      alert(message)
      return
    }

    dispatch(addSearchOwners(searchOwners));
    setInputValue('');
  }

  return (
    <div className="search-input mt-14 mb-10">
      <form onSubmit={(e) => handleSearchSubmit(e)}
        className="text-center">
        <input type="text"
          name="search"
          className='border-2 border-gray-400 p-2 w-80'
          placeholder="Enter username/organization"
          value={inputValue}
          onChange={(e) => setInputValue(e.currentTarget.value)}
        />
        <button
          type="button"
          className='border-2 border-cyan-600 p-2'
          onClick={(e) => handleSearchSubmit(e)}>
          Search
        </button>
      </form>
      <p className='search-input--note text-center text-[10px] italic mt-2'>
        Could enter multiple value separate by comma
      </p>
    </div>
  );
}

export default Search;
