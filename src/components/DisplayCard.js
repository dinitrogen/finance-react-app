import React from "react";
import { StyledRotateDiv, StyledDisplayCard, StyledButton } from "./StyledComponents";

const DisplayCard = ({headerText, bodyText, footerText, loading, buttonText, handleClick, handleDisabled, handlePrimary, showButton}) => {
    
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
            
            {showButton &&
            <StyledButton 
                primary={handlePrimary}
                disabled={handleDisabled}
                onClick={handleClick}>
                    {buttonText}
            </StyledButton>}
            
        </StyledDisplayCard>
    );
}

export default DisplayCard;