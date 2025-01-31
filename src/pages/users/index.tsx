import { FC, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import { ListView } from '../../components/list-view';
import { Page } from '../../components/page';
import { UserItem } from '../../components/user/user-item';
import { getUserList } from '../../redux/slices/user-list';
import { useAppDispatch, useAppSelector } from '../../redux/store';

interface IProps {

}

export const UsersPage: FC<IProps> = ({

                                      }) => {
    const navigate = useNavigate();
    const {
        data,
        actualLimit,
        total,
        error,
        loading,
    } = useAppSelector((state) => state.userList);
    const dispatch = useAppDispatch();

    const loadCallback = useCallback((searchTerm: string, limit: number, skip: number) => {
        dispatch(getUserList({ searchTerm, limit, skip }))
    }, [dispatch]);

    return (
        <Page
            title='Список користувачів'
        >
            <ListView
                isLoading={loading}
                error={error}
                loadCallback={loadCallback}
                actualLimit={actualLimit}
                total={total}
            >
                {
                    data.map(item => (
                        <UserItem
                            key={item.id}
                            item={item}
                            onClick={() => navigate(`/users/${item.id}`)}
                        />
                    ))
                }
            </ListView>
        </Page>
    );
};