import React, { createContext, useContext, useEffect, useState } from 'react';
import { auth } from '../db/firebase';
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    GoogleAuthProvider,
    signInWithPopup,
    signOut,
    onAuthStateChanged
} from 'firebase/auth';


const authContext = createContext();
export const useAuth = () => {
    const context = useContext(authContext)
    return context
};

export default function AuthContext({ children }) {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);
            setLoading(false)
        })
    }, [])

    const register = async (email, password) =>
        await createUserWithEmailAndPassword(auth, email, password);

    const login = async (email, password) =>
        await signInWithEmailAndPassword(auth, email, password);

    const loginWithGoogle = async () => {
        const response = new GoogleAuthProvider()
        return await signInWithPopup(auth, response)
    };

    const logout = async () =>
        await signOut(auth)

    return (
        <authContext.Provider
            value={{
                register,
                loginWithGoogle,
                logout,
                login,
                loading,
                user
            }}
        >
            {children}
        </authContext.Provider>
    )
}

export { authContext }
