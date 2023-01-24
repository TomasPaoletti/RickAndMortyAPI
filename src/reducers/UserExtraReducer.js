import { createAsyncThunk } from "@reduxjs/toolkit";
import { auth } from '../db/firebase';
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    GoogleAuthProvider,
    signInWithPopup,
    signOut,
} from 'firebase/auth';

export const logout = createAsyncThunk("logout",
    async (object, { rejectWithValue }) => {
        try {
            await signOut(auth)
        } catch (error) {
            return rejectWithValue(error)
        }
    });

export const register = createAsyncThunk("register",
    async (object, { rejectWithValue }) => {
        try {
            await createUserWithEmailAndPassword(auth, object.email, object.password);
        } catch (error) {
            return rejectWithValue(error)
        }
    });

export const login = createAsyncThunk("login",
    async (object, { rejectWithValue }) => {
        try {
            await signInWithEmailAndPassword(auth, object.email, object.password);
        } catch (error) {
            return rejectWithValue(error)
        }
    })

export const loginWithGoogle = createAsyncThunk("google",
    async (object, { rejectWithValue }) => {
        try {
            const res = new GoogleAuthProvider()
            return await signInWithPopup(auth, res)
        } catch (error) {
            return rejectWithValue(error)
        }
    })