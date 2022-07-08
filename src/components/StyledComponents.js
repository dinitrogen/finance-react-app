import styled from "styled-components";
import { keyframes } from "styled-components";

const rotate = keyframes`
    from {
        transform: rotate(0deg);
    }

    to {
        transform: rotate(360deg);
    }
`;

const StyledDisplayBar = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    font-size: 0.7em;
    border: solid rgba(50, 220, 150, 1) 3px;
    border-radius: 10px;
    max-width: 50em;
    
`;

const StyledAppDiv = styled.div`
    
`;


const StyledRotateDiv = styled.div`
    display: inline-block;
    animation: ${rotate} 0.5s linear infinite;
    padding: 2rem 1rem;
    font-size: 1.2rem;
`;




const StyledButton = styled.button`
    background: ${props => props.primary ? 'rgba(50, 220, 150, 1)' : "white"};
    color: ${props => props.primary ? "white" : 'rgba(50, 220, 150, 1)'};
    font-size: 1em;
    margin: 1em;
    padding: 0.25em 1em;
    border: 2px solid rgba(50, 220, 150, 1);
    border-radius: 3px;
    cursor: pointer;
`;

const StyledInput = styled.input`
    color: rgba(50, 220, 150, 1);
    font-size: 1em;
    border: 2px solid rgba(50, 220, 150, 1);
    border-radius: 3px;
    margin: 1em;
    padding: 1em;
`;

export {StyledAppDiv, StyledButton, StyledInput, StyledRotateDiv, StyledDisplayBar};