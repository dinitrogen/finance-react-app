import React from 'react';
import { Link } from 'react-router-dom';
import "./LandingPage.css";

const LandingPage = () => {
    return (
        <div>
            Finance App!!!!
            
            <Link className="navBarLink" to="/finance-react-app">Home</Link>
            
            <Link className="navBarLink" to="/history">History</Link>
        </div>
    )
}

export default LandingPage;