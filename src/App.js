import React from 'react';
import './App.scss';
import Search from './features/search/search';
import OwnerList from './app/components/owner/ownerList';

function App() {
  return (
    <div className="App">
      <div className='container mx-auto px-4'>
        <h1 className='mx-auto px-4 my-4 text-4xl text-center'>Github User's Repos Search</h1>
        <Search />
        <OwnerList />
      </div>
    </div>
  );
}

export default App;
