import React from 'react';
import { Link } from 'react-router-dom';
import "./LandingPage.css";

const LandingPage = () => {
    return (
        <div>
            <h1>Stock Finder</h1>
            
            <Link className="navBarLink" to="/finance-react-app">Search</Link>
            
            <Link className="navBarLink" to="/history">History</Link>

            <Link className="navBarLink" to="/favorites">Favorites</Link>
        </div>
    )
}

export default LandingPage;