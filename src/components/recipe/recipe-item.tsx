import classNames from 'classnames';
import { FC } from 'react';

import './recipe-item.css';

import { IRecipeModel } from '../../models/recipe';

interface IProps {
    item: IRecipeModel;
    withBorder?: boolean;
    onClick?: () => void;
}

export const RecipeItem: FC<IProps> = ({
                                           item,
                                           withBorder = true,
                                           onClick,
}) => {
    return (
        <div
            className={classNames('recipe-item', {
                'with-border': withBorder,
            })}
            onClick={onClick}
        >
            <img className='recipe-item__logo' src={item.image} />
            {/* <img className='recipe-item__logo' src={`${item.image}?height=64`} /> */}
            <div className='recipe-item__details'>
                <span>{item.name}</span>
                <span><b>Tags: </b>{item.tags.join(', ')}</span>
            </div>
        </div>
    );
};