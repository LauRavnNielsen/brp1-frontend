import React from 'react';
import { useQuery } from 'react-query';
// eslint-disable-next-line import/no-cycle
import { GetRecipe, GetRecipeIngredients } from '../api';

type Props = {
  id: string;
};

export const RecipeIngredients = ({ id }: Props) => {
  const { refetch, data } = useQuery(
    ['get-recipes-ingredients', id],
    () => GetRecipeIngredients(id),
    {
      enabled: true,
    }
  );
  return (
    <div>
      {data?.data && (
        <img
          alt=""
          src={`https://api.spoonacular.com/recipes/${id}/ingredientWidget.png`}
          width={450}
        />
      )}
    </div>
  );
};
