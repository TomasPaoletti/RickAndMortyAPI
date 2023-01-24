import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const URL = 'https://rickandmortyapi.com/api'
const characters = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

export const getCharacters = createAsyncThunk("getCharacters",
    async (object, { rejectWithValue }) => {
        try {
            const { data } = await axios.get(`${URL}/character/${characters}`)
            let userObject = data.map((item) => {
                return {
                    "id": item.id,
                    "name": item.name,
                    "montoInicial": 0,
                    "prestamoPedido": 0
                }
            });
            return userObject;
        } catch (error) {
            rejectWithValue(error.response.data)
        }
    })