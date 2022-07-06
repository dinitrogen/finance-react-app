import React, { useEffect, useState } from "react";
import DisplayCard from "./DisplayCard";
import { StyledButton } from "./StyledComponents";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { db, auth } from "../firebase";
import { getEquityData } from "../getEquityData";
import { onAuthStateChanged } from "firebase/auth";
import { getIndexData } from "../getIndexData";
import { getStockChartData } from "../getStockChartData";


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
        setFavoriteData({...favoriteData, [ticker]: {isLoading:true}});
        // console.log("getting quote");
        //let quote = await getEquityData(ticker);
        // let quote = await getIndexData(ticker);
        let quote = await getStockChartData(ticker); 
        if (quote[4] && !quote[5]) {
            startCoolDownTimer();
            setFavoriteData({...favoriteData, [ticker]: {isLoading:false, bodyText:"Call limit exceeded. Wait 30s and try again"}});
            return;
        }
        // console.log(quote);
        setFavoriteData( {...favoriteData,
            [ticker]: {bodyText: quote[2], footerText: quote[3],
                stockChartData: 
                {
                    labels: quote[4].slice(-30),
                    datasets: [
                      {
                        label: quote[1],
                        data: quote[5].slice(-30),
                        borderColor: 'rgb(255, 99, 132)',
                        backgroundColor: 'rgba(255, 99, 132, 0.5)',
                      },
                    ],
              
                  },
                  isFavorite: quote[6],
                  isLoading: false,
            }
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
                    loading={favoriteData[favorite.ticker] ? favoriteData[favorite.ticker].isLoading : false}
                    key={favorite.id}
                    headerText={favorite.ticker}
                    bodyText={favoriteData[favorite.ticker] ? favoriteData[favorite.ticker].bodyText : ""}
                    footerText={favoriteData[favorite.ticker] ? favoriteData[favorite.ticker].footerText : ""} 
                    isPositive={favoriteData[favorite.ticker] ? favoriteData[favorite.ticker].isFavorite : false}

                    chartData={favoriteData[favorite.ticker] ? favoriteData[favorite.ticker].stockChartData : null}

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