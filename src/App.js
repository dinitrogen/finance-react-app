import './App.css';
import React, { useState } from "react";
import LandingPage from './components/LandingPage';
import SearchBar from './components/SearchBar';
import DisplayCard from './components/DisplayCard';
import { getEquityData } from './getEquityData';
import HistoryPage from './components/HistoryPage';
import uniqid from 'uniqid';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { collection, addDoc, doc } from "firebase/firestore";
import { db } from './firebase';

async function firestoreTest(ticker, price, date) {

  try {
    const docRef = await addDoc(collection(db, "stocks"), {
      ticker: ticker,
      price: price,
      date: date
    });
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}


const App = () => {

  const [headerText, setHeaderText] = useState('');
  const [bodyText, setBodyText] = useState('');
  const [footerText, setFooterText] = useState('');
  const [ticker, setTicker] = useState('');
  const [tickers, setTickers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [coolDown, setCoolDown] = useState(false);
    
  const handleChange = (event) => {
      const value = event.target.value;
      setTicker(value);
  }

  const handleClick = (event) => {
    runEquitySearch(event);
    setTicker('');
  }

  const startCoolDownTimer = () => {
    console.log("start cooldown");
    setCoolDown(true);
    setTimeout(() => {
      setCoolDown(false);
      console.log("cooldown done!");
    }, 30000);
    
  }

  async function runEquitySearch(event) {
    event.preventDefault();
    setLoading(true);
    const searchResults = await getEquityData(ticker);
    setLoading(false);
    setHeaderText(searchResults[1]);
    setBodyText(searchResults[2]);
    setFooterText(searchResults[3]);
    if (searchResults[0]) {
      let newTicker = {key: uniqid(),headerText: searchResults[1], bodyText: searchResults[2], footerText: searchResults[3]};
      setTickers([newTicker, ...tickers]);
      firestoreTest(searchResults[1], searchResults[2], searchResults[3]);
    }
    if (searchResults[4]) {
      startCoolDownTimer();
    }
  }

  const clearSearchHistory = () => {
    setTickers([]);
  }

  return (
    
    <BrowserRouter>

    <div>
      <LandingPage />
      <Routes>
        {/* To get Firebase hosting to direct to /finance-react-app, I added a "redirect" to the firebase.json */}
        <Route path="/finance-react-app" element = {

          <div>
            <SearchBar
              ticker={ticker}
              clicked = {handleClick}
              handleChange = {handleChange}
              coolDown={coolDown} />
            <DisplayCard
              loading={loading}
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
