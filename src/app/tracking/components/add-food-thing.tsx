import React, { useState } from 'react';
import { Button, Col, Input, Row, Select } from 'antd';
import { useQuery } from 'react-query';
// eslint-disable-next-line import/no-cycle
import { GetIngredientInformation, GetIngredientSearch } from '../api';
// eslint-disable-next-line import/no-cycle
import { Nutrients } from './nutrients';

// eslint-disable-next-line @typescript-eslint/ban-types
type AddFoodThingProps = { addFoodToMeal: $TSFixMe };

// eslint-disable-next-line no-empty-pattern
export const AddFoodThing = ({ addFoodToMeal }: AddFoodThingProps) => {
  const [search, setSearch] = useState('');
  const [ingredients, setIngredients] = useState([]);
  const [ingredientEnabled, setIngredientEnabled] = useState(false);
  const [servings, setServings] = useState(0);
  const [ingredient, setIngredient] = useState({ name: '', id: '' });
  const [possibilities, setPossibilities] = useState([]);
  const [unit, setUnit] = useState('');
  const [showNut, setShowNut] = useState(false);
  const [meal, setMeal] = useState('breakfast');

  const { refetch: searchQueryRefetch } = useQuery(
    ['get-search-ingredient', search],
    () => GetIngredientSearch(search),
    {
      enabled: ingredientEnabled,
      onSuccess: (data) => {
        setIngredients(data.data);
        setIngredientEnabled(false);
      },
    }
  );

  return (
    <div>
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Row gutter={[16, 16]}>
            <Col span={10}>
              <Input
                onChange={(e) => {
                  setSearch(e.target.value);
                }}
              />
            </Col>
            <Col span={5}>
              <Button
                onClick={() => {
                  setIngredientEnabled(true);
                  searchQueryRefetch();
                }}
                type="primary"
              >
                Search
              </Button>
            </Col>
          </Row>
          <Row gutter={[16, 16]}>
            <Col span={6}>
              <div
                style={{ fontSize: 16, fontWeight: 600, marginTop: '0.5rem' }}
              >
                Results
              </div>
              {/* @ts-expect-error WIP */}
              {ingredients?.results?.map((e: $TSFixMe, index: number) => (
                // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions
                <div
                  onClick={() => {
                    setIngredient({ name: e.name, id: e.id });
                    setPossibilities(e.possibleUnits);
                    setShowNut(false);
                  }}
                  style={{
                    fontSize: '14px',
                    marginTop: '0.4rem',
                    fontWeight: 400,
                    marginLeft: '0.5rem',
                  }}
                >
                  {`${index}. ${e?.name}`}
                </div>
              ))}
            </Col>
            <Col span={8}>
              <div>
                <div style={{ fontSize: '1rem', marginTop: '0.5rem' }}>
                  {ingredient?.name}
                </div>
                <div style={{ fontSize: '12px', marginTop: '0.5rem' }}>
                  Select unit
                </div>
                <Select
                  options={possibilities?.map((possibility) => ({
                    label: possibility,
                    value: possibility,
                  }))}
                  style={{
                    width: '100%',
                    marginBottom: '1rem',
                  }}
                  onChange={(e) => setUnit(e)}
                  placeholder="Select unit"
                />
                <div style={{ fontSize: '12px', marginTop: '0.5rem' }}>
                  Select amount of servings
                </div>
                <Input
                  type="number"
                  step={0.1}
                  min={0}
                  value={servings}
                  // @ts-expect-error WIP
                  onChange={(e) => setServings(e.target.value)}
                  style={{ marginBottom: '1rem' }}
                />
                <div style={{ fontSize: '12px', marginTop: '0.5rem' }}>
                  Select Meal
                </div>
                <Select
                  options={[
                    { label: 'Breakfast', value: 'breakfast' },
                    { label: 'Lunch', value: 'lunch' },
                    { label: 'Dinner', value: 'dinner' },
                    { label: 'Snacks', value: 'snacks' },
                  ]}
                  style={{
                    width: '100%',
                    marginBottom: '1rem',
                  }}
                  value={meal}
                  onChange={(e) => setMeal(e)}
                />
                <Row>
                  <Col span={12}>
                    <Button
                      onClick={() =>
                        addFoodToMeal(
                          meal,
                          ingredient.name,
                          servings,
                          unit,
                          ingredient.id
                        )
                      }
                      style={{ marginRight: '1rem' }}
                      type="primary"
                    >
                      Add to meal
                    </Button>
                    <Button onClick={() => setShowNut(true)}>
                      Nutritional values
                    </Button>
                  </Col>
                </Row>
              </div>
            </Col>
            <Col span={9} offset={1}>
              <Nutrients
                bulkIngredients={[]}
                id={ingredient.id}
                unit={unit}
                servings={servings}
                showNut={showNut}
              />
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};
