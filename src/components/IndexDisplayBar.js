import {React, useState, useEffect } from "react";
import { StyledRotateDiv, StyledButton, StyledDisplayCard } from "./StyledComponents";
import DisplayCard from "./DisplayCard";
import { getIndexData } from "../getIndexData";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { db, auth } from "../firebase";
import uniqid from 'uniqid';
import IndexDisplayCard from "./IndexDisplayCard";
import styled from "styled-components";


const StyledDisplayBar = styled.div`
    padding: 1em;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    font-size: 0.8rem;
    /* border: solid rgba(50, 220, 150, 1) 3px;
    border-radius: 10px; */
    border-bottom: 5px solid rgba(60, 100, 60, 1);
    box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.2);
    height:100px;
    /* background-color: rgba(200, 240, 200, 1); */
    
    @media only screen and (max-width:1000px) {
        overflow:auto;
    }
    
`;

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
            
        <StyledDisplayBar>
            
            <IndexDisplayCard
                headerText='Market'
                footerText='Watch'
            />


            {isLoading && <div>Loading...</div>}
            {indexResults.map((indexResult) => {
                
                return(
                    <IndexDisplayCard
                        key={indexResult.key}
                        headerText={`${indexResult.name}`}
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