import classNames from 'classnames';
import { FC } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import './user-details.css';

import { IUserModel } from '../../models/user';
import { IRecipeModel } from '../../models/recipe';
import { RecipeItem } from '../recipe/recipe-item';

interface IProps {
    item: IUserModel;
    recipes: IRecipeModel[];
}

export const UserDetails: FC<IProps> = ({
                                            item,
                                            recipes,
}) => {
    const navigate = useNavigate();

    return (
        <div
            className={classNames('user-details')}
        >
            <img className='user-details__logo' src={item.image} />
            <div className='user-details__information'>
                <span>{`${item.firstName} ${item.lastName}`}</span>
                <span><b>Username: </b>{item.username}</span>
                <span><b>Role: </b>{item.role}</span>
                <span><b>Phone: </b>{item.phone}</span>
                <span><b>Email: </b>{item.email}</span>
                <span><b>DOB: </b>{item.birthDate}</span>
                <span><b>Gender: </b>{item.gender}</span>
                <span><b>University: </b>{item.university}</span>
                <section>
                    <h2>Рецепти</h2>
                    {
                        recipes.map((item) => (
                            <RecipeItem
                                key={item.id}
                                item={item}
                                onClick={() => navigate(`/recipes/${item.id}`)}
                            />
                        ))
                    }
                </section>
            </div>
        </div>
    );
};