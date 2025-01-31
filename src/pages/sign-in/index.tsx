import { joiResolver } from '@hookform/resolvers/joi';
import { FC, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import './index.css';

import { Page } from '../../components/page';
import { ISignInArgs } from '../../models/requests/sign-in-request';
import { signIn } from '../../redux/slices/account';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { SignInValidator } from '../../validators/sign-in';

interface IProps {

}

export const SignInPage: FC<IProps> = ({

                                       }) => {
    const isAuthorized = useAppSelector((state) => state.account.isAuthorized);

    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ISignInArgs>({
        mode: 'all',
        resolver: joiResolver(SignInValidator),
    });

    const createHandler = (args: ISignInArgs) => {
        dispatch(signIn(args))
    };

    useEffect(() => {
        if (!isAuthorized) return;

        navigate('/', { replace: true });
    }, [navigate, isAuthorized]);

    return (
        <Page
            title='Авторизація'
            className='sign-in-page'
        >
            <form onSubmit={handleSubmit(createHandler)}>
                <div className='sign-in-page__input'>
                    <input
                        className='input-mui'
                        placeholder='Логін'
                        type='text' {...register('username')}
                    />
                    <span className='sign-in-page__input-error'>{errors.username?.message}</span>
                </div>
                <div className='sign-in-page__input'>
                    <input
                        className='input-mui'
                        placeholder='Пароль'
                        type='password'
                        {...register('password')}
                    />
                    <span className='sign-in-page__input-error'>{errors.password?.message}</span>
                </div>
                <button className='btn-mui'>Sign In</button>
            </form>
        </Page>
    );
};