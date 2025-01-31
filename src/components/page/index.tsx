import classNames from 'classnames';
import {FC, PropsWithChildren} from 'react';

import './index.css';

interface IProps {
    title: string;
    className?: string;
}

export const Page: FC<PropsWithChildren<IProps>> = ({
 title, className, children,}) => {
    return (
        <div className={classNames('page', className)}>
            <h1 className='page__title'>{title}</h1>
            <div className='page__content'>
                {children}
            </div>
        </div>
    );
};