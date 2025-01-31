import { FC, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { Page } from '../../components/page';
import { signOut } from '../../redux/slices/account';
import { useAppDispatch, useAppSelector } from '../../redux/store';

interface IProps {

}

export const SignOutPage: FC<IProps> = ({

                                        }) => {
    const isAuthorized = useAppSelector((state) => state.account.isAuthorized);

    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (isAuthorized) return;

        navigate('/', { replace: true });
    }, [navigate, isAuthorized]);

    return (
        <Page title='Ви бажаєте вийти з системи?'>
            <button className='btn-mui' onClick={() => dispatch(signOut())}>Так, вийти!</button>
        </Page>
    );
};