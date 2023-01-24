import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    deposit: false,
    loan: false,
    payLoan: false,
    transfer: false,
    withdraw: false,
    id: ""
}

export const modalSlice = createSlice({
    name: "modal",
    initialState,
    reducers: {
        handleShowModalDeposit: (state, { payload }) => {
            state.deposit = true
            state.id = payload
        },
        handleCloseModalDeposit: state => {
            state.deposit = false
        },
        handleShowModalLoan: (state, { payload }) => {
            state.loan = true
            state.id = payload
        },
        handleCloseModalLoan: state => {
            state.loan = false
        },
        handleShowModalPayLoan: (state, { payload }) => {
            state.payLoan = true
            state.id = payload
        },
        handleCloseModalPayLoan: state => {
            state.payLoan = false
        },
        handleShowModalTransfer: (state, { payload }) => {
            state.transfer = true
            state.id = payload
        },
        handleCloseModalTransfer: state => {
            state.transfer = false
        },
        handleShowModalWithdraw: (state, { payload }) => {
            state.withdraw = true
            state.id = payload
        },
        handleCloseModalWithdraw: state => {
            state.withdraw = false
        }
    }
})

export const {
    handleShowModalDeposit,
    handleCloseModalDeposit,
    handleShowModalLoan,
    handleCloseModalLoan,
    handleShowModalPayLoan,
    handleCloseModalPayLoan,
    handleShowModalTransfer,
    handleCloseModalTransfer,
    handleShowModalWithdraw,
    handleCloseModalWithdraw
} = modalSlice.actions

export default modalSlice.reducer