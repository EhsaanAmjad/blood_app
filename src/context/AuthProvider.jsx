import { createContext, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import { showToast } from "@/utils";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, _isLoggedIn] = useState(false);
    const [userInfo, _userInfo] = useState({})
    const router = useRouter();

    const checkAuthState = () => {
        const storedUserInfo = localStorage.getItem('userInfo');
        if (storedUserInfo) {
            const { id } = JSON.parse(storedUserInfo);
            _isLoggedIn(Boolean(id));
            _userInfo(JSON.parse(storedUserInfo))
        } else {
            _isLoggedIn(false);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('userInfo');
        _isLoggedIn(false);
        _userInfo({})
        router.push('/');
        showToast("Logout successful!", { backgroundColor: "green" });
    };

    useEffect(() => {
        checkAuthState();
    }, []);

    return (
        <AuthContext.Provider value={{ isLoggedIn, _isLoggedIn, handleLogout, userInfo, _userInfo }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};
