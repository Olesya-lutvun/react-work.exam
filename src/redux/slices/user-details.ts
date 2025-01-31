import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';

import {IUserModel} from '../../models/user';
import {dummyApiServiceInstance} from '../../services/dummy-api-service';
import {IRecipeModel} from '../../models/recipe';

type UserDetailsSliceType = {
    data: IUserModel | undefined;
    loading: boolean;
    error: string | undefined;
    allRecipes: IRecipeModel[];
};

export const getUserDetails = createAsyncThunk<any, number>(
    'getUserDetails',
    async (id, thunkAPI) => {
        const userDetails = await dummyApiServiceInstance.getUserDetail(id);
        return thunkAPI.fulfillWithValue(userDetails)
    }
);

// Crutch - there is no endpoint to receive recipes for axact user,
// So let's load all
export const getAllRecipes = createAsyncThunk<any, undefined>(
    'getAllRecepies',
    async (_, thunkAPI) => {
        const allRecipes = await dummyApiServiceInstance.getAllRecipes();
        return thunkAPI.fulfillWithValue(allRecipes)
    }
);

export const userDetailsSlice = createSlice({
    name: 'userDetails',
    initialState: {
        data: undefined,
        loading: false,
        error: undefined,
        allRecipes: [],
    } as UserDetailsSliceType,
    reducers: {
        reset: (state) => {
            state.data = undefined;
            state.loading = false;
            state.error = undefined;
        },
    },
    extraReducers: builder => {
        return builder
            .addCase(getUserDetails.pending, (state) => {
                state.loading = true;
            })
            .addCase(getUserDetails.fulfilled, (state, action: PayloadAction<IUserModel>) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(getUserDetails.rejected, (state, action) => {
                state.loading = false;
                state.data = undefined;
                state.error = action.error.message;
            })
            .addCase(getAllRecipes.fulfilled, (state, action: PayloadAction<IRecipeModel[]>) => {
                state.loading = false;
                state.allRecipes = action.payload;
            });
    },
});

export const { reset } = userDetailsSlice.actions;