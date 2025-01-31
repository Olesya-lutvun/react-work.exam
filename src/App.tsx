import { FC, useEffect } from 'react';
import { RouterProvider } from 'react-router-dom';

import { initialize } from './redux/slices/account';
import { useAppDispatch } from './redux/store';
import { router } from './route';

export const App: FC = () => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(initialize());
    }, [dispatch]);

    return (
        <RouterProvider router={router} />
    );
};
