import React from "react";
import StockChart from "./StockChart";
import { StyledRotateDiv, StyledDisplayCard, StyledButton } from "./StyledComponents";

const DisplayCard = ({headerText, bodyText, footerText, loading, buttonText, handleClick, handleDisabled, handlePrimary, showButton, chartData}) => {
    
    if (loading) {
        return (
            <StyledRotateDiv>Loading</StyledRotateDiv>
        )
    } 

    return (
        <StyledDisplayCard>
            {chartData &&
            <StockChart
                chartData={chartData}
            />
            }
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