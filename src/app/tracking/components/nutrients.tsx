import { Col, Radio, Row, Table } from 'antd';
import React, { useEffect, useState } from 'react';
import { useQueries, useQuery } from 'react-query';
// eslint-disable-next-line import/no-cycle
import { GetIngredientInformation } from '../api';

type NutrientsProps = {
  id: string;
  unit: string;
  servings: number;
  showNut: boolean;
  // eslint-disable-next-line react/require-default-props
  bulkIngredients: {
    id: string;
    unit: string;
    servings: number;
    name: string;
  }[];
};

export const Nutrients = ({
  id,
  unit,
  servings,
  showNut,
  bulkIngredients,
}: NutrientsProps) => {
  const [nutData, setNutData] = useState<any[]>([]);
  const [radioValue, setRadioValue] = useState(1);

  const { refetch: refetchNut, data } = useQuery(
    ['get-ingredient-information', unit, servings, id],
    () => GetIngredientInformation(id, servings, unit),
    {
      enabled: showNut,
    }
  );

  useEffect(() => {
    if (data) {
      setNutData(data.data);
    }
  }, [data]);

  const nutQueries = useQueries(
    bulkIngredients?.map((e) => {
      return {
        queryKey: ['ingredient', e.id, e.unit, e.servings],
        queryFn: () => GetIngredientInformation(e.id, e.servings, e.unit),
        enabled: !!e.id,
      };
    })
  );

  const dataNut = nutQueries
    .filter((e) => e?.data?.status === 200)
    ?.map((node) => node?.data?.data);

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

  const mergeData = () => {
    const d = dataNut?.map((y) =>
      y.nutrition?.nutrients?.filter((e: { amount: number }) => e.amount > 0)
    );

    const u: any[] = [];

    d?.map((l) =>
      l.map((p: any) => {
        const pName = u?.map((k: any) => k.name);
        if (pName?.includes(p.name)) {
          const amount = u?.[pName.indexOf(p.name)].amount;
          const percentOfDailyNeeds =
            u?.[pName.indexOf(p.name)].percentOfDailyNeeds;

          u.splice(pName.indexOf(p.name), 1);
          u.push({
            name: p.name,
            amount: p.amount + amount,
            unit: p.unit,
            percentOfDailyNeeds: p.percentOfDailyNeeds + percentOfDailyNeeds,
          });
        } else {
          u.push({
            name: p.name,
            amount: p.amount,
            unit: p.unit,
            percentOfDailyNeeds: p.percentOfDailyNeeds,
          });
        }
        return null;
      })
    );

    return u?.map(
      (e: { name: any; amount: any; unit: any; percentOfDailyNeeds: any }) => ({
        name: e.name,
        amount: `${e.amount} ${e.unit}`,
        prdi: `${e.percentOfDailyNeeds} %`,
      })
    );
  };

  const fasdfjk = () => {
    // @ts-expect-error WIP
    return nutData?.nutrition?.nutrients
      ?.filter((e: { amount: number }) => e.amount > 0)
      ?.map(
        (e: {
          name: any;
          amount: any;
          unit: any;
          percentOfDailyNeeds: any;
        }) => ({
          name: e.name,
          amount: `${e.amount} ${e.unit}`,
          prdi: `${e.percentOfDailyNeeds} %`,
        })
      );
  };

  const data2 = bulkIngredients.length > 1 ? mergeData() : fasdfjk();

  console.log(data2, dataNut, nutData, fasdfjk());

  return (
    <div style={{ width: '100%', minWidth: '100%' }}>
      <div style={{ width: '100%' }}>
        <Table columns={columns} dataSource={data2} />
      </div>
    </div>
  );
};
