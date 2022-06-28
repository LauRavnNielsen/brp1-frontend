import React, { useContext, useState } from 'react';
import { Button, Col, DatePicker, Row } from 'antd';
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
import { Nutrients } from './components/nutrients';

type TrackingViewProps = {
  createMeal: (e: number) => void;
  breakfast: { name: string; servings: number; unit: string; id: string }[];
  lunch: { name: string; servings: number; unit: string; id: string }[];
  dinner: { name: string; servings: number; unit: string; id: string }[];
  snacks: { name: string; servings: number; unit: string; id: string }[];
  addFoodToMeal: (
    meal: string,
    name: string,
    servings: number,
    unit: string,
    id: string
  ) => void;
  mealTracker: boolean;
  setDate: $TSFixMe;
};

export const TrackingView = ({
  createMeal,
  breakfast,
  dinner,
  lunch,
  snacks,
  addFoodToMeal,
  mealTracker,
  setDate,
}: TrackingViewProps) => {
  const [showAddToBreakfast, setShowAddToBreakfast] = useState(true);
  const [showAddToLunch, setShowAddToLunch] = useState(true);
  const [showAddToDinner, setShowAddToDinner] = useState(true);
  const [showAddToSnacks, setShowAddToSnacks] = useState(true);

  return (
    <div style={{ height: '100%' }}>
      <div style={{ fontSize: '2rem', marginBottom: '2rem' }}>
        {mealTracker ? 'Meal history' : 'Tracking'}
      </div>
      {/* @ts-expect-error WIP */}
      {mealTracker && <DatePicker onChange={(e) => setDate(e)} />}
      <div style={{ minHeight: '30%', marginTop: '1rem' }}>
        <Row gutter={[16, 200]}>
          <Col span={6}>
            <Row>
              <Col span={24}>
                <div style={{ fontSize: '1rem', marginBottom: '1rem' }}>
                  Breakfast
                </div>
              </Col>
              <Col span={24}>
                {breakfast.map((e) => (
                  <div>
                    {e.name}, {e.servings} {e.unit}
                  </div>
                ))}
              </Col>
              {breakfast.length > 0 && !mealTracker && showAddToBreakfast && (
                <Button
                  style={{ marginTop: '1rem' }}
                  onClick={() => {
                    createMeal(1);
                    setShowAddToBreakfast(false);
                  }}
                >
                  Confirm breakfast
                </Button>
              )}
            </Row>
          </Col>
          <Col span={6}>
            <Row>
              <Col span={24}>
                <div style={{ fontSize: '1rem', marginBottom: '1rem' }}>
                  Lunch
                </div>
              </Col>
              <Col span={24}>
                {lunch.map((e) => (
                  <div>
                    {e.name}, {e.servings} {e.unit}
                  </div>
                ))}
              </Col>
              {lunch.length > 0 && !mealTracker && showAddToLunch && (
                <Button
                  style={{ marginTop: '1rem' }}
                  onClick={() => {
                    createMeal(2);
                    setShowAddToLunch(false);
                  }}
                >
                  Confirm lunch
                </Button>
              )}
            </Row>
          </Col>
          <Col span={6}>
            <Row>
              <Col span={24}>
                <div style={{ fontSize: '1rem', marginBottom: '1rem' }}>
                  Dinner
                </div>
              </Col>
              <Col span={24}>
                {dinner.map((e) => (
                  <div>
                    {e.name}, {e.servings} {e.unit}
                  </div>
                ))}
              </Col>
              {dinner.length > 0 && !mealTracker && showAddToDinner && (
                <Button
                  style={{ marginTop: '1rem' }}
                  onClick={() => {
                    createMeal(3);
                    setShowAddToDinner(false);
                  }}
                >
                  Confirm dinner
                </Button>
              )}
            </Row>
          </Col>
          <Col span={6}>
            <Row>
              <Col span={24}>
                <div style={{ fontSize: '1rem', marginBottom: '1rem' }}>
                  Snacks
                </div>
              </Col>
              <Col span={24}>
                {snacks.map((e) => (
                  <div>
                    {e.name}, {e.servings} {e.unit}
                  </div>
                ))}
              </Col>
              {snacks.length > 0 && !mealTracker && showAddToSnacks && (
                <Button
                  style={{ marginTop: '1rem' }}
                  onClick={() => {
                    createMeal(4);
                    setShowAddToSnacks(false);
                  }}
                >
                  Confirm snacks
                </Button>
              )}
            </Row>
          </Col>
        </Row>
      </div>
      {!mealTracker && (
        <div style={{ minHeight: '70%', fontWeight: 600 }}>
          <div style={{ fontSize: '1rem', marginBottom: '1rem' }}>
            Add foods
          </div>
          <AddFoodThing addFoodToMeal={addFoodToMeal} />
        </div>
      )}
      {mealTracker && (
        <div style={{ minHeight: '70%', fontWeight: 600 }}>
          <Nutrients
            bulkIngredients={[...breakfast, ...lunch, ...dinner, ...snacks]}
            id=""
            servings={0}
            showNut
            unit=""
          />
        </div>
      )}
    </div>
  );
};
