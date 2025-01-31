import {FC} from 'react';
import {Page} from '../../components/page';

interface IProps {

}

export const NotFoundPage: FC<IProps> = ({}) => {
    return (
        <Page title='Не знайдено'></Page>
    );
};