import React, { useState } from 'react';
import { Button, Card, Image, Tag } from 'antd';
// eslint-disable-next-line import/no-cycle
import { RecipeModal } from './recipe-modal';

type RecipeCardProps = {
  cuisines: string[];
  diets: string[];
  id: string;
  image: string;
  title: string;
  dishTypes: string[];
  // eslint-disable-next-line react/require-default-props
  trendingId?: string;
  // eslint-disable-next-line react/require-default-props
  refetch?: $TSFixMe;
};

const { Meta } = Card;

export const RecipeCard = ({
  image,
  cuisines,
  diets,
  dishTypes,
  id,
  title,
  trendingId,
  refetch,
}: RecipeCardProps) => {
  const [visible, setVisible] = useState<boolean>(false);

  return (
    <>
      {' '}
      <Card
        cover={<img alt="" src={image} />}
        hoverable
        style={{ width: '100%', minWidth: '100%', minHeight: '100%' }}
        onClick={() => setVisible(!visible)}
      >
        <Meta
          title={title}
          description={
            <div>
              <div className="tag-wrapper" style={{ marginBottom: '1rem' }}>
                Cuisines:&nbsp;
                {cuisines.map((cuisine) => (
                  <Tag>{cuisine}</Tag>
                ))}
              </div>
              <div className="tag-wrapper" style={{ marginBottom: '1rem' }}>
                Diets:&nbsp;
                {diets.map((diet) => (
                  <Tag>{diet}</Tag>
                ))}
              </div>
              <div className="tag-wrapper" style={{ marginBottom: '1rem' }}>
                Dish types:&nbsp;
                {dishTypes.map((type) => (
                  <Tag>{type}</Tag>
                ))}
              </div>
            </div>
          }
        />
      </Card>
      <RecipeModal
        onCancel={() => setVisible(false)}
        recipeId={id}
        visible={visible}
        trendingId={trendingId}
        refetch={refetch}
      />
    </>
  );
};
