import React from 'react';
import { Button, notification } from 'antd';
import { useMutation } from 'react-query';
import { DeleteGuideline as DeleteGuidelinePost } from '../api';

type DeleteGuidelineProps = {
  guidelineId: string;
  refetch: $TSFixMe;
};

const deleteSuccessNotification = (placement: any) => {
  notification.info({
    message: `Guideline successfully deleted`,
    description: 'The guideline has been successfully deleted.',
    placement,
  });
};

const deleteFailedNotification = (placement: any) => {
  notification.info({
    message: `Delete guideline`,
    description:
      'The delete guideline attempt failed, no id found matching the id sent.',
    placement,
  });
};

const deleteQueryFailedNotification = (placement: any) => {
  notification.info({
    message: `Something went wrong`,
    description: 'Something went wrong, please try again later.',
    placement,
  });
};

export const DeleteGuideline = ({
  guidelineId,
  refetch,
}: DeleteGuidelineProps) => {
  const mutateDelete = useMutation(
    (params: $TSFixMe) => DeleteGuidelinePost(params.guidelineId),
    {
      onSuccess: (data) => {
        if (data.data) {
          deleteSuccessNotification('bottom');
          refetch();
        } else {
          deleteFailedNotification('bottom');
        }
      },
      onError: () => {
        deleteQueryFailedNotification('bottom');
      },
    }
  );

  const onClickDelete = async (id: string) => {
    await mutateDelete.mutate({
      guidelineId: id,
    });
  };
  return (
    <Button danger size="small" onClick={() => onClickDelete(guidelineId)}>
      X
    </Button>
  );
};
