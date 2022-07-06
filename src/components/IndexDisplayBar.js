import {React, useState, useEffect } from "react";
import { StyledRotateDiv, StyledDisplayBar, StyledButton, StyledDisplayCard } from "./StyledComponents";
import DisplayCard from "./DisplayCard";
import { getIndexData } from "../getIndexData";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { db, auth } from "../firebase";
import uniqid from 'uniqid';
import IndexDisplayCard from "./IndexDisplayCard";

const IndexDisplayBar = () => {

    const [indexResults, setIndexResults] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const loadIndexData = async () => {
        setIsLoading(true);
        const firebaseIndexTickers = await (await getDoc(doc(db, "tickers", "indices"))).data().tickers;

        const tempData = firebaseIndexTickers.map( async (indexTicker) => {
            const results =  await getIndexData(indexTicker.ticker);
            return {key: uniqid(), name: indexTicker.name, ticker: results[1], bodyText: results[2], footerText: results[3], isPositive: results[4]}
            
        });
        const resolvedData = await Promise.all(tempData);
        setIndexResults(resolvedData);
        setIsLoading(false);
      
    }
            
    
    useEffect(() => {
       
        loadIndexData(); 

    },[]);

    return (
        <div>
            <h4>Market Watch</h4>
        <StyledDisplayBar>
            {isLoading && <div>Loading...</div>}
            {indexResults.map((indexResult) => {
                
                return(
                    <IndexDisplayCard
                        key={indexResult.key}
                        headerText={`${indexResult.name} (${indexResult.ticker})`}
                        bodyText={indexResult.bodyText}
                        footerText={indexResult.footerText}
                        isPositive={indexResult.isPositive}    
                    />
                );
            })}

        </StyledDisplayBar>
        </div>
    );
}

export default IndexDisplayBar;