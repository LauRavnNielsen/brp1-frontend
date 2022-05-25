import React from 'react';
import { useQuery } from 'react-query';
// eslint-disable-next-line import/no-cycle
import { GetRecipe, GetRecipeNutrition } from '../api';

type Props = {
  id: string;
};

export const RecipeNutrition = ({ id }: Props) => {
  const { refetch, data } = useQuery(
    ['get-recipes-nutrition', id],
    () => GetRecipeNutrition(id),
    {
      enabled: true,
    }
  );
  return (
    <div>
      {data?.data && (
        <img
          alt=""
          src={`https://api.spoonacular.com/recipes/${id}/nutritionWidget.png`}
          width={600}
        />
      )}
    </div>
  );
};
