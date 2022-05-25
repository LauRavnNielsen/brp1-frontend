import React, { useState } from 'react';
import { useQuery } from 'react-query';
// eslint-disable-next-line import/no-cycle
import styled from 'styled-components';
import { Button, Col, Input, Radio, Row } from 'antd';
// eslint-disable-next-line import/no-cycle
import { GetRandomRecipes, GetTrendingRecipes, SearchRecipes } from './api';
// eslint-disable-next-line import/no-cycle
// eslint-disable-next-line import/no-cycle
import { ApiWrapper } from '../recipe/components/api-wrapper';
// eslint-disable-next-line import/no-cycle
import { RecipeCard } from './components/recipe-card';

const ManageRecipeWrapper = styled.div`
  overflow-y: scroll;
  overflow-x: hidden;
  max-height: 100%;

  .page-title {
    font-size: 2rem;
    margin-right: 1rem;
    margin-bottom: 2rem;
  }

  .query-control-wrapper {
    display: flex;
    flex-direction: row;
    margin-top: 2rem;
  }

  .input {
    margin-right: 1rem;
    width: 400px;
  }
`;

export const ManageRecipe = () => {
  const [search, setSearch] = useState<string>('');
  const [randomEnabled, setRandomEnabled] = useState(false);
  const [randomSearch, setRandomSearch] = useState(false);
  const [radio, setRadio] = useState('search');
  const [recipeData, setRecipeData] = useState<any>([]);

  const { refetch: randomRefetch } = useQuery(
    'get-guide-recipes',
    GetRandomRecipes,
    {
      enabled: randomEnabled,
      onSuccess: (data) => {
        setRecipeData(data.data.recipes);
        setRandomEnabled(false);
      },
    }
  );

  const { refetch: searchQueryRefetch } = useQuery(
    ['get-search-recipes', search],
    () => SearchRecipes(search),
    {
      enabled: randomSearch,
      onSuccess: (data) => {
        setRecipeData(data.data.results);
        setRandomSearch(false);
      },
    }
  );

  const { refetch: getTrendingRecipes, data: trendingData } = useQuery(
    ['get-trending-recipes', 10],
    () => GetTrendingRecipes(10),
    {
      enabled: radio === 'trending',
    }
  );

  const onClick = () => {
    if (search.length > 3) {
      setRandomSearch(true);
      setRandomEnabled(false);
      searchQueryRefetch();
      return;
    }
    setRandomSearch(false);
    setRandomEnabled(true);
    randomRefetch();
  };

  console.log(recipeData);

  return (
    <ManageRecipeWrapper>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          marginBottom: '1rem',
        }}
      >
        <div className="page-title">Recipes</div>
        <Radio.Group
          options={[
            { label: 'Search', value: 'search' },
            { label: 'Trending', value: 'trending' },
          ]}
          buttonStyle="solid"
          optionType="button"
          value={radio}
          onChange={(e) => setRadio(e.target.value)}
        />
        {radio === 'search' && (
          <div className="query-control-wrapper">
            <Input
              className="input"
              placeholder="Search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <Button type="primary" onClick={() => onClick()}>
              Fetch recipes
            </Button>
          </div>
        )}
      </div>
      {radio === 'search' && (
        <Row gutter={[16, 16]}>
          {recipeData?.map((recipe: $TSFixMe) => (
            <Col span={8}>
              <RecipeCard
                cuisines={recipe.cuisines}
                diets={recipe.diets}
                id={recipe.id}
                image={recipe.image}
                title={recipe.title}
                dishTypes={recipe.dishTypes}
              />
            </Col>
          ))}
        </Row>
      )}
      {radio === 'trending' && (
        <Row gutter={[16, 16]}>
          {trendingData?.data?.map((recipe: $TSFixMe) => (
            <Col span={6}>
              <ApiWrapper
                id={recipe.recipeId}
                trendingId={recipe?.trendingId}
                refetch={getTrendingRecipes}
              />
            </Col>
          ))}
        </Row>
      )}
    </ManageRecipeWrapper>
  );
};
