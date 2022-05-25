import React from 'react';
import styled from 'styled-components';
import { useMutation, useQuery } from 'react-query';
import { Button, notification } from 'antd';
import { GetGuidelines } from './api';
import { AddGuideline } from './components/add-guideline';
import { DeleteGuideline } from './components/delete-guideline';

const GuidelinesWrapper = styled.div`
  .page-title {
    font-size: 2rem;
    margin-right: 1rem;
    margin-bottom: 2rem;
  }

  .guideline-wrapper {
    margin-left: 1.5rem;
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  .guideline-counter {
    font-size: 1.5rem;
    margin-right: 1rem;
  }

  .guideline-text {
    font-size: 1.5rem;
    margin-right: 1rem;
    font-weight: 300;
  }

  .guideline-info-wrapper {
    display: flex;
    flex-direction: row;
    align-items: center;
  }
`;

type GuideLinesViewProps = {
  // eslint-disable-next-line react/require-default-props
  admin?: boolean;
};

export const GuideLinesView = ({ admin }: GuideLinesViewProps) => {
  const { data: guidelineData, refetch: refetchGuidelines } = useQuery(
    'get-guide-lines',
    GetGuidelines
  );

  return (
    <GuidelinesWrapper>
      <div className="guideline-info-wrapper">
        <div className="page-title">Guidelines</div>
        {admin && <Button type="primary">Add</Button>}
      </div>
      <div className="guideline-text">
        The Official Dietary Guidelines - good for health and climate are:
      </div>
      {guidelineData?.data?.map(
        (
          guideline: { guideline: string; guidelineId: string },
          index: number
        ) => (
          <div className="guideline-wrapper">
            <div className="guideline-info-wrapper">
              <div className="guideline-counter">{index}.</div>
              <div className="guideline-text">{guideline.guideline}</div>
            </div>
            {admin && (
              <DeleteGuideline
                guidelineId={guideline.guidelineId}
                refetch={refetchGuidelines}
              />
            )}
          </div>
        )
      )}
      {admin && <AddGuideline refetch={refetchGuidelines} />}
    </GuidelinesWrapper>
  );
};
