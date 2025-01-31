import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';

import {IRecipeModel, IRecipesFeedModel} from '../../models/recipe';
import {dummyApiServiceInstance} from '../../services/dummy-api-service';

type RecipeListSliceType = {
    actualLimit: number;
    skip: number;
    total: number;
    data: IRecipeModel[];
    loading: boolean;
    error: string | undefined;
};

export const getRecipeList = createAsyncThunk<any, { searchTerm: string; tag: string, limit: number; skip: number; }>(
    'getRecipeList',
    async ({searchTerm, tag, limit, skip}, thunkAPI) => {
        const recipeList = await dummyApiServiceInstance.getRecipeList(searchTerm, tag, limit, skip);
        return thunkAPI.fulfillWithValue(recipeList)
    }
);

export const recipeListSlice = createSlice({
    name: 'recipeList',
    initialState: {
        actualLimit: 0,
        skip: 0,
        total: 0,
        data: [],
        loading: false,
        error: undefined,
    } as RecipeListSliceType,
    reducers: {},
    extraReducers: builder => {
        return builder
            .addCase(getRecipeList.pending, (state) => {
                state.loading = true;
            })
            .addCase(getRecipeList.fulfilled, (state, action: PayloadAction<IRecipesFeedModel>) => {
                state.loading = false;
                state.actualLimit = action.payload.limit;
                state.skip = action.payload.skip;
                state.total = action.payload.total;
                state.data = action.payload.recipes;
            })
            .addCase(getRecipeList.rejected, (state, action) => {
                state.loading = false;
                state.data = [];
                state.error = action.error.message;
            });
    },
});

export const { } = recipeListSlice.actions;