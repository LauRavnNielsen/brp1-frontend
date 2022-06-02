import React, { useContext, useState } from 'react';
import { Button, Col, Row } from 'antd';
// eslint-disable-next-line import/no-cycle
import { useMutation } from 'react-query';
// eslint-disable-next-line import/no-cycle
import moment from 'moment';
// eslint-disable-next-line import/no-cycle
import { AddFoodThing } from './components/add-food-thing';
// eslint-disable-next-line import/no-cycle
import { CreateMeal } from './api';
import { UserContext } from '../context/user-context';
// eslint-disable-next-line import/no-cycle
import { TrackingView } from './view';

export const TrackingContainer = () => {
  const { username } = useContext(UserContext);
  const [breakfast, setBreakfast] = useState<
    { name: string; servings: number; unit: string }[]
  >([]);
  const [lunch, setLunch] = useState<
    { name: string; servings: number; unit: string }[]
  >([]);
  const [dinner, setDinner] = useState<
    { name: string; servings: number; unit: string }[]
  >([]);
  const [snacks, setSnacks] = useState<
    { name: string; servings: number; unit: string }[]
  >([]);

  const addFoodToMeal = (
    meal: string,
    name: string,
    servings: number,
    unit: string
  ) => {
    if (meal === 'breakfast') {
      setBreakfast((prevState) => [...prevState, { name, servings, unit }]);
    }
    if (meal === 'lunch') {
      setLunch((prevState) => [...prevState, { name, servings, unit }]);
    }
    if (meal === 'dinner') {
      setDinner((prevState) => [...prevState, { name, servings, unit }]);
    }
    if (meal === 'snacks') {
      setSnacks((prevState) => [...prevState, { name, servings, unit }]);
    }
  };

  const mutateCreateMeal = useMutation(
    (params: $TSFixMe) =>
      CreateMeal(
        params.username,
        params.foodlist,
        params.mealtype,
        params.createdat
      ),
    {
      onSuccess: (data) => {
        if (data.data) {
          // updateQuerySuccessNotification('bottom');
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
        } else {
          // updateAccountFailedNotification('bottom');
        }
      },
      onError: () => {
        // updateQueryFailedNotification('bottom');
      },
    }
  );

  const createMeal = async (mealtype: number) => {
    if (mealtype === 1) {
      await mutateCreateMeal.mutate({
        username,
        foodlist: breakfast.map((e) => `${e.name}, ${e.servings} ${e.unit}`),
        mealtype: 1,
        createdat: moment().format('yyyy-MM-DD'),
      });
    }
    if (mealtype === 2) {
      await mutateCreateMeal.mutate({
        username,
        foodlist: lunch.map((e) => `${e.name}, ${e.servings} ${e.unit}`),
        mealtype: 2,
        createdat: moment().format('yyyy-MM-DD'),
      });
    }
    if (mealtype === 3) {
      await mutateCreateMeal.mutate({
        username,
        foodlist: dinner.map((e) => `${e.name}, ${e.servings} ${e.unit}`),
        mealtype: 3,
        createdat: moment().format('yyyy-MM-DD'),
      });
    }
    if (mealtype === 4) {
      await mutateCreateMeal.mutate({
        username,
        foodlist: snacks.map((e) => `${e.name}, ${e.servings} ${e.unit}`),
        mealtype: 4,
        createdat: moment().format('yyyy-MM-DD'),
      });
    }
  };

  return (
    <TrackingView
      addFoodToMeal={addFoodToMeal}
      breakfast={breakfast}
      createMeal={createMeal}
      dinner={dinner}
      lunch={lunch}
      snacks={snacks}
    />
  );
};
