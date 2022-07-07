import React from 'react';
import { Link } from 'react-router-dom';
import "./LandingPage.css";
import styled from 'styled-components';
import { StyledButton } from './StyledComponents';
import { auth } from "../firebase";
import { signOut } from "firebase/auth";

const Navbar = styled.div`
    
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    font-size: 1em;
    max-width: 50em;
`;

const LandingPage = ({userName, isLoggedIn}) => {
    
    const logout = async () => {
        await signOut(auth);
    }
    
    return (
        <Navbar>
            <h1>Stock Finder</h1>
            
            <Link className="navBarLink" to="/finance-react-app">Search</Link>
            
            <Link className="navBarLink" to="/history">History</Link>

            <Link className="navBarLink" to="/favorites">Favorites</Link>

            <div>
                <div>Welcome, {userName}</div>

                {isLoggedIn &&
                            <StyledButton
                            primary={false}
                            onClick={logout}
                            disabled={false}>
                                Log out
                        </StyledButton>    
                }
            </div>

        </Navbar>
    )
}

export default LandingPage;