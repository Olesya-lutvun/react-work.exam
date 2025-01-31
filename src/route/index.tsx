import {createBrowserRouter} from 'react-router-dom';

import {Layout} from '../components/layout';
import {HomePage} from '../pages/home';
import {NotFoundPage} from '../pages/not-found';
import {RecipeDetailsPage} from '../pages/recipe-details';
import {RecipesPage} from '../pages/recipes';
import {SignInPage} from '../pages/sign-in';
import {SignOutPage} from '../pages/sign-out';
import {UserDetailsPage} from '../pages/user-details';
import {UsersPage} from '../pages/users';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout/>,
        children: [
            {
                index: true,
                element: <HomePage/>,
            },
            {
                path: 'sign-in',
                element: <SignInPage/>,
            },
            {
                path: 'sign-out',
                element: <SignOutPage/>,
            },
            {
                path: 'users',
                element: <UsersPage/>,
            },
            {
                path: 'users/:id',
                element: <UserDetailsPage/>,
            },
            {
                path: 'recipes',
                element: <RecipesPage/>,
            },
            {
                path: 'recipes/:id',
                element: <RecipeDetailsPage/>,
            },
        ],
    },
    {
        path: '*',
        element: <NotFoundPage/>,
    },
]);