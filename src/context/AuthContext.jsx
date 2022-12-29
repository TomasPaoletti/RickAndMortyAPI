import React, { createContext, useContext, useEffect, useState } from 'react';
import { auth } from '../db/firebase';
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    GoogleAuthProvider,
    signInWithPopup,
    signOut,
    onAuthStateChanged,
} from 'firebase/auth';
import API from '../API';
import Swal from 'sweetalert2';

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
    const [modalWithdraw, setModalWithdraw] = useState(false);
    const [modalLoan, setModalLoan] = useState(false);
    const [modalPayLoan, setModalPayLoan] = useState(false);
    const [modalId, setModalId] = useState();

    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        timer: 2000,
        timerProgressBar: true,
        showConfirmButton: false,
    });

    useEffect(() => {
        onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);
            setLoading(false)
        })
    }, []);

    useEffect(() => {
        getUserApi()
    }, []);

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
        const characters = await API.getCharacters();
        let userObject = characters.results.map((item) => {
            return {
                "id": item.id,
                "name": item.name,
                "montoInicial": 0,
                "prestamoPedido": 0
            }
        });
        const userJSON = JSON.stringify(userObject);
        setjsonState(userJSON);
    };

    const userList = () => {
        const response = JSON.parse(jsonState);
        setList(response);
    };

    const handleShowModalTransfer = (id) => {
        setModalTransfer(true)
        setModalId(id)
    };

    const handleCloseModalTransfer = () => setModalTransfer(false);

    const handleShowModalDeposit = (id) => {
        setModalDeposit(true)
        setModalId(id)
    };

    const handleCloseModalDeposit = () => setModalDeposit(false);

    const handleShowModalWithdraw = (id) => {
        setModalWithdraw(true)
        setModalId(id)
    }

    const handleCloseModalWithdraw = () => setModalWithdraw(false);

    const handleShowModalLoan = (id) => {
        setModalLoan(true)
        setModalId(id)
    };

    const handleCloseModalLoan = () => setModalLoan(false);

    const handleShowModalPayLoan = (id) => {
        setModalPayLoan(true)
        setModalId(id)
    };

    const handleCloseModalPayLoan = () => setModalPayLoan(false);

    const getCredit = (price, idUser) => {
        const indexDelete = idUser - 1
        try {
            const user = list.find(x => x.id == idUser)
            user.montoInicial = user.montoInicial + price
            list.splice(indexDelete, 1, user)
            const userJSON = JSON.stringify(list)
            setjsonState(userJSON)
            Toast.fire({
                title: "Dinero acreditado",
                icon: "success",
            })
        } catch {
            Toast.fire({
                title: "Error inesperado",
                icon: "error",
            })
        }
    };

    const getTransfer = (price, idTransfer, idUser) => {
        const indexDeleteUser = idUser - 1
        const indexDeleteTransfer = idTransfer - 1
        const user = list.find(x => x.id === idUser)
        const userTransfer = list.find(x => x.id === idTransfer)
        if (user.montoInicial >= price && userTransfer != undefined) {
            user.montoInicial = user.montoInicial - price
            userTransfer.montoInicial = userTransfer.montoInicial + price
            list.splice(indexDeleteUser, 1, user)
            list.splice(indexDeleteTransfer, 1, userTransfer)
            const userJSON = JSON.stringify(list)
            setjsonState(userJSON)
            Toast.fire({
                title: "Dinero transferido",
                icon: "success",
            })
        } else {
            Toast.fire({
                title: "Dinero insuficiente",
                icon: "error",
            })
        }
    };

    const getWithdraw = (price, idUser) => {
        const indexDelete = idUser - 1
        const user = list.find(x => x.id == idUser)
        if (user.montoInicial >= price) {
            user.montoInicial = user.montoInicial - price
            list.splice(indexDelete, 1, user)
            const userJSON = JSON.stringify(list)
            setjsonState(userJSON)
            Toast.fire({
                title: "Dinero retirado",
                icon: "success",
            })
        } else {
            Toast.fire({
                title: "Dinero insuficiente",
                icon: "error",
            })
        }
    };

    const getLoan = (price, idUser) => {
        const indexDelete = idUser - 1;
        try {
            const user = list.find(x => x.id == idUser)
            user.prestamoPedido = user.prestamoPedido + price
            user.montoInicial = user.montoInicial + price
            list.splice(indexDelete, 1, user)
            const userJSON = JSON.stringify(list)
            setjsonState(userJSON)
            Toast.fire({
                title: "Préstamo solicitado",
                icon: "success",
            })
        } catch {
            Toast.fire({
                title: "Error al solicitar el préstamo",
                icon: "error",
            })
        }
    }

    const getPayLoan = (price, idUser) => {
        const indexDelete = idUser - 1;
        const user = list.find(x => x.id == idUser)
        if (user.montoInicial >= price && user.prestamoPedido > 0) {
            user.montoInicial = user.montoInicial - price
            user.prestamoPedido = user.prestamoPedido - price
            list.splice(indexDelete, 1, user)
            const userJSON = JSON.stringify(list)
            setjsonState(userJSON)
            Toast.fire({
                title: "Cuota pagada",
                icon: "success",
            })
        } else {
            Toast.fire({
                title: "Error",
                icon: "error",
            })
        }
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
                jsonState,
                userList,
                list,
                getCredit,
                getTransfer,
                getWithdraw,
                getLoan,
                getPayLoan,
                handleShowModalTransfer,
                handleCloseModalTransfer,
                handleShowModalDeposit,
                handleShowModalWithdraw,
                handleCloseModalDeposit,
                handleCloseModalWithdraw,
                handleShowModalLoan,
                handleCloseModalLoan,
                handleShowModalPayLoan,
                handleCloseModalPayLoan,
                modalTransfer,
                modalDeposit,
                modalWithdraw,
                modalLoan,
                modalPayLoan,
                modalId
            }}
        >
            {children}
        </authContext.Provider>
    )
}

export { authContext }
