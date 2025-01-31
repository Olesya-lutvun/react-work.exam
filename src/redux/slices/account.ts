import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';

import {IAccountModel} from '../../models/account';
import {ISignInArgs} from '../../models/requests/sign-in-request';
import {dummyApiServiceInstance} from '../../services/dummy-api-service';

type AccountSliceType = {
    isAuthorized: boolean;
    data: IAccountModel | undefined;
    loading: boolean;
    error: string | undefined;
};

export const signIn = createAsyncThunk<any, ISignInArgs>(
    'signIn',
    async ({username, password}, thunkAPI) => {
        const account = await dummyApiServiceInstance.signIn(username, password);
        return thunkAPI.fulfillWithValue(account)
    }
);

const LOCAL_STORAGE_KEY = 'account-information';

export const accountSlice = createSlice({
    name: 'account',
    initialState: {
        isAuthorized: false,
        data: undefined,
        loading: false,
        error: undefined,
    } as AccountSliceType,
    reducers: {
        initialize: (state) => {
            const jsonData = localStorage.getItem(LOCAL_STORAGE_KEY);

            if (typeof jsonData === 'string') {
                state.data = JSON.parse(jsonData);
                state.isAuthorized = true;
            }
        },
        signOut: (state) => {
            state.isAuthorized = false;
            state.data = undefined;
            state.loading = false;
            state.error = undefined;

            localStorage.removeItem(LOCAL_STORAGE_KEY);
        },
    },
    extraReducers: builder => {
        return builder
            .addCase(signIn.pending, (state) => {
                state.loading = true;
            })
            .addCase(signIn.fulfilled, (state, action: PayloadAction<IAccountModel>) => {
                state.loading = false;
                state.data = action.payload;
                state.isAuthorized = true;

                localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(action.payload));
            })
            .addCase(signIn.rejected, (state, action) => {
                state.loading = false;
                state.data = undefined;
                state.error = action.error.message;
            });
    },
});

export const {initialize, signOut} = accountSlice.actions;