import { FC, useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';

import { Page } from '../../components/page';
import { UserDetails } from '../../components/user/user-details';
import { getAllRecipes, getUserDetails, reset } from '../../redux/slices/user-details';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { Loader } from '../../components/loader';


interface IProps {

}

export const UserDetailsPage: FC<IProps> = ({

                                            }) => {
    const { id } = useParams();

    const {
        data,
        //error,
        loading,
        allRecipes,
    } = useAppSelector((state) => state.userDetails);
    const recipesLoaded = allRecipes.length > 0;
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (!id) return;

        dispatch(getUserDetails(+id));

        return () => {
            dispatch(reset());
        };
    }, [dispatch, id]);

    useEffect(() => {
        if (recipesLoaded) return;

        dispatch(getAllRecipes());
    }, [dispatch, recipesLoaded]);

    const recepiesOfUser = useMemo(() => {
        if (!data) {
            return [];
        }

        return allRecipes.filter(x => x.userId === data.id);
    }, [data, allRecipes]);

    return (
        <Page
            title={`Користувач # ${id}`}
        >
            {
                data &&
                <UserDetails
                    item={data}
                    recipes={recepiesOfUser}
                />
            }
            <Loader isLoading={loading} />
        </Page>
    );
};