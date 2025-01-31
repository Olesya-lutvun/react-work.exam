import {FC, useEffect} from 'react';
import {Link, useParams} from 'react-router-dom';

import {getRecipeDetails, reset} from '../../redux/slices/recipe-details';
import {useAppDispatch, useAppSelector} from '../../redux/store';
import {Loader} from '../../components/loader';
import {Page} from '../../components/page';
import {RecipeDetails} from '../../components/recipe/recipe-details';


interface IProps {

}

export const RecipeDetailsPage: FC<IProps> = ({}) => {
    const {id} = useParams();

    const {
        data,
        //error,
        loading,
    } = useAppSelector((state) => state.recipeDetails);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (!id) return;

        console.log('Get recipe details');
        dispatch(getRecipeDetails(+id));

        return () => {
            console.log('Reset');
            dispatch(reset());
        };
    }, [dispatch, id]);

    return (
        <Page title={`Рецепт: ${id}`}>
            {
                data &&
                <RecipeDetails
                    item={data}
                />
            }
            <Loader isLoading={loading}/>
        </Page>
    );
};