import React, { useEffect, useState } from "react";
import DisplayCard from "./DisplayCard";
import { StyledButton } from "./StyledComponents";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { db, auth } from "../firebase";
import { getEquityData } from "../getEquityData";
import { onAuthStateChanged } from "firebase/auth";


const FavoritesPage = ({handleClick, handleFavoritesPrimary, handleFavoritesDisabled}) => {

    const [myFavorites, setMyFavorites] = useState([]);
    const [favoriteData, setFavoriteData] = useState({"test":{bodyText: "test"}})
    const [coolDown, setCoolDown] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        loadFavorites();
        monitorAuthState();
    },[]);

    
    const monitorAuthState = async () => {
        onAuthStateChanged(auth, user => {
            if (user) {
                setIsLoggedIn(true);
                
            } else {
                setIsLoggedIn(false);  
            }
        });
    }



    async function loadFavorites() {
        const docRef = doc(db, "stocks", "favorites");
        const docSnap = await getDoc(docRef);
      
        if (docSnap.exists()) {
          // console.log(docSnap.data().favorites);
          let firebaseFavorites = docSnap.data().favorites;
          //return docSnap.data().favorites;
          setMyFavorites(firebaseFavorites);
        } else {
          console.log("No such document!");
        }
      }

    const getQuote = async (ticker) => {
        console.log("getting quote");
        let quote = await getEquityData(ticker);
        if (quote[4]) {startCoolDownTimer()}
        console.log(quote);
        setFavoriteData( {...favoriteData,
            [ticker]: {bodyText: quote[2], footerText: quote[3]}
        });
        // console.log(favoriteData);
        //console.log(data[ticker].bodyText);
        //setFavoriteData(data)
    } 

    // This is repeat code from App. Can they be consolidated?
    const startCoolDownTimer = () => {
        console.log("start cooldown");
        setCoolDown(true);
        setTimeout(() => {
          setCoolDown(false);
          console.log("cooldown done!");
        }, 30000);
        
      }

    return(
        
        <div>
            {isLoggedIn &&
            <div>
            <h3>Favorites</h3>
            {myFavorites.map((favorite) => {
                
                // let searchResult = getEquityData(favorite.ticker)
                
                return(
                    <DisplayCard
                    key={favorite.id}
                    headerText={favorite.ticker}
                    bodyText={favoriteData[favorite.ticker] ? favoriteData[favorite.ticker].bodyText : ""}
                    footerText={favoriteData[favorite.ticker] ? favoriteData[favorite.ticker].footerText : ""} 
                    
                    showButton={true}
                    buttonText={favoriteData[favorite.ticker] ? "Refresh quote" : "Fetch Quote"}
                    handleClick={() => getQuote(favorite.ticker)}
                    handlePrimary={!coolDown}
                    handleDisabled={coolDown}
                    />
                        
                );
            })}

            <StyledButton onClick={handleClick}>Does nothing</StyledButton>
            </div> } 
        </div>
    )
}

export default FavoritesPage;