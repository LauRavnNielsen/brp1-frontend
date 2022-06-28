import axios from 'axios';
// eslint-disable-next-line import/no-cycle
import { SPOON_KEY } from '../../index';

export const GetIngredientSearch = (search: string) => {
  return axios.get(`https://api.spoonacular.com/food/ingredients/search`, {
    headers: { 'x-api-key': SPOON_KEY },
    params: { query: search, number: 10, metaInformation: true },
  });
};

export const GetIngredientInformation = (
  id: string,
  amount: number,
  unit: string
) => {
  return axios.get(
    `https://api.spoonacular.com/food/ingredients/${id}/information`,
    {
      headers: { 'x-api-key': SPOON_KEY },
      params: { amount, unit },
    }
  );
};

export const CreateMeal = (
  username: string,
  foodlist: string[],
  mealtype: number,
  createdat: string
) => {
  return axios.post(`http://localhost:8080/createMeal`, {
    userID: username,
    foodlist,
    mealtype,
    createdAt: createdat,
  });
};

export const GetMealHistory = (username: string, createdAt: string) => {
  return axios.get(`http://localhost:8080/getMealHistory`, {
    params: { username, createdAt },
  });
};
