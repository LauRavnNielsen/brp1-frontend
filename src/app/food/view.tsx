import React from 'react';
import { Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

export const FoodView = () => {
  return (
    <div>
      <Input prefix={<SearchOutlined />} />
    </div>
  );
};
