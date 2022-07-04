import { React, useEffect, useState } from "react";
import { StyledButton, StyledInput } from "./StyledComponents";
import { auth, db } from "../firebase";
import { 
    AuthErrorCodes,
    connectAuthEmulator,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    signOut,
    updateProfile
} from "firebase/auth";
import { updateDoc, doc, getDoc, arrayUnion, setDoc } from "firebase/firestore";


// connectAuthEmulator(auth, "http://localhost:9099");


const LoginPage = () => {
    
    const monitorAuthState = async () => {
        onAuthStateChanged(auth, user => {
            if (user) {
                setUserSignedIn(true);
                setDisplayName(user.displayName);
            } else {
                setUserSignedIn(false);
            }
        });
    }

    const loginEmailPassword = async (event) => {
        event.preventDefault();
        const loginEmail = userEmail;
        const loginPassword = userPassword;
        
        try {
            const userCredential = await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
            setUserName('');
            setUserEmail('');
            setUserPassword('');
            setErrorMessage('');
            setDisplayName(userCredential.user.displayName);

        } catch(error) {
            console.log(error);
            showLoginError(error);
        }
    }

    const createAccount = async (event) => {
        event.preventDefault();
        const loginEmail = userEmail;
        const loginPassword = userPassword;

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, loginEmail, loginPassword);
            // await updateProfile(auth.currentUser, {displayName: userName});
            // Setting display name to userEmail for now...
            await updateProfile(auth.currentUser, {displayName: userEmail});
            

            // add new user data to the firestore user list
            const newUser = {
                            email: userEmail,
                            favorites: []
                        }
            console.log(newUser);

            await setDoc(doc(db, "users", userEmail), newUser);

            setUserName('');
            setUserEmail('');
            setUserPassword('');
            setErrorMessage('');
            setDisplayName(userCredential.user.displayName);
        } catch(error) {
            console.log(error);
            showLoginError(error);
        }
    }

    const logout = async () => {
        await signOut(auth);
    }

    const showLoginError = (error) => {
        if (error.code === AuthErrorCodes.INVALID_PASSWORD) {
            setErrorMessage("Wrong password. Try again.");
        } else if (error.code === AuthErrorCodes.INVALID_EMAIL) {
            setErrorMessage("Email not recognized. Try again.");
        } else if (error.code === AuthErrorCodes.EMAIL_EXISTS) {
            setErrorMessage("Email already in use. Try again.");
        } else if (error.code === AuthErrorCodes.USER_DELETED) {
            setErrorMessage("User not found. Try again.");
        } else {
            setErrorMessage("Something went wrong: " + error.message);
        }
    }

    const handleChange = (event) => {
        if (event.target.id === "emailInput") {
            setUserEmail(event.target.value);
        } else if (event.target.id === "passwordInput") {
            setUserPassword(event.target.value);
        } else {
            setUserName(event.target.value);
        }
    }


    const [userName, setUserName] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [userPassword, setUserPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [userSignedIn, setUserSignedIn] = useState(false);
    const [displayName, setDisplayName] = useState('');

    useEffect(() => {
        monitorAuthState()
    },[]);

    
    return (
        
        <div>
            {!userSignedIn &&
            <form className="loginForm">
                
                <label><h3>Sign in to view your favorites!!!</h3>
                    {/* <StyledInput
                        id="userNameInput"
                        placeholder="Enter your display name (optional)"
                        value={userName}
                        onChange={handleChange} /> */}
                    
                    <StyledInput
                        id="emailInput"
                        placeholder="Enter your email"
                        value={userEmail}
                        onChange={handleChange} />

                    <StyledInput
                        id="passwordInput"
                        placeholder="Enter your password"
                        value={userPassword}
                        onChange={handleChange} />
                </label>

                <div><i>{errorMessage}</i></div>
                <div>
                    <StyledButton
                        primary={true}
                        onClick={loginEmailPassword}
                        disabled={false} >
                            Sign In
                    </StyledButton>
                        - or -
                    <StyledButton
                        primary={false}
                        onClick={createAccount}
                        disabled={false}>
                            Sign Up
                    </StyledButton>
                </div>
            </form>}

            {userSignedIn &&
            <div>
            {/* <div>Welcome, {displayName}</div> */}
            <StyledButton
                        primary={false}
                        onClick={logout}
                        disabled={false}>
                            Log out
                    </StyledButton>
            </div>
            }
        
        
        </div>

    );
}

export default LoginPage;