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
import { useNavigate } from 'react-router-dom';


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
    const [list, setList] = useState();
    const [userDetail, setUserDetail] = useState();
    const [modalTransfer, setModalTransfer] = useState(false);
    const [modalDeposit, setModalDeposit] = useState(false);

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
                "montoInicial": 0,
                "prestamoPedido": 0
            }
        })
        const userJSON = JSON.stringify(userObject)
        setjsonState(userJSON)
    };

    const userList = () => {
        const response = JSON.parse(jsonState)
        setList(response)
    };

    const getUserDetail = (id) => {
        setUserDetail(list.find(x => x.id == id))
    };

    const handleShowModalTransfer = () => setModalTransfer(true)
    const handleCloseModalTransfer = () => setModalTransfer(false)
    const handleShowModalDeposit = () => setModalDeposit(true)
    const handleCloseModalDeposit = () => setModalDeposit(false)

    const getMontoInicial = async (price, id) => {
        list.map((item) => {
            if (item.id == id) {
                item.montoInicial = parseInt(price)
            }
            return list
        })
        const userJSON = JSON.stringify(list)
        setjsonState(userJSON)
    }

    return (
        <authContext.Provider
            value={{
                register,
                loginWithGoogle,
                logout,
                login,
                loading,
                user,
                jsonState,
                userList,
                list,
                getMontoInicial,
                getUserDetail,
                userDetail,
                handleShowModalTransfer,
                handleCloseModalTransfer,
                handleShowModalDeposit,
                handleCloseModalDeposit,
                modalTransfer,
                modalDeposit
            }}
        >
            {children}
        </authContext.Provider>
    )
}

export { authContext }
