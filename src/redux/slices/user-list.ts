import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';

import {IUserModel, IUsersFeedModel} from '../../models/user';
import {dummyApiServiceInstance} from '../../services/dummy-api-service';

type UserListSliceType = {
    actualLimit: number;
    skip: number;
    total: number;
    data: IUserModel[];
    loading: boolean;
    error: string | undefined;
};

export const getUserList = createAsyncThunk<any, { searchTerm: string, limit: number; skip: number; }>(
    'getUserList',
    async ({searchTerm, limit, skip}, thunkAPI) => {
        const userList = await dummyApiServiceInstance.getUserList(searchTerm, limit, skip);
        return thunkAPI.fulfillWithValue(userList)
    }
);

export const userListSlice = createSlice({
    name: 'userList',
    initialState: {
        actualLimit: 0,
        skip: 0,
        total: 0,
        data: [],
        loading: false,
        error: undefined,
    } as UserListSliceType,
    reducers: {},
    extraReducers: builder => {
        return builder
            .addCase(getUserList.pending, (state) => {
                state.loading = true;
            })
            .addCase(getUserList.fulfilled, (state, action: PayloadAction<IUsersFeedModel>) => {
                state.loading = false;
                state.actualLimit = action.payload.limit;
                state.skip = action.payload.skip;
                state.total = action.payload.total;
                state.data = action.payload.users;
            })
            .addCase(getUserList.rejected, (state, action) => {
                state.loading = false;
                state.data = [];
                state.error = action.error.message;
            });
    },
});

export const { } = userListSlice.actions;