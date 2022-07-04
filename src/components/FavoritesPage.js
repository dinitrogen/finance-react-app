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
        //loadFavorites(); This causes errors, and doesn't seem to be necessary.
        monitorAuthState();
    },[]);

    
    const monitorAuthState = async () => {
        onAuthStateChanged(auth, user => {
            if (user) {
                setIsLoggedIn(true);
                // console.log(user.email + " log in");
                loadFavorites(user.email);
                
            } else {
                setIsLoggedIn(false);
                setMyFavorites([]);
            }
        });
    }



    async function loadFavorites(userEmail) {
        const docRef = doc(db, "users", userEmail);
        const docSnap = await getDoc(docRef);
      
        if (docSnap.exists()) {
          //console.log(docSnap.data().favorites)
          let firebaseFavorites = docSnap.data().favorites;
          setMyFavorites(firebaseFavorites);
        } else {
          console.log("No such document!");
        }
      }

    const getQuote = async (ticker) => {
        // console.log("getting quote");
        let quote = await getEquityData(ticker);
        if (quote[4]) {startCoolDownTimer()}
        // console.log(quote);
        setFavoriteData( {...favoriteData,
            [ticker]: {bodyText: quote[2], footerText: quote[3]}
        });
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