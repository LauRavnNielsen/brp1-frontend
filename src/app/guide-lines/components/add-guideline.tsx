import React, { useState } from 'react';
import styled from 'styled-components';
import { Button, Input, notification } from 'antd';
import { useMutation } from 'react-query';
import { CreateGuideline } from '../api';

const AddGuideLineWrapper = styled.div`
  margin-top: 1rem;
  .link-mock {
    color: darkblue;
  }

  .link-mock:hover {
    cursor: pointer;
  }

  .form-wrapper {
    display: flex;
    flex-direction: row;
  }

  .input {
    margin-right: 1rem;
  }

  .button {
    margin-right: 1rem;
  }
`;

const createSuccessNotification = (placement: any) => {
  notification.info({
    message: `Guideline created`,
    description: 'The guidelines has successfully been created.',
    placement,
  });
};

const createQueryFailedNotification = (placement: any) => {
  notification.info({
    message: `Something went wrong`,
    description: 'Something went wrong, please try again later.',
    placement,
  });
};

const createFailedNotification = (placement: any) => {
  notification.info({
    message: `Create guideline failed`,
    description: 'The create guideline attempt failed.',
    placement,
  });
};

type AddGuidelineProps = {
  refetch: $TSFixMe;
};
export const AddGuideline = ({ refetch }: AddGuidelineProps) => {
  const [show, setShow] = useState<boolean>(false);
  const [input, setInput] = useState<string>('');

  const onCancel = () => {
    setShow(false);
    setInput('');
  };

  const mutateCreate = useMutation(
    (params: $TSFixMe) => CreateGuideline(params.guideline),
    {
      onSuccess: (data) => {
        if (data.data) {
          createSuccessNotification('bottom');
          refetch();
        } else {
          createFailedNotification('bottom');
        }
      },
      onError: () => {
        createQueryFailedNotification('bottom');
      },
    }
  );

  const onClickDelete = async (guideline: string) => {
    await mutateCreate.mutate({
      guideline,
    });
  };

  return (
    <AddGuideLineWrapper>
      {!show && (
        // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions
        <div className="link-mock" onClick={() => setShow(!show)}>
          Click to add another guideline
        </div>
      )}
      {show && (
        <div className="form-wrapper">
          <Input className="input" onChange={(e) => setInput(e.target.value)} />
          <Button className="button" onClick={() => onCancel()}>
            Cancel
          </Button>
          <Button type="primary" onClick={() => onClickDelete(input)}>
            Add
          </Button>
        </div>
      )}
    </AddGuideLineWrapper>
  );
};
