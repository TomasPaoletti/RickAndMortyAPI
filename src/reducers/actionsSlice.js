import { createSlice } from "@reduxjs/toolkit";
import { getCharacters } from "../API/index";
import Swal from 'sweetalert2';

const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    timer: 2000,
    timerProgressBar: true,
    showConfirmButton: false,
});

const initialState = {
    list: [],
    loading: false
}

export const actionsSlice = createSlice({
    name: "actions",
    initialState,
    reducers: {
        getCredit: (state, { payload }) => {
            const indexDelete = payload.id - 1
            try {
                const user = state.list.find(x => x.id == payload.id)
                user.montoInicial = user.montoInicial + payload.price
                state.list.splice(indexDelete, 1, user)
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
        },
        getTransfer: (state, { payload }) => {
            const indexDeleteUser = payload.id - 1
            const indexDeleteTransfer = payload.idTransfer - 1
            const user = state.list.find(x => x.id === payload.id)
            const userTransfer = state.list.find(x => x.id === payload.idTransfer)
            if (user.montoInicial >= payload.price && userTransfer != undefined) {
                user.montoInicial = user.montoInicial - payload.price
                userTransfer.montoInicial = userTransfer.montoInicial + payload.price
                state.list.splice(indexDeleteUser, 1, user)
                state.list.splice(indexDeleteTransfer, 1, userTransfer)
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
        },
        getWithdraw: (state, { payload }) => {
            const indexDelete = payload.id - 1
            const user = state.list.find(x => x.id == payload.id)
            if (user.montoInicial >= payload.price) {
                user.montoInicial = user.montoInicial - payload.price
                state.list.splice(indexDelete, 1, user)
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
        },
        getLoan: (state, { payload }) => {
            const indexDelete = payload.id - 1
            try {
                const user = state.list.find(x => x.id == payload.id)
                user.prestamoPedido = user.prestamoPedido + payload.price
                user.montoInicial = user.montoInicial + payload.price
                state.list.splice(indexDelete, 1, user)
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
        },
        getPayLoan: (state, { payload }) => {
            const indexDelete = payload.id - 1
            const user = state.list.find(x => x.id == payload.id)
            if (user.montoInicial >= payload.price && user.prestamoPedido > 0) {
                user.montoInicial = user.montoInicial - payload.price
                user.prestamoPedido = user.prestamoPedido - payload.price
                state.list.splice(indexDelete, 1, user)
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
        }
    },
    extraReducers: {
        [getCharacters.pending]: state => {
            state.loading = true
        },
        [getCharacters.fulfilled]: (state, { payload }) => {
            state.list = payload
            state.loading = false
        },
        [getCharacters.rejected]: state => {
            state.loading = false
            console.log("error")
        }
    }
})

export const {
    getCredit,
    getTransfer,
    getWithdraw,
    getLoan,
    getPayLoan
} = actionsSlice.actions

export default actionsSlice.reducer
