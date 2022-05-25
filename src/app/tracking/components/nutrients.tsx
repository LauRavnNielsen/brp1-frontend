import { Col, Radio, Row, Table } from 'antd';
import React, { useState } from 'react';
import { useQuery } from 'react-query';
// eslint-disable-next-line import/no-cycle
import { GetIngredientInformation } from '../api';

type NutrientsProps = {
  id: string;
  unit: string;
  servings: number;
  showNut: boolean;
};

export const Nutrients = ({ id, unit, servings, showNut }: NutrientsProps) => {
  const [nutData, setNutData] = useState([]);
  const [radioValue, setRadioValue] = useState(1);

  const { refetch: refetchNut } = useQuery(
    ['get-ingredient-information', unit, servings, id],
    () => GetIngredientInformation(id, servings, unit),
    {
      enabled: showNut,
      onSuccess: (data) => {
        setNutData(data.data);
      },
    }
  );

  console.log(nutData);

  if (!showNut) return null;

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
    },
    {
      title: 'Percentage of recommended daily intake',
      dataIndex: 'prdi',
      key: 'prdi',
    },
  ];

  /* @ts-expect-error WIP */
  const data = nutData?.nutrition?.nutrients
    ?.filter((e: { amount: number }) => e.amount > 0)
    ?.map(
      (e: { name: any; amount: any; unit: any; percentOfDailyNeeds: any }) => ({
        name: e.name,
        amount: `${e.amount} ${e.unit}`,
        prdi: `${e.percentOfDailyNeeds} %`,
      })
    );

  return (
    <div style={{ width: '100%', minWidth: '100%' }}>
      <div style={{ width: '100%' }}>
        <Table columns={columns} dataSource={data} />
      </div>
    </div>
  );
};
