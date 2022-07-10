import React, { useEffect, useState } from "react";
import DisplayCard from "./DisplayCard";
import { StyledButton } from "./StyledComponents";
import { collection, doc, getDoc, getDocs, updateDoc } from "firebase/firestore";
import { db, auth } from "../firebase";
import { getEquityData } from "../getEquityData";
import { onAuthStateChanged } from "firebase/auth";
import { getIndexData } from "../getIndexData";
import { getStockChartData } from "../getStockChartData";
import styled from "styled-components";
import { DragDropTouch } from "../polyfills/DragDropTouch";



// This tutorial was helpful to create the drag and drop favorites functionality:
// https://dev.to/colinmcd01/drag-drop-re-ordering-using-html-and-react-974

// To enable mobile drag and drop, I used a polyfill found here:
// https://github.com/Bernardo-Castilho/dragdroptouch
// Added the .js file to my app and imported "DragDropTouch" to this component

const FavoritesGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  place-items: center;
  
  @media only screen and (max-width:1000px) {
    grid-template-columns: 1fr 1fr;
  }

  @media only screen and (max-width:650px) {
    grid-template-columns: 1fr;
  }
  

`;

const FavoritesPage = ({handleClick, handleFavoritesPrimary, handleFavoritesDisabled}) => {

    const [userEmail, setUserEmail] = useState('');
    const [myFavorites, setMyFavorites] = useState([]);
    const [favoriteData, setFavoriteData] = useState({"test":{bodyText: "test"}})
    const [coolDown, setCoolDown] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [dragId, setDragId] = useState('');

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
                setUserEmail(user.email);
                
            } else {
                setIsLoggedIn(false);
                setUserEmail('');
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

    async function setFirestoreFavorites(userEmail, favoritesArray) {
      try {
        
        await updateDoc(doc(db, "users", userEmail), {favorites: favoritesArray});

      } catch(error) {
        console.log("Error: ", error)
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
                        borderColor: 'rgba(50, 220, 150, 1)',
                        backgroundColor: 'rgba(50, 220, 150, 1)',
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

    const handleDrag = (ev) => {
      setDragId(ev.currentTarget.id);
      // console.log(ev.currentTarget.id);
    }

    const handleDrop = (ev) => {
      const dragFavorite = myFavorites.find((favorite) => favorite.id === dragId);
      // console.log(dragFavorite);
      const dropFavorite = myFavorites.find((favorite) => favorite.id === ev.currentTarget.id);
      // console.log(dropFavorite);
      const dragFavoriteOrder = dragFavorite.date;
      const dropFavoriteOrder = dropFavorite.date;
      
      // if (!dropFavorite) { 
      //   console.log("drop didn't work");
      //   return;
      // }

      //const dragFavoriteIndex = myFavorites.indexOf(dragFavorite);
      //const dropFavoriteIndex = myFavorites.indexOf(dropFavorite);
      //console.log(dragFavoriteIndex);
      //console.log(dropFavoriteIndex);
      //[myFavorites[dragFavoriteIndex], myFavorites[dropFavoriteIndex]] = [myFavorites[dropFavoriteIndex], myFavorites[dragFavoriteIndex]]; 
      

      const reorderedFavorites = myFavorites.map((favorite) => {
        if (favorite.id === dragId) {
          favorite.date = dropFavoriteOrder;
        }
        if (favorite.id === ev.currentTarget.id) {
          favorite.date = dragFavoriteOrder;
        }
        return favorite;
      });

      setMyFavorites(reorderedFavorites);
      setFirestoreFavorites(userEmail, reorderedFavorites);
    } 

    return(
        
        <div>
            {isLoggedIn &&
            <div>
            <h3>Favorites</h3>
            
            <div><i>(Click/touch and drag to rearrange favorites.)</i></div>
            
            <FavoritesGrid>
              {myFavorites
                .sort((a,b) => a.date - b.date)
                .map((favorite) => {
                
                  return(
                      <DisplayCard
                      id={favorite.id}
                      isDraggable={true}
                      handleDrag={handleDrag}
                      handleDrop={handleDrop}
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
            </FavoritesGrid>
            
            
            
            </div> } 
        </div>
    )
}

export default FavoritesPage;