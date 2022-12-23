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

    const url = 'https://rickandmortyapi.com/api/character';

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [jsonState, setjsonState] = useState();

    useEffect(() => {
        onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);
            setLoading(false)
        })
    }, []);

    useEffect(() => {
        getUserApi()
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
        await signOut(auth);

    const getUserApi = async () => {
        const response = await fetch(url)
        const responseJSON = await response.json()
        let userObject = responseJSON.results.map((item) => {
            return {
                "id": item.id,
                "name": item.name,
                "montoInicial": 1000,
                "prestamoPedido": 2000
            }
        })
        const userJSON = JSON.stringify(userObject)
        setjsonState(userJSON)
    };

    return (
        <authContext.Provider
            value={{
                register,
                loginWithGoogle,
                logout,
                login,
                loading,
                user,
                jsonState
            }}
        >
            {children}
        </authContext.Provider>
    )
}

export { authContext }
