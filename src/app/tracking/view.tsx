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

type TrackingViewProps = {
  createMeal: (e: number) => void;
  breakfast: { name: string; servings: number; unit: string }[];
  lunch: { name: string; servings: number; unit: string }[];
  dinner: { name: string; servings: number; unit: string }[];
  snacks: { name: string; servings: number; unit: string }[];
  addFoodToMeal: (
    meal: string,
    name: string,
    servings: number,
    unit: string
  ) => void;
};

export const TrackingView = ({
  createMeal,
  breakfast,
  dinner,
  lunch,
  snacks,
  addFoodToMeal,
}: TrackingViewProps) => {
  return (
    <div style={{ height: '100%' }}>
      <div style={{ fontSize: '2rem', marginBottom: '2rem' }}>Tracking</div>
      <div style={{ minHeight: '30%' }}>
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
              {breakfast.length > 0 && (
                <Button
                  style={{ marginTop: '1rem' }}
                  onClick={() => createMeal(1)}
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
              {lunch.length > 0 && (
                <Button
                  style={{ marginTop: '1rem' }}
                  onClick={() => createMeal(2)}
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
              {dinner.length > 0 && (
                <Button
                  style={{ marginTop: '1rem' }}
                  onClick={() => createMeal(3)}
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
              {snacks.length > 0 && (
                <Button
                  style={{ marginTop: '1rem' }}
                  onClick={() => createMeal(4)}
                >
                  Confirm snacks
                </Button>
              )}
            </Row>
          </Col>
        </Row>
      </div>
      <div style={{ minHeight: '70%', fontWeight: 600 }}>
        <div style={{ fontSize: '1rem', marginBottom: '1rem' }}>Add foods</div>
        <AddFoodThing addFoodToMeal={addFoodToMeal} />
      </div>
    </div>
  );
};
