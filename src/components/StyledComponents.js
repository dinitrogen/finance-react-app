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
    justify-content: space-evenly;
    font-size: 0.7em;
    
`;

const StyledAppDiv = styled.div`
    margin: 2em;
    opacity: var(--opacity);
    background-color: var(--color);
`;

const StyledDisplayCard = styled.div`
    margin: 1em;
    width: 15em;
    padding: 10px;
    border: solid palevioletred 3px;
    border-radius: 10px;
    background-color: white;
    color: black;
    font-weight: bold;
    
`;





const StyledRotateDiv = styled.div`
    display: inline-block;
    animation: ${rotate} 0.5s linear infinite;
    padding: 2rem 1rem;
    font-size: 1.2rem;
`;

const StyledButton = styled.button`
    background: ${props => props.primary ? "palevioletred" : "white"};
    color: ${props => props.primary ? "white" : "palevioletred"};
    font-size: 1em;
    margin: 1em;
    padding: 0.25em 1em;
    border: 2px solid palevioletred;
    border-radius: 3px;
`;

const StyledInput = styled.input`
    color: palevioletred;
    font-size: 1em;
    border: 2px solid palevioletred;
    border-radius: 3px;
    margin: 1em;
    padding: 1em;
`;

export {StyledAppDiv, StyledButton, StyledInput, StyledRotateDiv, StyledDisplayCard, StyledDisplayBar};