import React from 'react';
import { useQuery } from 'react-query';
// eslint-disable-next-line import/no-cycle
import { GetRecipe, GetRecipeEquipment } from '../api';

type Props = {
  id: string;
};

export const RecipeEquipment = ({ id }: Props) => {
  const { refetch, data } = useQuery(
    ['get-recipes-equipment', id],
    () => GetRecipeEquipment(id),
    {
      enabled: true,
    }
  );

  return (
    <div>
      {data?.data && (
        <img
          alt=""
          src={`https://api.spoonacular.com/recipes/${id}/equipmentWidget.png`}
          width={450}
        />
      )}
    </div>
  );
};
