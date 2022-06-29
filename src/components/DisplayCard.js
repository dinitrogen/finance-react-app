import React from "react";
import { StyledRotateDiv, StyledDisplayCard } from "./StyledComponents";

const DisplayCard = ({headerText, bodyText, footerText, loading}) => {
    
    if (loading) {
        return (
            <StyledRotateDiv>Loading</StyledRotateDiv>
        )
    } 

    return (
        <StyledDisplayCard>
            <div>{headerText}</div>
            <div>{bodyText}</div>
            <div>{footerText}</div>
            
        </StyledDisplayCard>
    );
}

export default DisplayCard;