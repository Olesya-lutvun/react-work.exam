import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';

import {IRecipeModel} from '../../models/recipe';
import {dummyApiServiceInstance} from '../../services/dummy-api-service';

type RecipeDetailsSliceType = {
    data: IRecipeModel | undefined;
    loading: boolean;
    error: string | undefined;
};

export const getRecipeDetails = createAsyncThunk<any, number>(
    'getRecipeDetails',
    async (id, thunkAPI) => {
        const recipeDetails = await dummyApiServiceInstance.getRecipeDetail(id);
        return thunkAPI.fulfillWithValue(recipeDetails)
    }
);

export const recipeDetailsSlice = createSlice({
    name: 'recipeDetails',
    initialState: {
        data: undefined,
        loading: false,
        error: undefined,
    } as RecipeDetailsSliceType,
    reducers: {
        reset: (state) => {
            state.data = undefined;
            state.loading = false;
            state.error = undefined;
        },
    },
    extraReducers: builder => {
        return builder
            .addCase(getRecipeDetails.pending, (state) => {
                state.loading = true;
            })
            .addCase(getRecipeDetails.fulfilled, (state, action: PayloadAction<IRecipeModel>) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(getRecipeDetails.rejected, (state, action) => {
                state.loading = false;
                state.data = undefined;
                state.error = action.error.message;
            });
    },
});

export const {reset} = recipeDetailsSlice.actions;