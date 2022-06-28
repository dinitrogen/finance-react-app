import './App.css';
import React, { useState } from "react";
import LandingPage from './components/LandingPage';
import SearchBar from './components/SearchBar';
import DisplayCard from './components/DisplayCard';
import { getEquityData } from './getEquityData';
import HistoryPage from './components/HistoryPage';
import uniqid from 'uniqid';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const App = () => {

  const [headerText, setHeaderText] = useState('');
  const [bodyText, setBodyText] = useState('');
  const [footerText, setFooterText] = useState('');
  const [ticker, setTicker] = useState('');
  const [tickers, setTickers] = useState([]);
    
  const handleChange = (event) => {
      const value = event.target.value;
      setTicker(value);
  }

  const handleClick = (event) => {
    runEquitySearch(event);
    setTicker('');
  }

  async function runEquitySearch(event) {
    event.preventDefault();
    setHeaderText('Fetching price...');
    setBodyText('Please wait');
    setFooterText('');
    const searchResults = await getEquityData(ticker);
    setHeaderText(searchResults[0]);
    setBodyText(searchResults[1]);
    setFooterText(searchResults[2]);
    let newTicker = {key: uniqid(),headerText: searchResults[0], bodyText: searchResults[1], footerText: searchResults[2]};
    setTickers([newTicker, ...tickers]);
  }

  const clearSearchHistory = () => {
    setTickers([]);
  }

  return (
    
    <BrowserRouter>

    <div>
      <LandingPage />
      <Routes>
        <Route path="/finance-react-app" element = {

          <div>
            <SearchBar
              ticker={ticker}
              clicked = {handleClick}
              handleChange = {handleChange} />
            <DisplayCard
              headerText={headerText}
              bodyText={bodyText}
              footerText={footerText} />
          </div>} />
        
        <Route path="history" element = {
          <HistoryPage
            tickers={tickers}
            handleClick={clearSearchHistory} />} />
      </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;
