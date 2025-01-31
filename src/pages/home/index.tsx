import {FC} from 'react';

import {Page} from '../../components/page';
import {useAppSelector} from '../../redux/store';

interface IProps {

}

export const HomePage: FC<IProps> = ({}) => {
    const isAuthorized = useAppSelector((state) => state.account.isAuthorized);

    return (
        <Page title='Домашня сторінка'>
            {
                !isAuthorized &&
                <span>Протрібно авторизуватися</span>
            }
        </Page>
    );
};