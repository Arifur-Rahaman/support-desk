import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import authService from './authService'

//Get user from localstroge
const user = JSON.parse(localStorage.getItem('user'))

const initialState = {
    user: user? user: null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}

//Register new user
export const register = createAsyncThunk('auth/register', async (user, thunkApi) => {
    try {
        return await authService.register(user)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkApi.rejectWithValue(message)
    }
})

//Login user
export const signin = createAsyncThunk('auth/signin', async (user, thunkApi) => {
    try{
        return await authService.signin(user)
    }catch(error){
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkApi.rejectWithValue(message)
    }
})

//Logout user
export const logout = createAsyncThunk('auth/logout', async ()=>{
    await authService.logout()
})

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        reset: (state) => {
            state.isLoading = false
            state.isError = false
            state.isSuccess = false
            state.message = ''
        }
            
    },
    extraReducers: (builder) => {
        builder
            .addCase(register.pending, (state) => {
                state.isLoading = true
            })
            .addCase(register.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.user = action.payload
            })
            .addCase(register.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.isSuccess = false
                state.message = action.payload
                state.user = null
            })

            
            .addCase(signin.pending, (state) => {
                state.isLoading = true
            })
            .addCase(signin.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.user = action.payload
            })
            .addCase(signin.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.isSuccess = false
                state.message = action.payload
                state.user = null
            })

            .addCase(logout.fulfilled, (state)=>{
                state.user = null
            })

            

    }
})
export const {reset} = authSlice.actions
export default authSlice.reducer