import axios from 'axios';
// eslint-disable-next-line import/no-cycle
import { SPOON_KEY } from '../../index';

export const GetRandomRecipes = () => {
  return axios.get(`https://api.spoonacular.com/recipes/random`, {
    headers: { 'x-api-key': SPOON_KEY },
    params: { number: 10 },
  });
};

export const SearchRecipes = (query: string) => {
  return axios.get(`https://api.spoonacular.com/recipes/complexSearch`, {
    headers: { 'x-api-key': SPOON_KEY },
    params: { number: 10, query, addRecipeInformation: true },
  });
};

export const GetRecipe = (id: string) => {
  return axios.get(`https://api.spoonacular.com/recipes/${id}/information`, {
    headers: { 'x-api-key': SPOON_KEY },
    params: { includeNutrition: false },
  });
};

export const GetRecipeNutrition = (id: string) => {
  return axios.get(
    `https://api.spoonacular.com/recipes/${id}/nutritionWidget.png`,
    {
      headers: { 'x-api-key': SPOON_KEY },
    }
  );
};

export const GetRecipeEquipment = (id: string) => {
  return axios.get(
    `https://api.spoonacular.com/recipes/${id}/equipmentWidget.png`,
    {
      headers: { 'x-api-key': SPOON_KEY },
    }
  );
};

export const GetRecipeIngredients = (id: string) => {
  return axios.get(
    `https://api.spoonacular.com/recipes/${id}/ingredientWidget.png`,
    {
      headers: { 'x-api-key': SPOON_KEY },
    }
  );
};

export const SetRecipeTrending = (recipeId: string) => {
  return axios.post(`http://localhost:8080/addRecipe`, {
    recipeId,
  });
};

export const GetTrendingRecipes = (number: number) => {
  return axios.get(`http://localhost:8080/getRecipe`, {
    params: { number },
  });
};

export const DeleteRecipe = (trendingId: number) => {
  return axios.delete(`http://localhost:8080/deleteRecipe`, {
    params: { trendingID: trendingId },
  });
};
