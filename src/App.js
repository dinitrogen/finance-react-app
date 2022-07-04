import './App.css';
import React, { useEffect, useState } from "react";
import LandingPage from './components/LandingPage';
import SearchBar from './components/SearchBar';
import DisplayCard from './components/DisplayCard';
import { getEquityData } from './getEquityData';
import HistoryPage from './components/HistoryPage';
import uniqid from 'uniqid';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { collection, addDoc, setDoc, getDoc, doc, Timestamp, updateDoc, arrayUnion, deleteField, arrayRemove } from "firebase/firestore";
import { db, auth } from './firebase';
import FavoritesPage from './components/FavoritesPage';
import { StyledAppDiv } from './components/StyledComponents';
import LoginPage from './components/LoginPage';
import { onAuthStateChanged } from 'firebase/auth';


async function checkForRepeats(userEmail, newTickerName) {
  // If no user is logged in (i.e. userEmail is undefined), exit the function or it will cause errors
  if (!userEmail) { 
    return;
  }
  
  const docRef = doc(db, "users", userEmail);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    
    let currentFavorites = docSnap.data().favorites;
    // console.log(currentFavorites);
    for (let favorite of currentFavorites) {
      if (favorite["ticker"] === newTickerName) {
        return false;
      }
    }
    return true;

  } else {
    console.log("No such document!");
  }
}

const printNothing = () => {console.log("Nothing!")}

const App = () => {

  const [headerText, setHeaderText] = useState('');
  const [bodyText, setBodyText] = useState('');
  const [footerText, setFooterText] = useState('');
  const [ticker, setTicker] = useState('');
  const [tickers, setTickers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [coolDown, setCoolDown] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [userName, setUserName] = useState('Guest');
  const [currentUser, setCurrentUser] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  useEffect(() => {
    monitorAuthState();
  },[]);


  const monitorAuthState = async () => {
    onAuthStateChanged(auth, user => {
        if (user) {           
          
            setCurrentUser(user);
            
            //  user display name does not update before setUserName is called, so using user.email for now.
            setUserName(user.email);
            setIsLoggedIn(true);
            
        } else {
          setUserName('Guest');
          setIsLoggedIn(false); 
        }
    });
  }
  

  async function addToFavorites(user,tickerName) {
  
    // TODO: Check if ticker is already in favorites
    let userEmail = user.email;
    if (await checkForRepeats(userEmail, tickerName)) {

      const newFavorite = {
        ticker: tickerName,
        date: Timestamp.fromDate(new Date()),
        id: uniqid()
      }
      
    
      try {
        const docSnap = await getDoc(doc(db, "users", userEmail))
        await updateDoc(doc(db, "users", userEmail), {favorites: arrayUnion(newFavorite)});
        console.log("added!");
        setIsFavorite(true);

      } catch(error) {
        console.log("Error: ", error)
      }
    } else {
      console.log("Not added");
    }
  }

  const removeFromFavorites = async (user, tickerName) => {
    let userEmail = user.email;
    console.log("removed!");
    setIsFavorite(false);
    const docSnap = await getDoc(doc(db, "users", userEmail));
    const arr = docSnap.data().favorites;
  
    const index = arr.findIndex(object => {
      return object.ticker === tickerName;
    });

    await updateDoc(doc(db, "users", userEmail), {favorites: arrayRemove(arr[index])});
  }

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
      
      // TODO: add a button or toggle to add to favorites
      if (await checkForRepeats(currentUser.email, searchResults[1])) {
        setIsFavorite(false)
      } else setIsFavorite(true)
      
      let newTicker = {key: uniqid(),headerText: searchResults[1], bodyText: searchResults[2], footerText: searchResults[3]};
      setTickers([newTicker, ...tickers]);
    
    }
    if (searchResults[4]) {
      startCoolDownTimer();
    }
  }

  const clearSearchHistory = () => {
    setTickers([]);
  }

  return (
    <StyledAppDiv>
      <BrowserRouter>

      <div>
        <LandingPage />
        <br></br>
        <div>Welcome, {userName}</div>
        <Routes>
          {/* To get Firebase hosting to direct to /finance-react-app, I added a "redirect" to the firebase.json */}
          <Route path="/finance-react-app" element = {

            <div>
              <SearchBar
                ticker={ticker}
                clicked = {handleClick}
                handleChange = {handleChange}
                coolDown={coolDown} />

              {bodyText && !headerText &&
                <div>
                <div><i>{bodyText}</i></div>
                <div><i>{footerText}</i></div>
                </div>
              }
              
              {headerText && <DisplayCard
                loading={loading}
                headerText={headerText}
                bodyText={bodyText}
                footerText={footerText}
                showButton={(isLoggedIn) ? true: false}
                handlePrimary={!isFavorite}
                buttonText={(isFavorite) ? "Remove from favorites" : "Add to favorites"}
                handleClick={(!isFavorite) ? () => addToFavorites(currentUser, headerText) : () => removeFromFavorites(currentUser, headerText)}
                />}
            </div>} />
          
          <Route path="history" element = {
            <HistoryPage
              tickers={tickers}
              showButton={false}
              handleClick={clearSearchHistory} />} />
          <Route path="favorites" element = {
            <div>
              <LoginPage />
              <FavoritesPage
                handleClick={printNothing} />
                
            </div> } />
        </Routes>
        <br></br>
        <div><b>Note:</b> the API only allows 5 requests per minute, and 500 total requests per day.</div>
      </div>
      </BrowserRouter>
    </StyledAppDiv>
  );
}

export default App;
