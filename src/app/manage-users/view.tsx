import { notification, Table } from 'antd';
import React from 'react';
import { useMutation, useQuery } from 'react-query';
import { DeleteUserWithAdmin, GetAllUsers } from './api';

const deleteSuccessNotification = (placement: any) => {
  notification.info({
    message: `User successfully deleted`,
    description: 'The user has been successfully deleted.',
    placement,
  });
};

const deleteFailedNotification = (placement: any) => {
  notification.info({
    message: `Delete user`,
    description:
      'The delete user attempt failed, no id found matching the id sent.',
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

// eslint-disable-next-line @typescript-eslint/ban-types
type ManageUsersProps = {};

// eslint-disable-next-line no-empty-pattern
export const ManageUsers = ({}: ManageUsersProps) => {
  const { data: allUsers, refetch: refetchUsers } = useQuery(
    'get-guide-lines',
    GetAllUsers
  );

  const mutateDelete = useMutation(
    (params: $TSFixMe) => DeleteUserWithAdmin(params.username),
    {
      onSuccess: (data) => {
        if (data.data) {
          deleteSuccessNotification('bottom');
          refetchUsers();
        } else {
          deleteFailedNotification('bottom');
        }
      },
      onError: () => {
        deleteQueryFailedNotification('bottom');
      },
    }
  );

  const onClickDelete = async (username: string) => {
    await mutateDelete.mutate({
      username,
    });
  };

  const columns = [
    {
      title: 'Username',
      dataIndex: 'username',
      key: 'name',
    },
    // eslint-disable-next-line jsx-a11y/anchor-is-valid
    {
      title: '',
      dataIndex: '',
      key: 'x',
      width: '10%',
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      render: (_: $TSFixMe, record: $TSFixMe) => (
        // eslint-disable-next-line jsx-a11y/anchor-is-valid,jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions
        <a onClick={() => onClickDelete(record.username)}>delete</a>
      ),
    },
  ];

  const data = allUsers?.data
    ?.filter((user: { isDeleted: any }) => user.isDeleted === '0')
    ?.map((user: $TSFixMe) => ({
      username: user.username,
    }));

  console.log(data);

  return (
    <div>
      <div style={{ fontSize: '2rem', marginBottom: '2rem' }}>Manage users</div>
      <Table columns={columns} dataSource={data} />
    </div>
  );
};
