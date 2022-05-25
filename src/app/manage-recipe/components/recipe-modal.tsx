import React, { useContext, useState } from 'react';
import { Modal, notification, Radio } from 'antd';
import { useMutation, useQuery } from 'react-query';
// eslint-disable-next-line import/no-cycle
import styled from 'styled-components';
// eslint-disable-next-line import/no-cycle
import { DeleteRecipe, GetRecipe, SetRecipeTrending } from '../api';
// eslint-disable-next-line import/no-cycle
import { RecipeEquipment } from './recipe-equipment';
// eslint-disable-next-line import/no-cycle
import { RecipeNutrition } from './recipe-nutrition';
// eslint-disable-next-line import/no-cycle
import { RecipeIngredients } from './recipe-ingredients';
import { LoginCall } from '../../login/api';
import { AdminContext } from '../../context/admin-context';

type RecipeModalProps = {
  visible: boolean;
  onCancel: () => void;
  recipeId: string;
  // eslint-disable-next-line react/require-default-props
  trendingId?: string;
  // eslint-disable-next-line react/require-default-props
  refetch?: $TSFixMe;
};

const RecipeModalContentWrapper = styled.div`
  margin-top: 1rem;
  display: flex;
  flex-direction: row;

  .image {
    height: fit-content;
    max-width: 50%;
  }

  .radio-group {
    margin-top: 1rem;
  }
  .instructions {
    margin-left: 1rem;
  }

  .step-wrapper {
    display: flex;
    flex-direction: row;
  }

  .step-count {
    font-size: 1rem;
    font-weight: 500;
    margin-right: 1rem;
  }

  .step-information {
    font-size: 1rem;
  }
`;

const RadioOptions = [
  { label: 'Nutrition', value: '1' },
  { label: 'Equipment', value: '3' },
  { label: 'Ingredients', value: '4' },
];

const addedNotification = (placement: any) => {
  notification.info({
    message: `Recipe added`,
    description: 'The recipe has been added to trending recipes.',
    placement,
  });
};

const addedQueryFailedNotification = (placement: any) => {
  notification.info({
    message: `Something went wrong`,
    description: 'Something went wrong, please try again later.',
    placement,
  });
};

export const RecipeModal = ({
  visible,
  onCancel,
  recipeId,
  trendingId,
  refetch,
}: RecipeModalProps) => {
  const [radio, setRadio] = useState('1');
  const { username: adminUsername } = useContext(AdminContext);

  const { refetch: searchQueryRefetch, data: recipeData } = useQuery(
    ['get-search-recipes', recipeId],
    () => GetRecipe(recipeId),
    {
      enabled: visible,
    }
  );

  const mutateAddRecipe = useMutation(
    (params: $TSFixMe) => SetRecipeTrending(params.recipeId),
    {
      onSuccess: (data) => {
        addedNotification('bottom');
        onCancel();
      },
      onError: () => {
        addedQueryFailedNotification('bottom');
      },
    }
  );

  const mutateRemoveRecipe = useMutation(
    (params: $TSFixMe) => DeleteRecipe(params.trendingId),
    {
      onSuccess: (data) => {
        addedNotification('bottom');
        refetch();
        onCancel();
      },
      onError: () => {
        addedQueryFailedNotification('bottom');
      },
    }
  );

  const isAdmin = !!adminUsername;

  const onClick = async () => {
    if (isAdmin && !trendingId) {
      await mutateAddRecipe.mutate({
        recipeId,
      });
    } else if (isAdmin && !!trendingId) {
      await mutateRemoveRecipe.mutate({ trendingId });
    } else onCancel();
  };

  const title = () => {
    if (isAdmin && !trendingId) {
      return 'Add to trending';
    }
    if (isAdmin && !!trendingId) {
      return 'Remove from trending';
    }
    return 'Ok';
  };

  return (
    <Modal
      visible={visible}
      onCancel={onCancel}
      onOk={() => onClick()}
      okText={title()}
      destroyOnClose
      closable
      width={1000}
    >
      <div style={{ fontSize: '2rem', fontWeight: 600 }} className="title">
        {recipeData?.data?.title}
      </div>
      <RecipeModalContentWrapper>
        <div className="image">
          <img alt="" src={recipeData?.data?.image} width={450} />
          <Radio.Group
            options={RadioOptions}
            optionType="button"
            buttonStyle="solid"
            value={radio}
            onChange={(e) => setRadio(e.target.value)}
            className="radio-group"
          />
          {radio === '1' && <RecipeNutrition id={recipeId} />}
          {radio === '3' && <RecipeEquipment id={recipeId} />}
          {radio === '4' && <RecipeIngredients id={recipeId} />}
        </div>
        <div className="instructions">
          {recipeData?.data?.analyzedInstructions?.[0]?.steps?.map(
            (instruction: $TSFixMe) => (
              <div className="step-wrapper">
                <div className="step-count">{instruction?.number}:</div>
                <div className="step-information">{instruction?.step}</div>
              </div>
            )
          )}
        </div>
      </RecipeModalContentWrapper>
    </Modal>
  );
};
