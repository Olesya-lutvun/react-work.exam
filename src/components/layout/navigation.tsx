import { FC, useMemo, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

import './navigation.css';

import { useAppSelector } from '../../redux/store';

interface IProps {

}

export const Navigation: FC<IProps> = ({
}) => {
    const { pathname } = useLocation();
    const [setActive] = useState<string>('/');
    const {
        isAuthorized,
        data,
    } = useAppSelector((state) => state.account);
    const userLogo: string = data?.image || '';

    const items = useMemo(() => {
        const result: Array<{ path: string; img?: string; title: string; }> = [{
            path: '/',
            title: 'Домашня',
        }];

        if (isAuthorized) {
            result.push({
                path: '/users',
                title: 'Користувачі'
            });
            result.push({
                path: '/recipes',
                title: 'Рецепти'
            });
            result.push({
                path: '/sign-out',
                img: userLogo,
                title: 'Вийти'
            });
        } else {
            result.push({
                path: '/sign-in',
                title: 'Залогінитися'
            });
        }

        return result;
    }, [isAuthorized, userLogo]);

    return (
        <nav className='nav-mui'>
            <ul>
                {
                    items.map((item, index) => (
                        <li
                            className={pathname.includes(item.path) && index > 0 ? 'active' : ''}
                            key={`${item.title}-${index}`}
                        >
                            <Link
                                to={item.path}
                                onClick={() => setActive(item.path)}
                            >
                                {
                                    item.img &&
                                    <img src={item.img} alt='Logo' />
                                }
                                {item.title}
                            </Link>
                        </li>
                    ))
                }
            </ul>
        </nav>
    );
};