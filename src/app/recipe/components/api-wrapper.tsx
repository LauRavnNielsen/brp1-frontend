import React from 'react';
import { useQuery } from 'react-query';
// eslint-disable-next-line import/no-cycle
import { RecipeCard } from '../../manage-recipe/components/recipe-card';
// eslint-disable-next-line import/no-cycle
import { GetRecipe } from '../../manage-recipe/api';

type ApiWrapperProps = {
  trendingId: $TSFixMe;
  id: $TSFixMe;
  refetch: $TSFixMe;
};

export const ApiWrapper = ({ id, trendingId, refetch }: ApiWrapperProps) => {
  const {
    refetch: searchQueryRefetch,
    data: recipeData,
    isLoading,
    // eslint-disable-next-line react/destructuring-assignment
  } = useQuery(['get-trending-recipe', id], () => GetRecipe(id), {
    enabled: !!id,
  });

  if (isLoading) return null;

  return (
    <RecipeCard
      cuisines={recipeData?.data.cuisines}
      diets={recipeData?.data.diets}
      id={id}
      image={recipeData?.data.image}
      title={recipeData?.data.title}
      dishTypes={recipeData?.data.dishTypes}
      trendingId={trendingId}
    />
  );
};
