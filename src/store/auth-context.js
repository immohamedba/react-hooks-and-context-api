import React, { useState, useEffect } from 'react';

const AuthContext = React.createContext({
    isLoggedIn: false,
    onLogout: () => { },
    onLogIn: (email, password) => { }
});

export const AuthContextProvider = (props) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const StoredUserLoginInf = localStorage.getItem('isLogin');
        if (StoredUserLoginInf === '1') {
            setIsLoggedIn(true);
        }
    }, []);

    const loginHandler = (email, password) => {
        localStorage.setItem('isLogin', '1');
        setIsLoggedIn(true);
    };

    const logoutHandler = () => {
        localStorage.removeItem('isLogin');
        setIsLoggedIn(false);
    };

    return <AuthContext.Provider
        value={{
            isLoggedIn: isLoggedIn,
            onLogout: logoutHandler,
            onLogIn: loginHandler
        }}>{props.children}
    </AuthContext.Provider>
}

export default AuthContext;