import React, { useContext, useEffect, useState } from 'react';
import { Button, Col, Row } from 'antd';
// eslint-disable-next-line import/no-cycle
import { useMutation, useQuery } from 'react-query';
// eslint-disable-next-line import/no-cycle
import moment from 'moment';
// eslint-disable-next-line import/no-cycle
import { AddFoodThing } from './components/add-food-thing';
// eslint-disable-next-line import/no-cycle
import { CreateMeal, GetMealHistory } from './api';
import { UserContext } from '../context/user-context';
// eslint-disable-next-line import/no-cycle
import { TrackingView } from './view';
import { GetAllUsers } from '../manage-users/api';

type TrackingViewProps = {
  mealTracker: boolean;
};

export const TrackingContainer = ({ mealTracker }: TrackingViewProps) => {
  const { username } = useContext(UserContext);
  const [breakfast, setBreakfast] = useState<
    { name: string; servings: number; unit: string; id: string }[]
  >([]);
  const [lunch, setLunch] = useState<
    { name: string; servings: number; unit: string; id: string }[]
  >([]);
  const [dinner, setDinner] = useState<
    { name: string; servings: number; unit: string; id: string }[]
  >([]);
  const [snacks, setSnacks] = useState<
    { name: string; servings: number; unit: string; id: string }[]
  >([]);
  const [date, setDate] = useState('');

  const { data: allMeals, refetch: refetchMeals } = useQuery(
    ['get-meal-history', username, date],
    () => GetMealHistory(username, moment(date).format('YYYY-MM-DD')),
    { enabled: !!date }
  );

  useEffect(() => {
    setDinner([]);
    setBreakfast([]);
    setLunch([]);
    setSnacks([]);
  }, [mealTracker]);

  useEffect(() => {
    if (allMeals) {
      allMeals?.data?.map((e: $TSFixMe) => {
        if (e.mealType === 'Breakfast') {
          const foodStrings = e?.foodListString
            .split('[')
            ?.map((d: string) => d.split(']'))?.[1]
            ?.map((f: string) => f.split(', '));

          const abc: { name: any; servings: any; unit: any; id: any }[] = [];
          // eslint-disable-next-line no-plusplus
          for (let i = 0; i < foodStrings?.[0]?.length; i++) {
            if (i % 2 === 0) {
              abc.push({
                name: foodStrings?.[0]?.[i],
                servings: foodStrings?.[0]?.[i + 1]?.split(' ')?.[0],
                unit: foodStrings?.[0]?.[i + 1]?.split(' ')?.[1],
                id: foodStrings?.[0]?.[i + 1]?.split(' ')?.[2],
              });
            }
          }

          abc.filter((hy) => hy.name === '');

          setBreakfast((prevState) => [
            ...prevState,
            ...abc.filter((hy) => !!hy.servings),
          ]);
        }

        if (e.mealType === 'Lunch') {
          const foodStrings = e?.foodListString
            .split('[')
            ?.map((d: string) => d.split(']'))?.[1]
            ?.map((f: string) => f.split(', '));

          const abc: { name: any; servings: any; unit: any; id: any }[] = [];
          // eslint-disable-next-line no-plusplus
          for (let i = 0; i < foodStrings?.[0]?.length; i++) {
            if (i % 2 === 0) {
              abc.push({
                name: foodStrings?.[0]?.[i],
                servings: foodStrings?.[0]?.[i + 1]?.split(' ')?.[0],
                unit: foodStrings?.[0]?.[i + 1]?.split(' ')?.[1],
                id: foodStrings?.[0]?.[i + 1]?.split(' ')?.[2],
              });
            }
          }

          abc.filter((hy) => !hy.servings);

          setLunch((prevState) => [
            ...prevState,
            ...abc.filter((hy) => !!hy.servings),
          ]);
        }

        if (e.mealType === 'Dinner') {
          const foodStrings = e?.foodListString
            .split('[')
            ?.map((d: string) => d.split(']'))?.[1]
            ?.map((f: string) => f.split(', '));

          const abc: { name: any; servings: any; unit: any; id: any }[] = [];
          // eslint-disable-next-line no-plusplus
          for (let i = 0; i < foodStrings?.[0]?.length; i++) {
            if (i % 2 === 0) {
              abc.push({
                name: foodStrings?.[0]?.[i],
                servings: foodStrings?.[0]?.[i + 1]?.split(' ')?.[0],
                unit: foodStrings?.[0]?.[i + 1]?.split(' ')?.[1],
                id: foodStrings?.[0]?.[i + 1]?.split(' ')?.[2],
              });
            }
          }

          setDinner((prevState) => [
            ...prevState,
            ...abc.filter((hy) => !!hy.servings),
          ]);
        }

        if (e.mealType === 'Snack') {
          const foodStrings = e?.foodListString
            .split('[')
            ?.map((d: string) => d.split(']'))?.[1]
            ?.map((f: string) => f.split(', '));

          const abc: { name: any; servings: any; unit: any; id: any }[] = [];
          // eslint-disable-next-line no-plusplus
          for (let i = 0; i < foodStrings?.[0]?.length; i++) {
            if (i % 2 === 0) {
              abc.push({
                name: foodStrings?.[0]?.[i],
                servings: foodStrings?.[0]?.[i + 1]?.split(' ')?.[0],
                unit: foodStrings?.[0]?.[i + 1]?.split(' ')?.[1],
                id: foodStrings?.[0]?.[i + 1]?.split(' ')?.[2],
              });
            }
          }

          abc.filter((hy) => hy.name === '');

          setSnacks((prevState) => [
            ...prevState,
            ...abc.filter((hy) => !!hy.servings),
          ]);
        }
        return null;
      });
    }
  }, [allMeals, allMeals?.data]);

  const addFoodToMeal = (
    meal: string,
    name: string,
    servings: number,
    unit: string,
    id: string
  ) => {
    if (meal === 'breakfast') {
      setBreakfast((prevState) => [...prevState, { name, servings, unit, id }]);
    }
    if (meal === 'lunch') {
      setLunch((prevState) => [...prevState, { name, servings, unit, id }]);
    }
    if (meal === 'dinner') {
      setDinner((prevState) => [...prevState, { name, servings, unit, id }]);
    }
    if (meal === 'snacks') {
      setSnacks((prevState) => [...prevState, { name, servings, unit, id }]);
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
        foodlist: breakfast.map(
          (e) => `${e.name}, ${e.servings} ${e.unit} ${e.id}, `
        ),
        mealtype: 1,
        createdat: moment().format('yyyy-MM-DD'),
      });
    }
    if (mealtype === 2) {
      await mutateCreateMeal.mutate({
        username,
        foodlist: lunch.map(
          (e) => `${e.name}, ${e.servings} ${e.unit} ${e.id}, `
        ),
        mealtype: 2,
        createdat: moment().format('yyyy-MM-DD'),
      });
    }
    if (mealtype === 3) {
      await mutateCreateMeal.mutate({
        username,
        foodlist: dinner.map(
          (e) => `${e.name}, ${e.servings} ${e.unit} ${e.id}, `
        ),
        mealtype: 3,
        createdat: moment().format('yyyy-MM-DD'),
      });
    }
    if (mealtype === 4) {
      await mutateCreateMeal.mutate({
        username,
        foodlist: snacks.map(
          (e) => `${e.name}, ${e.servings} ${e.unit} ${e.id}, `
        ),
        mealtype: 4,
        createdat: moment().format('yyyy-MM-DD'),
      });
    }
  };

  return (
    <TrackingView
      setDate={setDate}
      mealTracker={mealTracker}
      addFoodToMeal={addFoodToMeal}
      breakfast={breakfast}
      createMeal={createMeal}
      dinner={dinner}
      lunch={lunch}
      snacks={snacks}
    />
  );
};
