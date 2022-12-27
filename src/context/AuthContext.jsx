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
import API from '../API';


const authContext = createContext();
export const useAuth = () => {
    const context = useContext(authContext)
    return context
};

export default function AuthContext({ children }) {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [jsonState, setjsonState] = useState();
    const [list, setList] = useState();
    const [modalTransfer, setModalTransfer] = useState(false);
    const [modalDeposit, setModalDeposit] = useState(false);
    const [modalWithdraw, setModalWithdraw] = useState(false)
    const [modalId, setModalId] = useState();

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
        const characters = await API.getCharacters()
        let userObject = characters.results.map((item) => {
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

    const handleShowModalTransfer = (id) => {
        setModalTransfer(true)
        setModalId(id)
    }
    const handleCloseModalTransfer = () => setModalTransfer(false)

    const handleShowModalDeposit = (id) => {
        setModalDeposit(true)
        setModalId(id)
    }
    const handleCloseModalDeposit = () => setModalDeposit(false)

    const handleShowModalWithdraw = (id) => {
        setModalWithdraw(true)
        setModalId(id)
    }
    const handleCloseModalWithdraw = () => setModalWithdraw(false)

    const getCredit = (price, idUser) => {
        list.map((item) => {
            if (item.id == idUser) {
                item.montoInicial = item.montoInicial + parseInt(price)
            }
            return list
        })
        const userJSON = JSON.stringify(list)
        setjsonState(userJSON)
    }

    const getTransfer = (price, idTransfer, idUser) => {
        let rest = true
        list.map((item) => {
            if (item.id == idUser) {
                item.montoInicial > parseInt(price) ? item.montoInicial = item.montoInicial - parseInt(price) : rest = false
            }
            return list
        })
        if (rest == true) {
            list.map((item) => {
                if (item.id == idTransfer) {
                    item.montoInicial = item.montoInicial + parseInt(price)
                }
            })
        } else {
            console.log("error")
        }
        const userJSON = JSON.stringify(list)
        setjsonState(userJSON)
    }

    const getWithdraw = (price, idUser) => {
        list.map((item) => {
            if (item.id == idUser) {
                item.montoInicial > parseInt(price) ? item.montoInicial = item.montoInicial - parseInt(price) : console.log("error")
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
                getCredit,
                getTransfer,
                getWithdraw,
                handleShowModalTransfer,
                handleCloseModalTransfer,
                handleShowModalDeposit,
                handleShowModalWithdraw,
                handleCloseModalDeposit,
                handleCloseModalWithdraw,
                modalTransfer,
                modalDeposit,
                modalWithdraw,
                modalId
            }}
        >
            {children}
        </authContext.Provider>
    )
}

export { authContext }
