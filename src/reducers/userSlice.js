import { createSlice } from '@reduxjs/toolkit'
import { logout, register, login, loginWithGoogle } from './UserExtraReducer';
import Swal from 'sweetalert2';

const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    timer: 2000,
    timerProgressBar: true,
    showConfirmButton: false,
});

const initialState = {
    user: null,
    loading: false,
    error: "",
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        getCurrentUser: (state, { payload }) => {
            state.loading = false
            state.user = payload
        },
        loadingUser: (state, { payload }) => {
            state.loading = payload
        }
    },
    extraReducers: {

        [logout.pending]: state => {
            state.loading = true
        },
        [logout.fulfilled]: state => {
            state.loading = false
            state.user = null
        },
        [logout.rejected]: state => {
            state.loading = false
            console.log("error")
        },

        [register.pending]: state => {
            state.loading = true
        },
        [register.fulfilled]: state => {
            state.loading = false
            Toast.fire({
                title: "Registrado correctamente",
                icon: "success",
            })
        },
        [register.rejected]: (state, { payload }) => {
            state.loading = false
            if (payload.code === "auth/email-already-in-use") {
                state.error = "Este correo ya está registrado"
            }
        },
        [login.pending]: state => {
            state.loading = true
        },
        [login.fulfilled]: state => {
            state.loading = false
            Toast.fire({
                title: "Ingreso correcto",
                icon: "success",
            })
        },
        [login.rejected]: (state, { payload }) => {
            state.loading = false
            if (payload.code === "auth/wrong-password") {
                state.error = "Contrseña incorrecta"
            }
            if (payload.code === "auth/user-not-found") {
                state.error = "Correo incorrecto"
            }
        },
        [loginWithGoogle.pending]: state => {
            state.loading = true
        },
        [loginWithGoogle.fulfilled]: state => {
            state.loading = false
        },
        [loginWithGoogle.rejected]: state => {
            state.loading = false
            console.log("error")
        },
    }
});

export const { getCurrentUser, loadingUser } = userSlice.actions

export default userSlice.reducer