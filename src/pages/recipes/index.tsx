import { FC, useCallback } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { ListView } from '../../components/list-view';
import { Page } from '../../components/page';
import { RecipeItem } from '../../components/recipe/recipe-item';
import { getRecipeList } from '../../redux/slices/recipe-list';
import { useAppDispatch, useAppSelector } from '../../redux/store';

interface IProps {

}

export const RecipesPage: FC<IProps> = ({

                                        }) => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const tag = searchParams.get('tag') || '';

    const {
        data,
        actualLimit,
        total,
        error,
        loading,
    } = useAppSelector((state) => state.recipeList);
    const dispatch = useAppDispatch();

    const loadCallback = useCallback((searchTerm: string, limit: number, skip: number) => {
        dispatch(getRecipeList({ searchTerm, tag, limit, skip }))
    }, [dispatch]);

    return (
        <Page title='Рецепти'>
            <ListView
                isLoading={loading}
                error={error}
                loadCallback={loadCallback}
                isSearchAvailable={!tag} // if there is tag - search doesn't work
                actualLimit={actualLimit}
                total={total}
            >
                {
                    data.map(item => (
                        <RecipeItem
                            key={item.id}
                            item={item}
                            onClick={() => navigate(`/recipes/${item.id}`)}
                        />
                    ))
                }
            </ListView>
        </Page>
    );
};