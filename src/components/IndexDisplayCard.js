import { React } from 'react';
import styled from 'styled-components';

const StyledDisplayCard = styled.div`
    display:flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
    padding: 1em;
    color: rgba(50, 50, 50, 1);
    font-weight: bold;
    border-right: 3px solid rgba(50, 50, 50, 1);
    
`;

const StyledBodyText = styled.div`
    color: ${props => props.positive ? "green" : "red"};
`;

const IndexDisplayCard = ({headerText, bodyText, footerText, isPositive}) => {
    return (
        <StyledDisplayCard>
            <div>{headerText}</div>
            <StyledBodyText positive={isPositive}>{bodyText}</StyledBodyText>
            <div>{footerText}</div>
        </StyledDisplayCard>
    )
}

export default IndexDisplayCard;