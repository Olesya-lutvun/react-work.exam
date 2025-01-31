import { FC } from 'react';
import { Outlet } from 'react-router-dom';

import './index.css';

import { Navigation } from './navigation';

interface IProps {

}

export const Layout: FC<IProps> = ({
}) => {
    return (
        <div className='layout'>
            <header>
                <Navigation />
            </header>

            <main>
                <Outlet />
            </main>

            <footer>
                <p>© {new Date().getFullYear()} Усі права захищені</p>
            </footer>
        </div>
    );
};