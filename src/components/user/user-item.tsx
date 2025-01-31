import classNames from 'classnames';
import { FC } from 'react';

import './user-item.css';

import { IUserModel } from '../../models/user';

interface IProps {
    item: IUserModel;
    withBorder?: boolean;
    onClick?: () => void;
}

export const UserItem: FC<IProps> = ({
                                         item,
                                         withBorder = true,
                                         onClick,
}) => {
    return (
        <div
            className={classNames('user-item', {
                'with-border': withBorder,
            })}
            onClick={onClick}
        >
            <img className='user-item__logo' src={item.image} />
            <div className='user-item__details'>
                <span>{`${item.firstName} ${item.lastName}`}</span>
                <span><b>Username: </b>{item.username}</span>
                <span><b>Role: </b>{item.role}</span>
                <span><b>Email: </b>{item.email}</span>
            </div>
        </div>
    );
};